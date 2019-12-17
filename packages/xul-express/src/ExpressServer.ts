import { autowired, context, ILifeCycleHandler, postConstruct, singleton, singletons } from "@xul/core";
import express, { Application } from "express";
import { LOGGER } from "./Logger";

@singleton("xul.express.server")
export class ExpressServer {
  public static ORDER: number = 400;
  public port: number = parseInt(process.env.XUL_PORT || "8080", 10);
  public application: Application = express();

  constructor() {
    // TODO: This can be improved by ConditionalOnMissingBean
    context.singleton("xul.express.application", this.application);
    context.singleton("xul.express.port", this.port);
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  @postConstruct(ExpressServer.ORDER)
  public async start() {
    this.application.listen(this.port, () => {
      LOGGER.i(`Application server started at http://localhost:${this.port}/`);
    });
  }
}
export const xulExpress: ExpressServer = singletons.get(ExpressServer);
