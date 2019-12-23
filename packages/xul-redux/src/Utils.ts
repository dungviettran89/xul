export const get = (obj: any, path: string, defaultValue?: any): any => {
  const result = String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  return result === undefined || result === obj ? defaultValue : result;
};
export const lowerFirst = (name: string): string => {
  return name.substr(0, 1).toLowerCase() + name.substr(1);
};
