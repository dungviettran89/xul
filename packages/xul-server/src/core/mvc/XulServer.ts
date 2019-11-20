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
    this.handlers.forEach(h => {
      (this.application as any)[h.method](h.path, h.getHandler());
    });
    this.application.listen(this.port, () => {
      logger.info(`XulServer.start() Application server started at http://127.0.0.1:${this.port}/`);
    });
  }
}

export const xulServer: XulServer = singletons.get(XulServer);
