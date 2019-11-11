import { xulContext, singletons } from "../context/XulContext";

const initializingBeans: Array<{ order: number; getHandler: () => any }> = [];
xulContext.singleton("initializingBeans", initializingBeans);
export const onStart = (order: number = 100) => {
  return (clazz: any, method?: any, descriptor?: any) => {
    initializingBeans.push({ order, getHandler: () => descriptor.value.bind(singletons.get(clazz.constructor)) });
  };
};
export const postConstruct = onStart;
