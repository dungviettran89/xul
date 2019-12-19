import { autowired, context, singleton, singletons } from "@xul/core";
import { After, Before } from "cucumber";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-core";
export interface IPuppeteerConfiguration {
  width?: number;
  height?: number;
  args?: string[];
  executablePath?: string;
}
@singleton()
export class PuppeteerContext {
  public browser: Browser;
  public page: Page;
  @autowired({ required: false })
  public puppeteerConfiguration: IPuppeteerConfiguration;

  public async before() {
    const config: IPuppeteerConfiguration = this.puppeteerConfiguration || { width: 1366, height: 768 };
    const width: number = config.width ?? 1366;
    const height: number = config.height ?? 768;
    const args: string[] = config.args ?? [];
    const executablePath: string = config.executablePath ?? `/usr/bin/chromium-browser`;
    const headless = (process.env.XUL_HEADLESS ?? `true`) === `true`;
    this.browser = await puppeteer.launch({
      args: [...args, `--window-size=${width},${height}`],
      executablePath,
      headless
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
