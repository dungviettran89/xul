import { context, singleton, singletons } from "@xul/core";
import { After, Before } from "cucumber";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-core";

@singleton()
export class PuppeteerContext {
  public browser: Browser;
  public page: Page;

  public async before() {
    this.browser = await puppeteer.launch({
      args: ["--window-size=1366,768"],
      executablePath: "/usr/bin/chromium-browser",
      headless: false
    });
    context.set("browser", this.browser);
    this.page = await this.browser.newPage();
    this.page.setViewport({ width: 1366, height: 768 });
    context.set("page", this.page);
  }

  public async after() {
    await this.browser.close();
  }
}

export const puppeteerContext: PuppeteerContext = singletons.get(PuppeteerContext);

Before(async () => {
  return await puppeteerContext.before();
});

After(async () => {
  return await puppeteerContext.after();
});
