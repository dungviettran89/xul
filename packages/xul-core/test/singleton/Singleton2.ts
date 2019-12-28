import { autowired, postConstruct, singleton, singletons } from "../../src/Index";
import { LOG } from "../../src/log/Log";
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
    LOG.i(this, `singleton2 started successfully.`);
  }
}
export const singleton2 = singletons.get(Singleton2);
