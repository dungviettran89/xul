import { camelCase } from "lodash";
import { logger } from "../XulLogger";

export class XulContext {
  private beans: Map<string, any> = new Map();

  public get(name: string): any {
    return this.beans.get(name);
  }

  public singleton(name: string, bean: any): any {
    if (this.beans.has(name)) {
      throw new Error(`Duplicate registration of bean ${name}`);
    }
    this.beans.set(name, bean);
    return bean;
  }
}

export const xulContext = new XulContext();
export const singletons: Map<any, any> = new Map();
export const singleton = (name?: string) => {
  return (beanClass: any): any => {
    name = name || camelCase(beanClass.name);
    logger.debug(`XulContext.singleton() name=${name}`);
    const instance: any = new beanClass();
    beanClass.INSTANCE = instance;
    xulContext.singleton(name, instance);
    singletons.set(beanClass, instance);
    beanClass.constructor = () => {
      throw new Error(`${beanClass.name} is singleton.`);
    };
    return beanClass;
  };
};
export const autowired = (name?: string): any => {
  return (clazz: any, method?: any, descriptor?: any): any => {
    name = name || method;
    return {
      get() {
        return xulContext.get(name);
      }
    };
  };
};
