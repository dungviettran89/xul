import { singletons } from "@xul/core";
import { Given, setDefinitionFunctionWrapper, Then, When } from "cucumber";

const decorateCucumber = (cucumberMethod: (pattern: string, handler: any) => any, pattern: string) => {
  return (clazz: any, method: any, descriptor: any) => {
    descriptor.value.getInstance = () => singletons.get(clazz.constructor);
    cucumberMethod(pattern, descriptor.value);
    return descriptor;
  };
};
export const given = (pattern: string) => decorateCucumber(Given, pattern);
export const then = (pattern: string) => decorateCucumber(Then, pattern);
export const when = (pattern: string) => decorateCucumber(When, pattern);
setDefinitionFunctionWrapper((fn: any) => {
  return async (...args: any[]) => {
    if (fn.getInstance === undefined) {
      return await fn();
    }
    return await fn.apply(fn.getInstance(), args);
  };
});
