import { assign, get, lowerFirst } from "@xul/core";
import { LOGGER } from "./Logger";
import { statePrefixes } from "./ReduxState";
import { reduxStore } from "./ReduxStore";

export interface IReducerOptions {
  type?: string;
  prefix?: string;
  absolute?: boolean;
}

export const reduce = (typeOrOptions?: string | IReducerOptions) => {
  return (beanOrClass: any, name?: string, descriptor?: any) => {
    const options: IReducerOptions = typeof typeOrOptions === "string" ? { type: typeOrOptions } : typeOrOptions || {};
    options.type = options.type || `${beanOrClass.constructor.name}.${lowerFirst(name.substr(2))}`;
    LOGGER.d(`Mapped reducer of ${options.type} to method ${beanOrClass.constructor.name}.${name}(). options=`, options);
    const { type, absolute } = options;
    const reducerFunction = descriptor.value.bind(beanOrClass);
    reduxStore.addReducer(type, (state, action) => {
      let prefix = options.prefix || "";
      const classOptions = statePrefixes.get(beanOrClass.constructor);
      if (!options.absolute && classOptions && classOptions.prefix) {
        prefix = [classOptions.prefix, options.prefix].filter(Boolean).join(".");
      }
      let match = /\$([a-zA-Z0-9]+)/g.exec(prefix);
      while (match) {
        const portion = match[0];
        const field = match[1];
        if (field in action) {
          prefix = prefix.replace(portion, action[field]);
        } else {
          throw new Error(`Can not find field ${field} in ${action.type}`);
        }
        match = /\$([a-zA-Z]+)/g.exec(prefix);
      }
      LOGGER.d(`reduce() prefix=`, prefix);
      if (prefix) {
        let scopedState = get(state, prefix);
        scopedState = reducerFunction(scopedState, action);
        return assign(state, prefix, scopedState);
      } else {
        return reducerFunction(state, action);
      }
    });
    return descriptor;
  };
};
