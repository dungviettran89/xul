import { delay, get, postConstruct, singleton, singletons } from "@xul/core";
import { LOGGER } from "../Logger";
import { action } from "../ReduxActions";
import { reduce } from "../ReduxReducers";
import { store } from "../ReduxStore";
import { assign } from "../Utils";

export interface IStateStore {
  prefix: string;

  save(state: any): Promise<void>;

  load(): Promise<any>;
}
const stores: Map<string, IStateStore> = new Map();
@singleton(`xul.redux.stateStore`)
export class StateStore {
  public saveState: (immediate: boolean) => void = delay(() => this.doSaveState(), 5000);

  @postConstruct()
  public async start() {
    store.subscribe(() => this.saveState(false));
    window.addEventListener("beforeunload", () => this.saveState(true));
    this.loadState();
  }

  public register(registeringStore: IStateStore) {
    if (stores.has(registeringStore.prefix)) {
      throw new Error(`Duplicate saved prefix ${registeringStore.prefix}`);
    }
    stores.set(registeringStore.prefix, registeringStore);
    LOGGER.d(`Registered prefix ${registeringStore.prefix} to ${registeringStore.constructor.name}`);
  }

  @action()
  public async loadState() {
    let stateToLoad: any = {};
    for (const prefix of stores.keys()) {
      stateToLoad = assign(stateToLoad, prefix, await stores.get(prefix).load());
    }
    LOGGER.d(`Loaded state:`, stateToLoad);
    return { state: stateToLoad };
  }

  @reduce()
  public onLoadState(state: any, { state: loadedState }: { state: any }) {
    return { ...state, ...loadedState };
  }

  public async doSaveState() {
    const state = store.getState();
    for (const prefix of stores.keys()) {
      await stores.get(prefix).save(get(state, prefix));
    }
    LOGGER.d(`Saved state:`, state);
  }
}

export const stateStore: StateStore = singletons.get(StateStore);
