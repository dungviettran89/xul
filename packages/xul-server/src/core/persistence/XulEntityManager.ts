import { postConstruct, singleton } from "@xul/core";
import { lowerCase } from "lodash";
import mariadb, { Pool, UpsertResult } from "mariadb";
import {LOGGER} from "../../server/Logger";

@singleton()
export class XulEntityManager {
  private pool: Pool;

  constructor() {
    const host = process.env.db_host || "localhost";
    const port = parseInt(process.env.db_port, 10) || 3306;
    const database = process.env.db_name || "automation";
    const user = process.env.db_user || "automation";
    const password = process.env.db_password || "automation";
    LOGGER.i(`XulEntityManager.constructor() url=${host}:${port}/${database}`);
    LOGGER.i(`XulEntityManager.constructor() user=${user}`);
    this.pool = mariadb.createPool({ host, port, database, user, password });
  }

  @postConstruct(-1)
  public async start() {
    LOGGER.info(`XulEntityManager.start() `);
    if (entitySchemas) {
      for (const schema of entitySchemas.values()) {
        LOGGER.info(`Executing ${schema}`);
        await this.pool.query(schema);
      }
    }
  }

  public async save<E>(e: E): Promise<number> {
    return this.saveAll([e]);
  }

  public async saveAll<T>(entities: T[]): Promise<number> {
    let i: number = 0;
    const parameters: any = {};
    const sql = entities
      .map((e: any) => {
        const fields: string = Object.keys(e).join(",");
        const inserts: string = Object.keys(e)
          .map(k => {
            const parameterName = `p${i++}`;
            parameters[parameterName] = e[k];
            return `:${parameterName}`;
          })
          .join(",");
        const updates: string = Object.keys(e)
          .map(k => {
            const parameterName = `p${i++}`;
            parameters[parameterName] = e[k];
            return `${k}=:${parameterName}`;
          })
          .join(",");
        return `INSERT INTO ${entityTables.get(e.constructor)} (${fields}) VALUES (${inserts}) ON DUPLICATE KEY UPDATE ${updates};`;
      })
      .join("\n");
    LOGGER.debug(`XulEntityManager.saveAll() sql=${sql}`);
    LOGGER.debug(`XulEntityManager.saveAll() parameters=${JSON.stringify(parameters)}`);
    let result: UpsertResult[] = await this.pool.batch({ sql, namedPlaceholders: true }, parameters);
    LOGGER.debug(`XulEntityManager.saveAll() result=${JSON.stringify(result)}`);
    if (!Array.isArray(result)) {
      result = [result as UpsertResult];
    }
    return result.map(r => r.affectedRows).reduce((a, b) => a + b, 0);
  }

  public async findBy<T>(clazz: new () => T, where: string, ...args: any[]): Promise<T[]> {
    const result: T[] = await this.pool.query(`select * from ${entityTables.get(clazz)} where ${where}`, args);
    return result.map(t => Object.assign(new clazz(), t));
  }

  public async findAll<T>(clazz: new () => T): Promise<T[]> {
    const result: T[] = await this.pool.query(`select * from ${entityTables.get(clazz)}`);
    return result.map(t => Object.assign(new clazz(), t));
  }

  public async findOne<T>(clazz: new () => T, idValue: any): Promise<T> {
    const idColumn = entityIds.get(clazz);
    const result = await this.pool.query(`select * from ${entityTables.get(clazz)} where ${idColumn} = ?`, idValue);
    if (!Array.isArray(result)) {
      throw new Error(`${idColumn} is not id in entity ${clazz.name}`);
    }
    if (result.length > 1) {
      throw new Error(`More than one entity returned for ${idColumn}=${idValue} in entity ${clazz.name}`);
    }
    return result.length === 1 ? Object.assign(new clazz(), result[0]) : null;
  }
}

export const entityTables: Map<any, string> = new Map();
export const entitySchemas: Map<any, string> = new Map();
export const entity = (config: { table?: string; schema?: string }) => {
  let { table } = config;
  const { schema } = config;
  return (clazz?: any, method?: any, descriptor?: any) => {
    table = table || lowerCase(clazz.name);
    entityTables.set(clazz, table);
    entitySchemas.set(clazz, schema);
    clazz.TABLE = table;
    return descriptor;
  };
};
export const entityIds: Map<any, string> = new Map();
export const id = () => {
  return (clazz?: any, method?: any, descriptor?: any) => {
    entityIds.set(clazz.constructor, method);
    clazz.ID = method;
    return descriptor;
  };
};
