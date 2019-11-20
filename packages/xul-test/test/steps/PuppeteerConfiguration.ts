import { IPuppeteerConfiguration } from "../../src/PuppeteerContext";
import { singleton } from "@xul/core";

@singleton()
export class PuppeteerConfiguration implements IPuppeteerConfiguration {
  width: number = 1024;
  height: number = 576;

}
