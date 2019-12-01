import { autowires, IAutowireOption } from "./Autowires";
import { LOG } from "./log/Log";
import { safeInvoke } from "./Utils";
export class Context {
  private beans: Map<string, any> = new Map();
  private lifeCycleHandlers: ILifeCycleHandler[] = [];

  public get(name: string): any {
    return this.beans.get(name);
  }

  public set(name: string, bean: any): any {
    this.beans.set(name, bean);
    if (typeof bean.onContextInitialized === "function") {
      this.lifeCycleHandlers.push({
        onContextInitialized: bean.onContextInitialized.bind(bean)
      });
    }
    return bean;
  }

  public singleton(name: string, bean: any): any {
    if (this.beans.has(name)) {
      throw new Error(`Duplicate registration of bean ${name}`);
    }
    this.set(name, bean);
    return bean;
  }
  public async initialize() {
    // Verify dependencies
    autowires.forEach((options: IAutowireOption[], bean: any) => {
      for (const option of options) {
        if (option.required && this.get(option.name) === undefined) {
          throw new Error(`Unsatisfied required dependency ${bean.constructor.name}->${option.name}`);
        }
      }
    });
    for (const handler of this.lifeCycleHandlers) {
      await safeInvoke(handler.onContextInitialized);
    }
    LOG.d(this, `Context intialized.`);
  }
}
export interface ILifeCycleHandler {
  onContextInitialized(): Promise<void>;
}
export const context = new Context();
