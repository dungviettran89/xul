import { autowired, context, postConstruct, singleton, singletons } from "@xul/core";
import { logger } from "../XulLogger";

import express, { Application } from "express";

@singleton()
export class XulServer {
  public port: number = parseInt(process.env.port || "8080", 10);
  public application: Application = express();
  public handlers: Array<{ path: string; method: string; getHandler: () => any }> = [];

  constructor() {
    context.singleton("application", this.application);
    context.singleton("applicationPort", this.port);
  }

  @postConstruct()
  public async start() {
    const start: number = Date.now();
    logger.info(`XulServer.start() Starting application server on port ${this.port}.`);
    this.handlers.forEach(h => {
      (this.application as any)[h.method](h.path, h.getHandler());
    });
    this.application.listen(this.port, () => {
      const duration = Date.now() - start;
      logger.info(`XulServer.start() Application server started after ${duration}ms.`);
    });
  }
}

export const xulServer: XulServer = singletons.get(XulServer);
