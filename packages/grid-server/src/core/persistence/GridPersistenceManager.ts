import {lowerCase} from 'lodash';
import {singleton} from "../context/GridContext";
import mariadb, {Pool, UpsertResult} from "mariadb";
import {postConstruct} from "../mvc/InitializingBean";
import {logger} from "../GridLogger";

@singleton()
export class GridPersistenceManager {
    private pool: Pool;

    constructor() {
        const host = process.env.db_host || "localhost";
        const port = parseInt(process.env.db_port, 10) || 3306;
        const database = process.env.db_name || "automation";
        const user = process.env.db_user || "automation";
        const password = process.env.db_password || "automation";
        logger.info(`GridPersistenceManager.constructor() url=${host}:${port}/${database}`);
        logger.info(`GridPersistenceManager.constructor() user=${user}`);
        this.pool = mariadb.createPool({host, port, database, user, password});
    }

    @postConstruct(-1)
    public async start() {
        logger.info(`GridPersistenceManager.start() `);
        if (entitySchemas) {
            for (let schema of entitySchemas.values()) {
                logger.info(`Executing ${schema}`);
                await this.pool.query(schema);
            }
        }
    }

    public async save<T>(entity: T): Promise<number> {
        return this.saveAll([entity]);
    }

    public async saveAll<T>(entities: T[]): Promise<number> {
        let i: number = 0;
        let parameters: any = {};
        let sql = entities.map((e: any) => {
            let fields: string = Object.keys(e).join(',');
            let inserts: string = Object.keys(e).map(k => {
                let parameterName = `p${i++}`;
                parameters[parameterName] = e[k];
                return `:${parameterName}`;
            }).join(',');
            let updates: string = Object.keys(e).map(k => {
                let parameterName = `p${i++}`;
                parameters[parameterName] = e[k];
                return `${k}=:${parameterName}`;
            }).join(',');
            return `INSERT INTO ${entityTables.get(e.constructor)} (${fields}) VALUES (${inserts}) ON DUPLICATE KEY UPDATE ${updates};`;
        }).join('\n');
        logger.debug(`GridPersistenceManager.saveAll() sql=${sql}`);
        logger.debug(`GridPersistenceManager.saveAll() parameters=${JSON.stringify(parameters)}`);
        let result: UpsertResult[] = await this.pool.batch({sql, namedPlaceholders: true}, parameters);
        logger.debug(`GridPersistenceManager.saveAll() result=${JSON.stringify(result)}`);
        if (!Array.isArray(result)) result = [(result as UpsertResult)];
        return result.map(r => r.affectedRows).reduce((a, b) => a + b, 0);
    }

    public async findBy<T>(clazz: { new(): T; }, where: string, ...args: any[]): Promise<T[]> {
        let result: T[] = await this.pool.query(`select * from ${entityTables.get(clazz)} where ${where}`, args);
        return result.map(t => Object.assign(new clazz(), t));
    }

    public async findAll<T>(clazz: { new(): T; }): Promise<T[]> {
        let result: T[] = await this.pool.query(`select * from ${entityTables.get(clazz)}`);
        return result.map(t => Object.assign(new clazz(), t));
    }

    public async findOne<T>(clazz: { new(): T; }, id: any): Promise<T> {
        let idColumn = entityIds.get(clazz);
        let result = await this.pool.query(`select * from ${entityTables.get(clazz)} where ${idColumn} = ?`, id);
        if (!Array.isArray(result)) {
            throw `${idColumn} is not id in entity ${clazz.name}`;
        }
        if (result.length > 1) {
            throw `More than one entity returned for ${idColumn} in entity ${clazz.name}`;
        }
        return result.length == 1 ? Object.assign(new clazz(), result[0]) : null;
    }
}


export const entityTables: Map<any, string> = new Map();
export const entitySchemas: Map<any, string> = new Map();
export const entity = (config: { table?: string, schema?: string }) => {
    let {table, schema} = config;
    return (clazz?: any, method?: any, descriptor?: any) => {
        table = table || lowerCase(clazz.name);
        entityTables.set(clazz, table);
        entitySchemas.set(clazz, schema);
        clazz.TABLE = table;
        return descriptor;
    }
};
export const entityIds: Map<any, string> = new Map();
export const id = () => {
    return (clazz?: any, method?: any, descriptor?: any) => {
        entityIds.set(clazz.constructor, method);
        clazz.ID = method;
        return descriptor;
    }
};
