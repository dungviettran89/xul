import { LOG } from "../../src/log/Log";

export class AbstractSingleton {
  constructor() {
    LOG.i(this, `Instance created`);
  }
}
