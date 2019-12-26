export const safeInvoke = async (callable?: () => any): Promise<void> => {
  if (callable === undefined) {
    return;
  }
  const called: any = callable();
  if (called && typeof called.then === "function") {
    await (called as Promise<any>);
  }
};
export const get = (obj: any, path: string, defaultValue?: any): any => {
  const result = String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res: any, key: string) => (res !== null && res !== undefined ? res[key] : res), obj);
  return result === undefined || result === obj ? defaultValue : result;
};
export const lowerFirst = (name: string): string => {
  return name.substr(0, 1).toLowerCase() + name.substr(1);
};
export const debounce = (func: any, wait: number, immediate: boolean = false) => {
  let timeout: any;
  return (...args: any[]) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, ...args);
      }
    }, wait);
    if (immediate && !timeout) {
      func.apply(context, ...args);
    }
  };
};
export const delay = (func: () => void, wait: number) => {
  let timeout: any;
  return (immediate: boolean = false) => {
    // Invoke now if needed
    if (immediate) {
      clearTimeout(timeout);
      timeout = undefined;
      return func();
    }
    // Ignore subsequence call
    if (timeout) {
      return;
    }
    timeout = setTimeout(() => {
      timeout = undefined;
      func();
    }, wait);
  };
};
export const assign = <T>(target: T, path: string | string[], value: any): T => {
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
