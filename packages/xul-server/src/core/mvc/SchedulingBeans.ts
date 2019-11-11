import { xulContext, singletons } from "../context/XulContext";
import { logger } from "../XulLogger";

const DEFAULT_INITIAL = 1000;
export class ScheduleOptions {
  public initial?: number;
  public interval?: number;
}
const scheduledBeans: Array<{ option: ScheduleOptions; getHandler: () => any }> = [];
xulContext.singleton("scheduledBeans", scheduledBeans);
export const scheduled = (option: ScheduleOptions) => {
  return (clazz?: any, method?: any, descriptor?: any) => {
    if (!option.initial) {
      option.initial = DEFAULT_INITIAL;
    }
    logger.info(`Scheduled bean ${clazz.constructor.name}.${method}()
        initial=${option.initial} interval=${option.interval}`);
    scheduledBeans.push({ option, getHandler: () => descriptor.value.bind(singletons.get(clazz.constructor)) });
    return descriptor;
  };
};
