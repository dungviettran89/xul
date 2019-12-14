import { singleton, singletons } from "@xul/core";
import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";

@singleton()
export class ReduxStore {
  public store: Store = createStore(this.reduce.bind(this), applyMiddleware(thunk));

  public reduce(state: any, action: any) {
    return state;
  }
}

export const reduxStore: ReduxStore = singletons.get(ReduxStore);
export const store: Store = reduxStore.store;
