import { LOGGER } from "../../src/Logger";

export class AbstractSingleton {
  constructor() {
    LOGGER.d(`${this.constructor.name} created`);
  }
}
