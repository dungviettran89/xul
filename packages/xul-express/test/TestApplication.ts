import { LOGGER } from "../src/Logger";
LOGGER.level = "debug";
import { scheduled } from "@xul/core";
import fetch from "node-fetch";
import { xulApplication } from "../src/XulApplication";

@xulApplication()
export class TestApplication {
  @scheduled({ timeout: 2000 })
  public async runTest() {
    try {
      LOGGER.d(`response=`, await fetch(`http://localhost:8080/api/s1/test`).then(r => r.json()));
      LOGGER.d(`response=`, await fetch(`http://localhost:8080/api/s2/get`).then(r => r.json()));
      LOGGER.d(`response=`, await fetch(`http://localhost:8080/api/s2/post`, { method: "post" }).then(r => r.json()));
      LOGGER.d(`response=`, await fetch(`http://localhost:8080/api/s2/put`, { method: "put" }).then(r => r.json()));
      process.exit(0);
    } catch (e) {
      LOGGER.e(`Cannot invoke API.`, e);
      process.exit(1);
    }
  }
}
