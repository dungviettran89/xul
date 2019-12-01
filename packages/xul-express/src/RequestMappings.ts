import { autowired, postConstruct, singleton, singletons } from "@xul/core";
import { XulExpress } from "./XulExpress";

@singleton()
export class RequestMappings {
  @autowired()
  private xulExpress: XulExpress;

  @postConstruct()
  public onStart() {
    console.log(`Wiring up application`);
  }
}
export const requestMappings: RequestMappings = singletons.get(RequestMappings);
