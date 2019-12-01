import { singleton } from "../../src/Index";
import { logger } from "../../src/log/LoggerFactory";
import { scheduled } from "../../src/SchedulingBeans";
import { AbstractSingleton } from "./AbstractSingleton";

@singleton()
export class Singleton1 extends AbstractSingleton {
  @scheduled({ timeout: 500, interval: 5000 })
  public tick(): void {
    logger(`xul.core.test.${Singleton1.name}`).log(`Tick ${new Date()}`);
  }
}
