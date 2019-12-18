import { autowired, singleton } from "@xul/core";
import { ReduxStore } from "@xul/redux";

@singleton()
export class NodeService {
  @autowired("xul.redux.reduxStore")
  private reduxStore: ReduxStore;
}
