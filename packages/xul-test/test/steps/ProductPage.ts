import { singleton } from "@xul/core";
import { PageObjectModel } from "../../src/PageObjectModel";
import { then } from "../../src/Index";
import { ElementHandle } from "puppeteer";
import { expect } from "chai";
import { sameString } from "./Utils";

@singleton()
export class ProductPage extends PageObjectModel {
  @then("Product page {string} is displayed")
  public async pageIsDisplayed(name: string): Promise<void> {
    if (name === "any" || name === undefined) {
      let description: ElementHandle = await this.page.$("#description");
      expect(description !== undefined).eq(true, `Product description must be shown.`);
      return;
    }
    expect(sameString(name, await this.page.title())).eq(true, `Product name should be in page title.`);
    let h1Title = await this.page.$("#main > div.row > div > h1[itemprop=name]");
    expect(sameString(await h1Title.evaluate((e: any) => e.innerText), name)).eq(true, `Product name should be displayed.`);
  }
}
