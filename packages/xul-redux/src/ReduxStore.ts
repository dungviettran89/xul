import { context, singleton, singletons } from "@xul/core";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export type Reducer = (s: any, a: any) => any;

@singleton(`xul.redux.reduxStore`)
export class ReduxStore {
  public reducers: Map<string, Reducer[]>;
  public store: any;

  constructor() {
    this.reducers = new Map();
    this.store = createStore(this.reduce.bind(this), {}, composeWithDevTools(applyMiddleware(thunk)));
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
