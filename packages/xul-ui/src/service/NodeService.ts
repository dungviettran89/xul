import { singleton, singletons } from "@xul/core";
import { action, reduce } from "@xul/redux";

@singleton()
export class NodeService {
  @action()
  public click(clicked: number) {
    return { clicked: (clicked ?? 0) + 1 };
  }

  @reduce()
  public onClick(state: any, { clicked }: { clicked: number }) {
    const { hash } = state;
    return { ...state, hash: { ...hash, clicked } };
  }
}

export const nodeService: NodeService = singletons.get(NodeService);
