import { LOGGER } from "../src/Logger";
LOGGER.level = "debug";
import { scheduled } from "@xul/core";
import { xulApplication } from "../src/XulApplication";
@xulApplication()
export class TestApplication {
  @scheduled({ timeout: 8000, interval: 8000 })
  public async stop() {
    LOGGER.d(`Stopping test`);
    process.exit();
  }
}
