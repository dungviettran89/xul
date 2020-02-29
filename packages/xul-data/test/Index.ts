import { context, scheduled } from "@xul/core";
import { xulApplication } from "@xul/express";
import { Sequelize } from "sequelize";
import { LOGGER } from "../src/Logger";

@xulApplication()
export class TestApplication {
  constructor() {
    context.singleton("xul.data.sequelize", new Sequelize("sqlite::memory:"));
  }

  @scheduled({ timeout: 2000 })
  public async runTest() {
    try {
      process.exit(0);
    } catch (e) {
      LOGGER.e(`Cannot invoke API.`, e);
      process.exit(1);
    }
  }
}
