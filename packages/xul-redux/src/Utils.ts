import { LOGGER } from "./Logger";

export const get = (source: any, path: string | string[], defaultValue?: any): any => {
  LOGGER.d(`get(${JSON.stringify(source)},${JSON.stringify(path)},${JSON.stringify(path)}) `);
  if (source === undefined || path === undefined || path === "") {
    return source || defaultValue;
  }
  // split path by .
  if (typeof path === "string") {
    return get(source, path.split("."), defaultValue);
  }
  const paths: string[] = path as string[];
  if (paths === null || paths.length === 0) {
    return source || defaultValue;
  }
  return get(source[paths[0]], paths.splice(1), defaultValue);
};
export const assign = <T>(target: T, path: string | string[], value: any): T => {
  LOGGER.d(`assign(${JSON.stringify(target)},${JSON.stringify(path)},${JSON.stringify(value)}) `);
  // split path by .
  if (typeof path === "string") {
    return assign(target, path.split("."), value);
  }
  const paths: string[] = path as string[];
  // exit condition
  if (paths === null || paths.length === 0) {
    return Object.assign({}, target, value);
  }
  const source: any = {};
  const field: string = paths[0];
  source[field] = assign((target as any)[field], paths.splice(1), value);
  return Object.assign({}, target, source);
};
