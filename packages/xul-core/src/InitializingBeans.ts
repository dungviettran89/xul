import { singleton, singletons } from "./Singletons";
interface IOrderedHanlder {
  order: number;
  getHandler: () => any;
}
@singleton()
export class InitializingBeans {
  private beans: IOrderedHanlder[] = [];
  public register(handler: IOrderedHanlder): void {
    this.beans.push(handler);
  }
  public ordered(): IOrderedHanlder[] {
    return this.beans.slice().sort((a, b) => {
      return a.order - b.order;
    });
  }
}
export const initializingBeans: InitializingBeans = singletons.get(InitializingBeans);
export const onStart = (order: number = 100) => {
  return (clazz: any, method?: any, descriptor?: any) => {
    initializingBeans.register({ order, getHandler: () => descriptor.value.bind(singletons.get(clazz.constructor)) });
  };
};
export const postConstruct = onStart;
