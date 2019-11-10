import {lowerCase} from 'lodash';
import {singleton} from "../context/GridContext";
import mariadb, {Pool} from "mariadb";
import {onStart} from "../mvc/InitializingBean";
import {logger} from "../GridLogger";

@singleton()
export class GridPersistenceManager {
    private pool: Pool;

    constructor() {
        this.pool = mariadb.createPool({
            host: process.env.db_host || "localhost",
            port: parseInt(process.env.db_port, 10) || 3306,
            database: process.env.db_name || "automation",
            user: process.env.db_user || "automation",
            password: process.env.db_password || "automation"
        });
    }

    @onStart(-1)
    public async start() {
        logger.info(`GridPersistenceManager.start() `);
        if (entitySchemas) {
            for (let schema of entitySchemas.values()) {
                logger.info(`Executing ${schema}`);
                await this.pool.query(schema);
            }
        }
    }

    public async findAll<T>(clazz: { new(): T; }): Promise<T[]> {
        return await this.pool.query(`select * from ${entityTables.get(clazz)}`);
    }

    public async findOne<T>(clazz: { new(): T; }, id: any): Promise<T> {
        let idColumn = entityIds.get(clazz);
        let result = await this.pool.query(`select * from ${entityTables.get(clazz)} where ${idColumn} = ?`, id);
        if (!Array.isArray(result)) {
            throw `${idColumn} is not id in entity ${clazz.name}`;
        }
        if(result.length>0){
            throw `More than one entity returned for ${idColumn} in entity ${clazz.name}`;
        }
        return result.length == 1 ? result[0] : null;
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
        entityTables.set(clazz, method);
        clazz.ID = method;
        return descriptor;
    }
};
