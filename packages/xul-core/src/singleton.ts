import { camelCase } from "lodash";
import { context } from "./Context";

export const singletons: Map<any, any> = new Map();
export const singleton = (name?: string) => {
  return (beanClass: any): any => {
    name = name || camelCase(beanClass.name);
    const instance: any = new beanClass();
    beanClass.INSTANCE = instance;
    context.singleton(name, instance);
    singletons.set(beanClass, instance);
    beanClass.constructor = () => {
      throw new Error(`${beanClass.name} is singleton.`);
    };
    return beanClass;
  };
};
