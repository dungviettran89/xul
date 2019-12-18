import { LOGGER } from "./Logger";
import { reduxStore } from "./ReduxStore";
export interface IReducerOptions {
  type: string;
  absolute?: boolean;
}

export const reduce = (typeOrOptions: string | IReducerOptions) => {
  return (beanOrClass: any, name?: string, descriptor?: any) => {
    let options: IReducerOptions = typeof typeOrOptions === "string" ? { type: typeOrOptions } : typeOrOptions;
    options = options || { type: `${beanOrClass.constructor.name}.${lowerFirst(name.substr(2))}` };
    LOGGER.d(`Mapped reducer of ${options.type} to method ${beanOrClass.constructor.name}.${name}(). options=`, options);
    const { type, absolute } = options;
    const reducerFunction = descriptor.value.bind(beanOrClass);
    reduxStore.addReducer(type, (state, action) => {
      if (absolute !== true && beanOrClass.constructor.statePrefix) {
        let prefix = beanOrClass.constructor.statePrefix;
        let match = /\$([a-zA-Z]+)/g.exec(prefix);
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
        let scopedState = get(state, prefix);
        scopedState = reducerFunction(scopedState, action);
        set(state, prefix, scopedState);
        return state;
      }
      return reducerFunction(state, action);
    });
    return descriptor;
  };
};
const get = (obj: any, path: string, defaultValue?: any) => {
  const result = String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res: string, key: number) => (res !== null && res !== undefined ? res[key] : res), obj);
  return result === undefined || result === obj ? defaultValue : result;
};
const lowerFirst = (name: string): string => {
  return name.substr(0, 1).toLowerCase() + name.substr(1);
};
const set = (target: any, path: string, value: any) => {
  return target;
};