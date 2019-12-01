import { singleton } from "@xul/core";
import { scheduled } from "@xul/core";
import { AbstractSingleton } from "./AbstractSingleton";

@singleton()
export class Singleton1 extends AbstractSingleton {
  @scheduled({ timeout: 500, interval: 5000 })
  public tick(): void {
    console.log(`Tick ${new Date()}`);
  }
}
