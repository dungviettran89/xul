import { getLogger } from "../../src/log/LoggerFactory";

export class AbstractSingleton {
  constructor() {
    getLogger(`xul.core.test.${this.constructor.name}`).log(`Instance created`);
  }
}
