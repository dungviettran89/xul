import { gridContext, singleton } from "./GridContext";
import { logger } from "./GridLogger";

import express, { Application } from "express";
import { upperCase } from "lodash";

@singleton()
export class GridServer {
  public port: number = parseInt(process.env.port || "8080", 10);
  public application: Application = express();
  public handlers: { path: string; method: string; getHandler: () => any }[] = [];

  constructor() {
    gridContext.singleton("application", this.application);
  }

  public start() {
    const start: number = Date.now();
    logger.info(`GridApplication.start() Starting application server on port ${this.port}.`);
    this.handlers.forEach(h => {
      (this.application as any)[h.method](h.path, h.getHandler());
    });
    this.application.listen(this.port, () => {
      const duration = Date.now() - start;
      logger.info(`GridApplication.start() Application server started after ${duration}ms.`);
    });
  }
}

export const gridServer: GridServer = gridContext.get("gridServer");
const handlersMappings: Map<string, Array<{ path: string; method: string; methodName: string; handler: any }>> = new Map();
export const requestMapping = (path?: string, method?: string): any => {
  return (beanClass: any, beanMethod?: any, descriptor?: any): any => {
    // handle method first
    if (beanMethod && descriptor) {
      path = path || beanMethod;
      method = method || "get";
      const className = beanClass.constructor.name;
      if (!handlersMappings.has(className)) handlersMappings.set(className, []);
      handlersMappings.get(className).push({ path, method, methodName: beanMethod, handler: descriptor.value });
      return descriptor;
    }
    // handle class next
    path = path || "/";
    const handlers: Array<{ path: string; method: any; methodName: string; handler: any }> = handlersMappings.get(beanClass.name) || [];
    handlers.forEach(h => {
      const requestPath = (path + "/" + h.path).replace("//", "");
      logger.info(`Mapped ${upperCase(h.method)} ${requestPath} to ${beanClass.name}.${h.methodName}()`);
      gridServer.handlers.push({
        path: requestPath,
        method: h.method,
        getHandler: () => {
          return h.handler.bind(beanClass.INSTANCE);
        }
      });
    });
    return beanClass;
  };
};
