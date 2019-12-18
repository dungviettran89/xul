import { context, singleton } from "@xul/core";
import mariadb, { Pool } from "mariadb";
import { LOGGER } from "../Logger";

@singleton()
export class DatabaseConfig {
  constructor() {
    const host = process.env.db_host || "localhost";
    const port = parseInt(process.env.db_port, 10) || 3306;
    const database = process.env.db_name || "automation";
    const user = process.env.db_user || "automation";
    const password = process.env.db_password || "automation";
    LOGGER.i(`DatabaseConfig.constructor() url=${host}:${port}/${database}`);
    LOGGER.i(`DatabaseConfig.constructor() user=${user}`);
    const pool: Pool = mariadb.createPool({ host, port, database, user, password });
    context.singleton("xul.data.pool", pool);
  }
}
