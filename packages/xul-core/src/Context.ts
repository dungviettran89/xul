import {LOGGER} from "./Logger";
import {safeInvoke} from "./Utils";

export interface IAutowireOption {
  name?: string;
  required?: boolean;
}

export const autowires: Map<any, IAutowireOption[]> = new Map();
export const autowired = (option?: string | IAutowireOption): any => {
  return (bean: any, method?: any, descriptor?: any): any => {
    const autowireOption: IAutowireOption = typeof option === "string" ? {name: option, required: true} : option || {};
    autowireOption.name = autowireOption.name || method;
    autowireOption.required = autowireOption.required !== undefined ? autowireOption.required : true;
    if (!autowires.has(bean)) {
      autowires.set(bean, []);
    }
    autowires.get(bean).push(autowireOption);
    return {
      get() {
        return context.get(autowireOption.name);
      }
    };
  };
};

export class Context {
  private beans: Map<string, any> = new Map();
  private lifeCycleHandlers: ILifeCycleHandler[] = [];

  public get(name: string): any {
    return this.beans.get(name);
  }

  public set(name: string, bean: any): any {
    this.beans.set(name, bean);
    if (typeof bean.onContextInitialized === "function") {
      this.lifeCycleHandlers.push({
        onContextInitialized: bean.onContextInitialized.bind(bean)
      });
    }
    return bean;
  }

  public singleton(name: string, bean: any): any {
    if (this.beans.has(name)) {
      throw new Error(`Duplicate registration of bean ${name}`);
    }
    this.set(name, bean);
    return bean;
  }
  public async initialize() {
    // Verify dependencies
    autowires.forEach((options: IAutowireOption[], bean: any) => {
      for (const option of options) {
        if (option.required && this.get(option.name) === undefined) {
          throw new Error(`Unsatisfied required dependency ${bean.constructor.name}->${option.name}`);
        }
      }
    });
    for (const handler of this.lifeCycleHandlers) {
      await safeInvoke(handler.onContextInitialized);
    }
    LOGGER.info(`Context intialized.`);
  }
}
export interface ILifeCycleHandler {
  onContextInitialized(): Promise<void>;
}
export const context = new Context();
