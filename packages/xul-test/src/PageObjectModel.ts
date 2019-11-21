import { autowired } from "@xul/core";
import { Browser, ElementHandle, Page } from "puppeteer";
import "./PuppeteerContext";
export abstract class PageObjectModel {
  @autowired()
  public page: Page;
  @autowired()
  public browser: Browser;

  public async queryByInnerText(selector: string, regexp: RegExp | string): Promise<ElementHandle[]> {
    await this.page.waitFor(selector);
    const result: ElementHandle[] = [];
    for (const handle of await this.page.$$(selector)) {
      const innerText = await handle.evaluate((n: any) => n.innerText);
      if (innerText.match(regexp)) {
        result.push(handle);
      }
    }
    return result;
  }
}
