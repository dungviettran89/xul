import { singleton } from "@xul/core";
import { IPuppeteerConfiguration } from "../../src/PuppeteerContext";
import {setDefaultTimeout} from "cucumber";
@singleton()
export class PuppeteerConfiguration implements IPuppeteerConfiguration {
  public width: number = 1024;
  public height: number = 576;
}
setDefaultTimeout(20000);
