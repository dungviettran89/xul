import { context } from "./Context";
import { LOGGER } from "./Logger";
import { lowerFirst } from "./Utils";

export const singletons: Map<any, any> = new Map();
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
