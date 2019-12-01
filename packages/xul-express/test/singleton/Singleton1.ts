import { singleton } from "@xul/core";
import { scheduled } from "@xul/core";
import { requestMapping } from "../../src/RequestMappings";
import { AbstractSingleton } from "./AbstractSingleton";

@singleton()
@requestMapping("api/s1")
export class Singleton1 extends AbstractSingleton {
  @requestMapping()
  public test(): string {
    return "test";
  }

  @scheduled({ timeout: 500, interval: 5000 })
  public tick(): void {
    console.log(`Tick ${new Date()}`);
  }
}
