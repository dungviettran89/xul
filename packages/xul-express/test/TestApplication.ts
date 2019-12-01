import { scheduled } from "@xul/core";
import { xulApplication } from "../src/XulApplication";

@xulApplication()
export class TestApplication {
  @scheduled({ timeout: 8000, interval: 8000 })
  public async stop() {
    process.exit();
  }
}
