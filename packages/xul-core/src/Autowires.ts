import { context } from "./Context";
export interface IAutowireOption {
  name?: string;
  required?: boolean;
}
export const autowires: Map<any, IAutowireOption[]> = new Map();
export const autowired = (option?: string | IAutowireOption): any => {
  return (bean: any, method?: any, descriptor?: any): any => {
    const autowireOption: IAutowireOption = typeof option === "string" ? { name: option, required: true } : option || {};
    autowireOption.name = autowireOption.name || method;
    autowireOption.required = autowireOption.required !== undefined ? autowireOption.required : true;
    if (!autowires.has(bean)) {
      autowires.set(bean, []);
    }
    autowires.get(bean).push(autowireOption);
    return {
      get() {
        return context.get(autowireOption.name);
      }
    };
  };
};
