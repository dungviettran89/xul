import { singleton } from "../../src/Index";
import { scheduled } from "../../src/SchedulingBeans";
import { AbstractSingleton } from "./AbstractSingleton";

@singleton()
export class Singleton1 extends AbstractSingleton {
  @scheduled({ timeout: 500, interval: 5000 })
  public tick(): void {
    console.log(`Tick ${new Date()}`);
  }
}
