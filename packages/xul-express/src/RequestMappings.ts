import { autowired, postConstruct, singleton, singletons } from "@xul/core";
import { ExpressServer } from "./ExpressServer";
import { LOGGER } from "./Logger";

@singleton()
export class RequestMappings {
  @autowired("xul.express.server")
  private server: ExpressServer;
  private handlers: Map<any, IClassRequestMappingOption> = new Map();

  @postConstruct(ExpressServer.ORDER + 1)
  public onStart() {
    const application = this.server.application;
    this.handlers.forEach((classOption: IClassRequestMappingOption, clazz: any) => {
      classOption.handlers.forEach(option => {
        const path = `/${classOption.path}/${option.path}`.replace("//", "/");
        const logMethod = option.method.toUpperCase();
        LOGGER.i(`Mapped ${logMethod} ${path} to ${clazz.name}.${option.classMethod}()`);
        (application as any)[option.method](path, option.getHandler());
      });
    });
  }

  public mapMethod(optionOrPath?: string | IRequestMappingOption, beanOrClass?: any, method?: any, descriptor?: any): any {
    const classOption = this.getOption(beanOrClass.constructor);
    const option: IRequestMappingOption = {};
    if (typeof optionOrPath === "string") {
      option.path = optionOrPath;
    } else if (optionOrPath !== undefined) {
      Object.assign(option, optionOrPath);
    }
    option.method = option.method || "get";
    option.path = option.path || method;
    option.classMethod = option.classMethod || method;
    option.getHandler = () => descriptor.value.bind(singletons.get(beanOrClass.constructor));
    classOption.handlers.push(option);
    LOGGER.t(`Mapped class ${beanOrClass.constructor.name}.${method}() to option `, option);
    return descriptor;
  }

  public mapClass(optionOrPath?: string | IRequestMappingOption, beanOrClass?: any): any {
    const option = this.getOption(beanOrClass);
    if (typeof optionOrPath === "string") {
      option.path = optionOrPath;
    } else if (optionOrPath !== undefined) {
      Object.assign(option, optionOrPath);
    }
    option.method = option.method || "get";
    option.path = option.path || "";
    LOGGER.t(`Mapped class ${beanOrClass.name} to option `, option);
    return beanOrClass;
  }

  private getOption(beanOrClass: any): IClassRequestMappingOption {
    if (!this.handlers.has(beanOrClass)) {
      this.handlers.set(beanOrClass, { handlers: [] });
    }
    return this.handlers.get(beanOrClass);
  }
}
export interface IRequestMappingOption {
  path?: string;
  method?: string;
  classMethod?: string;
  getHandler?: () => any;
}
export interface IClassRequestMappingOption extends IRequestMappingOption {
  handlers: IRequestMappingOption[];
}
export const requestMappings: RequestMappings = singletons.get(RequestMappings);
export const requestMapping = (optionOrPath?: string | IRequestMappingOption) => {
  return (beanOrClass?: any, method?: any, descriptor?: any) => {
    if (descriptor) {
      return requestMappings.mapMethod(optionOrPath, beanOrClass, method, descriptor);
    }
    return requestMappings.mapClass(optionOrPath, beanOrClass);
  };
};
