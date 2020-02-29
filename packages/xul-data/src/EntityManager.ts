import { autowired, postConstruct, singleton } from "@xul/core";
import mariadb, { Pool, UpsertResult } from "mariadb";
import { entityIds, entitySchemas, entityTables } from "./Decorators";
import { LOGGER } from "./Logger";

@singleton(`xul.data.entityManager`)
export class EntityManager {
  @autowired(`xul.data.pool`)
  private pool: Pool;

  @postConstruct()
  public async start() {
    LOGGER.info(`Starting Entity Manager.`);
    LOGGER.warn(`xul-data will be temporary depreciated in favor of sequelize. Expect a major change in API.`);
    if (entitySchemas) {
      for (const schemas of entitySchemas.values()) {
        const statements = schemas
          .split(";")
          .filter(s => s.trim())
          .filter(Boolean);
        for (const schema of statements) {
          LOGGER.info(`Executing ${schema}`);
          await this.pool.query(schema);
        }
      }
    }
  }

  public async save<E>(e: E): Promise<number> {
    return this.saveAll([e]);
  }

  public async saveAll<T>(entities: T[]): Promise<number> {
    if (entities === null || entities.length === 0) {
      return 0;
    }
    let i: number = 0;
    const parameters: any = {};
    const inserts = entities
      .map((e: any) =>
        Object.keys(e)
          .map(k => {
            const parameterName = `p${i++}`;
            parameters[parameterName] = e[k];
            return `:${parameterName}`;
          })
          .join(",")
      )
      .map(insert => `(${insert})`)
      .join(",");
    const entity = entities[0];
    const fields: string = Object.keys(entity).join(",");
    const updates: string = Object.keys(entity)
      .map(k => `${k}=VALUES(${k})`)
      .join(",");
    const sql = `INSERT INTO ${entityTables.get(entity.constructor)} (${fields}) VALUES ${inserts} ON DUPLICATE KEY UPDATE ${updates};`;
    LOGGER.d(`EntityManager.saveAll() sql=${sql}`);
    let result: UpsertResult[] = await this.pool.query({ sql, namedPlaceholders: true }, parameters);
    LOGGER.debug(`EntityManager.saveAll() result=${JSON.stringify(result)}`);
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
