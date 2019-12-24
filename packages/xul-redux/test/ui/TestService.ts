import { singleton, singletons } from "@xul/core";
import { action, reduce } from "../../src/Index";
import { LOGGER } from "../../src/Logger";

@singleton()
export class TestService {
  @action()
  public increase(value: number) {
    value = value ?? 0;
    LOGGER.i(`value:${value}`);
    return { value: value + 1 };
  }

  @reduce()
  public onIncrease(state: any, { value }: { value: number }) {
    const newState = { ...state, value };
    LOGGER.i(`state:`, state);
    return newState;
  }
}
export const testService: TestService = singletons.get(TestService);
