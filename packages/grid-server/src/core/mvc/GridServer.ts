import {autowired, gridContext, singleton} from "../context/GridContext";
import {logger} from "../GridLogger";

import express, {Application} from "express";

@singleton()
export class GridServer {
    public port: number = parseInt(process.env.port || "8080", 10);
    public application: Application = express();
    public handlers: { path: string; method: string; getHandler: () => any }[] = [];
    @autowired()
    public initializingBeans: { order: number, getHandler: () => any }[];

    constructor() {
        gridContext.singleton("application", this.application);
    }

    public async start() {
        const start: number = Date.now();
        logger.info(`GridApplication.start() Starting application server on port ${this.port}.`);
        this.handlers.forEach(h => {
            (this.application as any)[h.method](h.path, h.getHandler());
        });
        if (this.initializingBeans) {
            for (const b of this.initializingBeans) {
                let promise = Promise.resolve(b.getHandler()());
                if (promise) await promise;
            }
        }
        this.application.listen(this.port, () => {
            const duration = Date.now() - start;
            logger.info(`GridApplication.start() Application server started after ${duration}ms.`);
        });
    }
}

export const gridServer: GridServer = gridContext.get("gridServer");
