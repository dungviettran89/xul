import { autowired, postConstruct, singleton } from "../../src/Index";
import { AbstractSingleton } from "./AbstractSingleton";
import { Singleton1 } from "./Singleton1";

@singleton()
class Singleton2 extends AbstractSingleton {
  @autowired()
  singleton1: Singleton1;

  @postConstruct()
  public async start(): Promise<void> {
    if (!this.singleton1) throw `Autowired failed, field is null`;
    console.log(`singleton2 started successfully.`);
  }
}
