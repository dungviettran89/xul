import { autowired, context, singleton, singletons } from "@xul/core";
import { After, Before } from "cucumber";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-core";
export interface IPuppeteerConfiguration {
  width?: number;
  height?: number;
}
@singleton()
export class PuppeteerContext {
  public browser: Browser;
  public page: Page;
  @autowired()
  puppeteerConfiguration: IPuppeteerConfiguration;

  public async before() {
    let config: IPuppeteerConfiguration = this.puppeteerConfiguration || { width: 1366, height: 768 };
    let width: number = config.width || 1366;
    let height: number = config.height || 768;
    this.browser = await puppeteer.launch({
      args: [`--window-size=${width},${height}`],
      executablePath: "/usr/bin/chromium-browser",
      headless: false
    });
    context.set("browser", this.browser);
    this.page = await this.browser.newPage();
    this.page.setViewport({ width, height });
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
