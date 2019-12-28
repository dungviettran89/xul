import { singleton, singletons } from "@xul/core";
import { litState } from "../../src/bindings/LitElementBindings";
import { LOGGER } from "../../src/Logger";
import { action } from "../../src/ReduxActions";
import { reduce } from "../../src/ReduxReducers";
import { state } from "../../src/ReduxState";

@singleton()
@litState("hash.scoped")
export class ScopedController {
  @state(`value`, 0)
  public value: number;

  constructor() {
    LOGGER.d(`ScopedController created`);
  }

  @action()
  public increase() {
    return { value: this.value + 1 };
  }
  @reduce()
  public onIncrease(s: any = {}, { value }: { value: number }) {
    LOGGER.d(`ScopedController.onIncrease`, s);
    return { ...s, value };
  }
}
export const scopedController: ScopedController = singletons.get(ScopedController);
