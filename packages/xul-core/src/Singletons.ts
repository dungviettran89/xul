import { context } from "./Context";
import { LOGGER } from "./Logger";
import { lowerFirst } from "./Utils";

export class Singletons {
  private singletons: Map<new (...args: any[]) => any, any> = new Map();
  public set<T>(clazz: new (...args: any[]) => T, bean: any): void {
    if (this.singletons.has(clazz)) {
      throw new Error(`More than one intance of singleton ${clazz.name}`);
    }
    this.singletons.set(clazz, bean);
  }
  public get<T>(clazz: new (...args: any[]) => T): T {
    return this.singletons.get(clazz) as T;
  }
}
export const singletons: Singletons = new Singletons();
export const singleton = (name?: string) => {
  return (beanClass: any): any => {
    name = name || lowerFirst(beanClass.name);
    const instance: any = new beanClass();
    beanClass.INSTANCE = instance;
    context.singleton(name, instance);
    singletons.set(beanClass, instance);
    instance.originalConstructor = beanClass;
    LOGGER.d(`Registered class ${beanClass.name} as singleton name ${name}`);
    beanClass.constructor = () => {
      throw new Error(`${beanClass.name} is singleton.`);
    };
    return beanClass;
  };
};
