import { singleton } from "@xul/core";
import { then } from "../../src/Decorators";
import { PageObjectModel } from "../../src/PageObjectModel";
import { expect } from "chai";
import { ElementHandle } from "puppeteer";
import { when } from "../../lib/src/Decorators";
import { sameString } from "./Utils";

@singleton()
export class CategoryPage extends PageObjectModel {
  @then("Product category {word} is displayed")
  public async categoryIsDisplayed(category: string): Promise<void> {
    expect(await this.page.title()).eq(category, `Must show the correct category`);
  }

  @when("Customer clicks on product {string}")
  public async clickOnProductTitle(name: string): Promise<void> {
    let products: Array<ElementHandle> = await this.page.$$("#js-product-list > div.products.row > article > div > div.product-description > h1 > a");
    if (name === "any" || name === undefined) {
      await products[0].click();
      await this.page.waitForNavigation({ waitUntil: "networkidle2" });
      return;
    }
    for (let p of products) {
      let title: string = await p.evaluate((n: any) => n.innerText);
      if (sameString(name, title)) {
        await p.click();
        await this.page.waitForNavigation({ waitUntil: "networkidle2" });
        return;
      }
    }
    throw `No product named ${name}`;
  }
}
