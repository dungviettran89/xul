import { context, singleton, singletons } from "@xul/core";
import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";

export type Reducer = (s: any, a: any) => any;

@singleton(`xul.redux.reduxStore`)
export class ReduxStore {
  public store: any = createStore(this.reduce.bind(this), applyMiddleware(thunk));
  public reducers: Map<string, Reducer[]> = new Map();

  constructor() {
    context.singleton(`xul.redux.store`, this.store);
  }

  public reduce(state: any = {}, action: any) {
    const reducers = this.reducers.get(action && action.type);
    if (reducers === undefined || reducers.length === 0) {
      return state;
    }
    reducers.forEach(r => (state = r(state, action)));
    return state;
  }

  public addReducer(type: string, reducer: Reducer): void {
    if (!this.reducers.has(type)) {
      this.reducers.set(type, []);
    }
    this.reducers.get(type).push(reducer);
  }
}

export const reduxStore: ReduxStore = singletons.get(ReduxStore);
export const store: any = reduxStore.store;
