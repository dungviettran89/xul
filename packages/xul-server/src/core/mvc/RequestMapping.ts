import { upperCase } from "lodash";
import { singletons } from "../context/XulContext";
import { logger } from "../XulLogger";
import { xulServer } from "./XulServer";

const handlersMappings: Map<string, Array<{ handler: any; method: string; methodName: string; path: string }>> = new Map();
export const requestMapping = (path?: string, method?: string): any => {
  return (beanClass: any, beanMethod?: any, descriptor?: any): any => {
    // handle method first
    if (beanMethod && descriptor) {
      path = path || beanMethod;
      method = method || "get";
      const className = beanClass.constructor.name;
      if (!handlersMappings.has(className)) {
        handlersMappings.set(className, []);
      }
      handlersMappings.get(className).push({ path, method, methodName: beanMethod, handler: descriptor.value });
      return descriptor;
    }
    // handle class next
    path = path || "/";
    const handlers: Array<{ handler: any; method: string; methodName: string; path: string }> = handlersMappings.get(beanClass.name) || [];
    handlers.forEach(h => {
      const requestPath = (path + "/" + h.path).replace("//", "");
      logger.info(`Mapped ${upperCase(h.method)} ${requestPath} to ${beanClass.name}.${h.methodName}()`);
      xulServer.handlers.push({
        getHandler: () => {
          return h.handler.bind(singletons.get(beanClass));
        },
        method: h.method,
        path: requestPath
      });
    });
    return beanClass;
  };
};
