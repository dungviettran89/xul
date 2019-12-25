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
    return newState;
  }

  @action()
  public increaseSession(value: number) {
    return { value: (value ?? 0) + 1 };
  }

  @reduce()
  public onIncreaseSession(state: any, { value }: { value: number }) {
    const { session } = state;
    const newState = { ...state, session: { ...session, value } };
    return newState;
  }

  @action()
  public increaseHash(value: number) {
    return { value: (value ?? 0) + 1 };
  }

  @reduce()
  public onIncreaseHash(state: any, { value }: { value: number }) {
    const { hash } = state;
    const newState = { ...state, hash: { ...hash, value } };
    return newState;
  }
}
export const testService: TestService = singletons.get(TestService);
