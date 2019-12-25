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
