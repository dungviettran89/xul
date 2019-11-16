import { postConstruct, singleton } from "./Index";
import { singletons } from "./Singletons";

export interface IScheduleOption {
  timeout?: number;
  interval?: number;
}

export interface IScheduleHandler {
  option: IScheduleOption;
  getHandler: () => () => any;
}

@singleton()
export class SchedulingBeans {
  private handlers: IScheduleHandler[] = [];

  public register(handler: IScheduleHandler): void {
    this.handlers.push(handler);
  }

  @postConstruct()
  public start(): void {
    for (const handler of this.handlers) {
      setTimeout(() => {
        const handle = handler.getHandler();
        handle();
        const interval = handler.option.interval;
        if (interval) {
          setInterval(handle, interval);
        }
      }, handler.option.timeout || 1000);
    }
  }
}

export const scheduledBeans: SchedulingBeans = singletons.get(SchedulingBeans);
export const scheduled = (option: IScheduleOption) => {
  return (clazz?: any, method?: any, descriptor?: any) => {
    scheduledBeans.register({ option, getHandler: () => descriptor.value.bind(singletons.get(clazz.constructor)) });
    return descriptor;
  };
};
