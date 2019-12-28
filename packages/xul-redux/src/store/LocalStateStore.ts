import { singleton, singletons } from "@xul/core";
import { LOGGER } from "../Logger";
import { IStateStore, stateStore, StateStore } from "./StateStore";

@singleton()
export class LocalStateStore implements IStateStore {
  public prefix: string = "local";

  public register() {
    stateStore.register(this);
  }

  public async load(): Promise<any> {
    return JSON.parse(localStorage.getItem("xul.state") ?? "{}");
  }

  public async save(state: any): Promise<void> {
    localStorage.setItem(`xul.state`, JSON.stringify(state ?? {}));
  }
}

export const enableLocalStateStore = () => (beanOrClass: any, method?: string, descriptor?: any) => {
  LOGGER.d(`Enabled local state store.`);
  singletons.get(LocalStateStore).register();
  return descriptor ?? beanOrClass;
};
