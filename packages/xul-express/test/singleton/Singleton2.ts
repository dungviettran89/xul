import { autowired, postConstruct, singleton } from "@xul/core";
import { LOGGER } from "../../src/Logger";
import { AbstractSingleton } from "./AbstractSingleton";
import { Singleton1 } from "./Singleton1";

@singleton()
class Singleton2 extends AbstractSingleton {
  @autowired()
  public singleton1: Singleton1;

  @postConstruct()
  public async start(): Promise<void> {
    if (!this.singleton1) {
      throw new Error(`Autowired failed, field is null`);
    }
    LOGGER.d(`singleton2 started successfully.`);
  }
}
