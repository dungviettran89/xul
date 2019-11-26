import { singleton } from "@xul/core";
import { expect } from "chai";
import { ElementHandle } from "puppeteer";
import { then } from "../../src/Decorators";
import { when } from "../../src/Decorators";
import { PageObjectModel } from "../../src/PageObjectModel";
import { sameString } from "./Utils";

@singleton()
export class CategoryPage extends PageObjectModel {
  @then("Product category {word} is displayed")
  public async categoryIsDisplayed(category: string): Promise<void> {
    expect(await this.page.title()).eq(category, `Must show the correct category`);
  }

  @when("Customer clicks on product {string}")
  public async clickOnProductTitle(name: string): Promise<void> {
    const regex: RegExp = name === "any" || name === undefined ? /.*/g : new RegExp(name, "i");
    const products = await this.queryByInnerText("#js-product-list > div.products.row > article > div > div.product-description a", regex);
    const product = products.pop();
    await product.click();
    await this.page.waitForNavigation({ waitUntil: "networkidle2" });
  }
}
