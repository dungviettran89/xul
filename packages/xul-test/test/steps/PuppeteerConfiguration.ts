import { singleton } from "@xul/core";
import { IPuppeteerConfiguration } from "../../src/PuppeteerContext";

@singleton()
export class PuppeteerConfiguration implements IPuppeteerConfiguration {
  public width: number = 1024;
  public height: number = 576;
}
