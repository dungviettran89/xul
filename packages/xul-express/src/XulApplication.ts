import { singleton } from "@xul/core";
import { ClassLoader } from "./ClassLoader";
import { LOGGER } from "./Logger";

export const xulApplication = () => {
  return (beanClass: any): any => {
    singleton(beanClass);
    const start = Date.now();
    ClassLoader.run({
      onStart: async () => {
        LOGGER.i(`${beanClass.name} started after ${Date.now() - start}ms`);
      }
    });
    return beanClass;
  };
};
