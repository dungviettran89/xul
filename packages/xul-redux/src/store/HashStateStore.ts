import { singleton } from "@xul/core";
import { compressToBase64, decompressFromBase64 } from "lz-string";
import { LOGGER } from "../Logger";
import { IStateStore, stateStore, StateStore } from "./StateStore";

@singleton()
export class HashStateStore implements IStateStore {
  public prefix: string = "hash";

  constructor() {
    stateStore.register(this);
  }

  public async load(): Promise<any> {
    return JSON.parse(decompressFromBase64(window.location.hash.substr(1)) ?? "{}");
  }

  public async save(state: any): Promise<void> {
    location.hash = compressToBase64(JSON.stringify(state));
  }
}

export const enableHashStateStore = () => (beanOrClass: any, method?: string, descriptor?: any) => {
  LOGGER.d(`Enabled hash state store.`);
  return descriptor ?? beanOrClass;
};
