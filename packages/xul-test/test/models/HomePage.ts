import { autowired, singleton, singletons } from "@xul/core";
import "../../src/PuppeteerContext";
import { Page } from "puppeteer";

@singleton()
export class HomePage {
  @autowired()
  page: Page;

  async open() {
    return await this.page.goto("http://107.172.188.129:31080/", { waitUntil: "networkidle2" });
  }
}

export const homePage: HomePage = singletons.get(HomePage);
