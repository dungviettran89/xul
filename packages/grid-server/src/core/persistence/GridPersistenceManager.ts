import {autowired, singleton} from "../context/GridContext";
import mariadb, {Pool} from "mariadb";
import {onStart} from "../mvc/InitializingBean";
import {logger} from "../GridLogger";
import {entityTables, entitySchemas} from "./Entity";

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

    public async findAll(clazz: any): Promise<any[]> {
        return await this.pool.query(`select * from ${entityTables.get(clazz)}`);
    }
}
