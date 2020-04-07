import { singleton } from "@xul/core";
import { expect } from "chai";
import { ElementHandle } from "puppeteer";
import { PageObjectModel, then,when } from "@xul/test";
import { sameString } from "./Utils";

@singleton()
export class ProductPage extends PageObjectModel {
  @then("Product page {string} is displayed")
  public async pageIsDisplayed(name: string): Promise<void> {
    if (name === "any" || name === undefined) {
      const description: ElementHandle = await this.page.$("#description");
      expect(description !== undefined).eq(true, `Product description must be shown.`);
      return;
    }
    expect(sameString(name, await this.page.title())).eq(true, `Product name should be in page title.`);
    const h1Title = await this.page.$("#main > div.row > div > h1[itemprop=name]");
    expect(sameString(await h1Title.evaluate((e: any) => e.innerText), name)).eq(true, `Product name should be displayed.`);
  }

  @when("Customer clicks on Add To Card")
  public async addToCart(): Promise<void> {
    const addToCard: ElementHandle = await this.page.$("#add-to-cart-or-refresh > div.product-add-to-cart > div > div.add > button");
    await addToCard.click({ delay: 50 });
    await this.page.waitFor("#myModalLabel");
  }

  @then("Product successfully added to shopping cart")
  public async successfullyAddedToCard(): Promise<void> {
    const myModalLabel = await this.page.$("#myModalLabel");
    const message = await myModalLabel.evaluate((n: any) => n.innerText);
    expect(message).contain(`Product successfully added to your shopping cart`, `Product must be successfully added to shopping cart`);
  }

  @when("Customer close cart modal")
  public async closeCartModal() {
    await this.page.evaluate(`document.querySelector('#blockcart-modal button.close').click()`);
  }
}
