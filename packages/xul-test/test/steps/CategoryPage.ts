import { singleton } from "@xul/core";
import { then } from "../../src/Decorators";
import { PageObjectModel } from "../../src/PageObjectModel";
import { expect } from "chai";
import { ElementHandle } from "puppeteer";
import { when } from "../../src/Decorators";
import { sameString } from "./Utils";

@singleton()
export class CategoryPage extends PageObjectModel {
  @then("Product category {word} is displayed")
  public async categoryIsDisplayed(category: string): Promise<void> {
    expect(await this.page.title()).eq(category, `Must show the correct category`);
  }

  @when("Customer clicks on product {string}")
  public async clickOnProductTitle(name: string): Promise<void> {
    let regex: RegExp = name === "any" || name === undefined ? /.*/g : new RegExp(name, "i");
    let products = await this.queryByInnerText("#js-product-list > div.products.row > article > div > div.product-description > h1 > a", regex);
    let product = products.pop();
    await product.click();
    await this.page.waitForNavigation({ waitUntil: "networkidle2" });
  }
}
