import { context, singleton, singletons } from "@xul/core";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { delay } from "./Utils";

export type Reducer = (s: any, a: any) => any;

const STATE_KEY = "xul.state";
const SAVE_DELAY = 5000;

@singleton(`xul.redux.reduxStore`)
export class ReduxStore {
  public reducers: Map<string, Reducer[]>;
  public store: any;
  public saveState: (immediate: boolean) => void = delay(() => this.doSaveState(), SAVE_DELAY);

  constructor() {
    this.reducers = new Map();
    const local: any = JSON.parse(localStorage.getItem(STATE_KEY) ?? `{}`);
    const session: any = JSON.parse(sessionStorage.getItem(STATE_KEY) ?? `{}`);
    this.store = createStore(this.reduce.bind(this), { local, session }, applyMiddleware(thunk));
    window.addEventListener("beforeunload", () => this.saveState(true));
    context.singleton(`xul.redux.store`, this.store);
  }

  public doSaveState() {
    const { local, session } = this.store.getState();
    if (local) {
      localStorage.setItem(STATE_KEY, JSON.stringify(local));
    }
    if (session) {
      sessionStorage.setItem(STATE_KEY, JSON.stringify(session));
    }
  }

  public reduce(state: any = {}, action: any) {
    const reducers = this.reducers.get(action && action.type);
    if (reducers === undefined || reducers.length === 0) {
      return state;
    }
    reducers.forEach(r => (state = r(state, action)));
    this.saveState(false);
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
