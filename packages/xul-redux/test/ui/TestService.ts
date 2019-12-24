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
    const { local } = state;
    const newState = { ...state, local: { ...local, value } };
    LOGGER.i(`state:`, state);
    return newState;
  }

  @action()
  public increaseSession(value: number) {
    return this.increase(value);
  }

  @reduce()
  public onIncreaseSession(state: any, { value }: { value: number }) {
    const { session } = state;
    const newState = { ...state, session: { ...session, value } };
    LOGGER.i(`state:`, state);
    return newState;
  }
}
export const testService: TestService = singletons.get(TestService);
