import {gridContext, singletons} from "../context/GridContext";
import {logger} from "../GridLogger";

let DEFAULT_INITIAL = 1000;
export type ScheduleOptions = { initial?: number, interval?: number };
const scheduledBeans: { option: ScheduleOptions, getHandler: () => any }[] = [];
gridContext.singleton('scheduledBeans', scheduledBeans);
export const scheduled = (option: ScheduleOptions) => {
    return (clazz?: any, method?: any, descriptor?: any) => {
        if (!option.initial) {
            option.initial = DEFAULT_INITIAL;
        }
        logger.info(`Scheduled bean ${clazz.constructor.name}.${method}() 
        initial=${option.initial} interval=${option.interval}`);
        scheduledBeans.push({option, getHandler: () => descriptor.value.bind(singletons.get(clazz.constructor))});
        return descriptor;
    }
};