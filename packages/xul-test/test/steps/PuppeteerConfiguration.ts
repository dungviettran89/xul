import { singleton } from "@xul/core";
import { setDefaultTimeout } from "cucumber";
import { IPuppeteerConfiguration } from "../../src/PuppeteerContext";
@singleton()
export class PuppeteerConfiguration implements IPuppeteerConfiguration {
  public width: number = 1024;
  public height: number = 576;
}
setDefaultTimeout(20000);
