import { autowired, postConstruct, singleton, singletons } from "@xul/core";
import { ExpressServer } from "./ExpressServer";
export interface IRequestMappingOption {
  path?: string;
  method?: string;
}
@singleton()
export class RequestMappings {
  @autowired("xul.express.server")
  private server: ExpressServer;

  @postConstruct(ExpressServer.ORDER - 1)
  public onStart() {
    console.log(`Wiring up application`);
  }
}

export const requestMappings: RequestMappings = singletons.get(RequestMappings);
export const requestMapping = (optionOrPath?: string | IRequestMappingOption) => {
  return (beanOrClass?: any, method?: any, descriptor?: any) => {
    return descriptor || beanOrClass;
  };
};
