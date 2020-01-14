import { singleton } from "@xul/core";
import { LOGGER } from "./Logger";
import { store } from "./ReduxStore";

export interface IActionOptions {
  type?: string;
}
@singleton(`xul.redux.reduxActions`)
export class ReduxActions {
  public actions: Map<string, any[]> = new Map();
  public addAction(type: string, actionToAdd: any): void {
    if (!this.actions.has(type)) {
      this.actions.set(type, []);
    }
    this.actions.get(type).push(actionToAdd);
  }
}
export const action = (typeOrOptions?: string | IActionOptions) => {
  return (beanOrClass: any, name?: string, descriptor?: any) => {
    const options: IActionOptions = typeof typeOrOptions === "string" ? { type: typeOrOptions } : typeOrOptions || {};
    options.type = options.type || `${beanOrClass.constructor.name}.${name}`;
    LOGGER.d(`Mapped action ${options.type} to method ${beanOrClass.constructor.name}.${name}(). options=`, options);
    return {
      get() {
        return (...args: any[]) => {
          const handler = descriptor.value.bind(beanOrClass);
          let result = handler(...args);
          const promise = Promise.resolve(result);
          if (promise) {
            result = promise.then((r: any) => store.dispatch({ type: options.type, ...r, ...options }));
          } else if (typeof result === "function") {
            result((r: any) => store.dispatch({ type: options.type, ...r, ...options }), store.getState);
          } else {
            store.dispatch({ type: options.type, ...result, ...options });
          }
          return result;
        };
      }
    };
  };
};
