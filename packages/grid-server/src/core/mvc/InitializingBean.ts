import {gridContext, singletons} from "../context/GridContext";

const initializingBeans: { order: number, getHandler: () => any }[] = [];
gridContext.singleton("initializingBeans", initializingBeans);
export const onStart = (order: number = 100) => {
    return (clazz: any, method?: any, descriptor?: any) => {
        initializingBeans.push({order, getHandler: () => descriptor.value.bind(singletons.get(clazz.constructor))});
    }
};
export const postConstruct = onStart;