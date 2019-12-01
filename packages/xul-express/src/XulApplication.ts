import { singleton } from "@xul/core";
import { ClassLoader } from "./ClassLoader";

export const xulApplication = () => {
  return (beanClass: any): any => {
    singleton(beanClass);
    const start = Date.now();
    ClassLoader.run({
      onStart: async () => {
        console.log(`${beanClass.name} started after ${Date.now() - start}ms`);
      }
    });
    return beanClass;
  };
};
