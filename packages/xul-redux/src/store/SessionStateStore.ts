import { singleton, singletons } from "@xul/core";
import { LOGGER } from "../Logger";
import { IStateStore, stateStore, StateStore } from "./StateStore";

@singleton()
export class SessionStateStore implements IStateStore {
  public prefix: string = "session";

  public register() {
    stateStore.register(this);
  }

  public async load(): Promise<any> {
    return JSON.parse(sessionStorage.getItem("xul.state") ?? "{}");
  }

  public async save(state: any): Promise<void> {
    sessionStorage.setItem(`xul.state`, JSON.stringify(state ?? {}));
  }
}

export const enableSessionStateStore = () => (beanOrClass: any, method?: string, descriptor?: any) => {
  LOGGER.d(`Enabled session state store.`);
  singletons.get(SessionStateStore).register();
  return descriptor ?? beanOrClass;
};
