import {autowired, gridContext, singleton} from "../context/GridContext";
import {logger} from "../GridLogger";

import express, {Application} from "express";
import {ScheduleOptions} from "./SchedulingBeans";

@singleton()
export class GridServer {
    public port: number = parseInt(process.env.port || "8080", 10);
    public application: Application = express();
    public handlers: { path: string; method: string; getHandler: () => any }[] = [];
    @autowired()
    public initializingBeans: { order: number, getHandler: () => any }[];
    @autowired()
    public scheduledBeans: { option: ScheduleOptions, getHandler: () => any }[];

    constructor() {
        gridContext.singleton("application", this.application);
        gridContext.singleton("applicationPort", this.port);
    }

    public async start() {
        const start: number = Date.now();
        logger.info(`GridApplication.start() Starting application server on port ${this.port}.`);
        this.handlers.forEach(h => {
            (this.application as any)[h.method](h.path, h.getHandler());
        });
        await this.initializeBeans();
        await this.scheduleBeans();
        this.application.listen(this.port, () => {
            const duration = Date.now() - start;
            logger.info(`GridApplication.start() Application server started after ${duration}ms.`);
        });
    }

    private async initializeBeans() {
        if (this.initializingBeans) {
            let orderedBeans = this.initializingBeans.slice()
                .sort((a, b) => {
                    return a.order - b.order;
                });
            for (const b of orderedBeans) {
                let promise = Promise.resolve(b.getHandler()());
                if (promise) await promise;
            }
        }
    }

    private async scheduleBeans() {
        if (this.scheduledBeans) {
            for (const b of this.scheduledBeans) {
                setTimeout(async () => {
                    await b.getHandler()();
                    if (b.option.interval) setInterval(b.getHandler(), b.option.interval);
                }, b.option.initial)
            }
        }
    }
}

export const gridServer: GridServer = gridContext.get("gridServer");
