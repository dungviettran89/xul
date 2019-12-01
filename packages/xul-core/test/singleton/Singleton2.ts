import { autowired, postConstruct, singleton } from "../../src/Index";
import { logger } from "../../src/log/LoggerFactory";
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
    logger(`xul.core.test.${Singleton2.name}`).log(`singleton2 started successfully.`);
  }
}
