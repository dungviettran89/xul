export class Context {
  private beans: Map<string, any> = new Map();

  public get(name: string): any {
    return this.beans.get(name);
  }

  public singleton(name: string, bean: any): any {
    if (this.beans.has(name)) {
      throw new Error(`Duplicate registration of bean ${name}`);
    }
    this.beans.set(name, bean);
    return bean;
  }
}
export const context = new Context();
export const autowired = (name?: string): any => {
  return (clazz: any, method?: any, descriptor?: any): any => {
    name = name || method;
    return {
      get() {
        return context.get(name);
      }
    };
  };
};
