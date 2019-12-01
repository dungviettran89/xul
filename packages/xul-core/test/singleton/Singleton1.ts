import { singleton } from "../../src/Index";
import { LOG } from "../../src/log/Log";
import { scheduled } from "../../src/SchedulingBeans";
import { AbstractSingleton } from "./AbstractSingleton";

@singleton()
export class Singleton1 extends AbstractSingleton {
  @scheduled({ timeout: 500, interval: 5000 })
  public tick(): void {
    LOG.i(this, `Tick ${new Date()}`);
  }
}
