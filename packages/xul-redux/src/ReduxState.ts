import { get } from "@xul/core";
import { LOGGER } from "./Logger";
import { store } from "./ReduxStore";

export interface IReduxOptions {
  prefix?: string;
}

export interface IStateOptions {
  prefix?: string;
  absolute?: boolean;
  defaultValue?: any;
}

export const statePrefixes: Map<any, IReduxOptions> = new Map();
export const state = (prefixOrOptions?: string | IStateOptions, defaultValue?: any): any => {
  let options: IStateOptions = { prefix: ``, absolute: false, defaultValue: undefined };
  if (typeof prefixOrOptions === "string") {
    options = Object.assign(options, { prefix: prefixOrOptions });
  } else if (prefixOrOptions !== undefined) {
    options = Object.assign(options, prefixOrOptions);
  }
  options.prefix = options.prefix || ``;
  options.defaultValue = options.defaultValue || defaultValue;
  return (beanOrClass: any, name?: string, descriptor?: any) => {
    return {
      get() {
        options.prefix = options.prefix || name || ``;
        const classOptions = statePrefixes.get(beanOrClass.constructor) || { prefix: `` };
        let path: string = options.prefix;
        if (!options.absolute && classOptions.prefix) {
          path = `${classOptions.prefix}.${options.prefix}`;
        }
        return get(store.getState(), path, options.defaultValue);
      }
    };
  };
};
export const createRedux = (enhance: (clazz: any, start: (stateChanged: () => void) => void, stop: () => void) => any) => (
  prefixOrOptions?: string | IReduxOptions
): any => {
  let options: IReduxOptions = { prefix: `` };
  if (typeof prefixOrOptions === "string") {
    options = Object.assign(options, { prefix: prefixOrOptions });
  } else if (prefixOrOptions !== undefined) {
    options = Object.assign(options, prefixOrOptions);
  }
  return (clazz: any): any => {
    statePrefixes.set(clazz, options);
    let unsubscribe: () => void;
    const start = (stateChanged: () => void) => {
      LOGGER.d(`start() invoked. `, stateChanged);
      unsubscribe = (store as any).subscribe(stateChanged);
    };
    const stop = () => {
      LOGGER.d(`stop() invoked. `);
      if (unsubscribe) {
        unsubscribe();
      }
    };
    return enhance(clazz, start, stop);
  };
};
