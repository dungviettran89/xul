import {logger} from "../GridLogger";
import {gridServer} from "./GridServer";
import {upperCase} from "lodash";
import {singletons} from "../context/GridContext";

const handlersMappings: Map<string, Array<{ path: string; method: string; methodName: string; handler: any }>> = new Map();
export const requestMapping = (path?: string, method?: string): any => {
    return (beanClass: any, beanMethod?: any, descriptor?: any): any => {
        // handle method first
        if (beanMethod && descriptor) {
            path = path || beanMethod;
            method = method || "get";
            const className = beanClass.constructor.name;
            if (!handlersMappings.has(className)) handlersMappings.set(className, []);
            handlersMappings.get(className).push({path, method, methodName: beanMethod, handler: descriptor.value});
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
                    return h.handler.bind(singletons.get(beanClass));
                }
            });
        });
        return beanClass;
    };
};