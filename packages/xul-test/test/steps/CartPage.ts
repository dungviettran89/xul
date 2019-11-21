import { PageObjectModel } from "../../src/PageObjectModel";
import { singleton } from "@xul/core";
import { then, when } from "../../src/Decorators";
import { expect } from "chai";
@singleton()
export class CartPage extends PageObjectModel {
  @then("Shopping cart should contains product {string}")
  public async cartShouldContainProduct(name: string) {
    let regex = name === "any" || name === undefined ? /.*/g : new RegExp(name, "i");
    let productsInCart = await this.queryByInnerText(`li.cart-item a.label`, regex);
    expect(productsInCart.length).gt(0, `Product ${name} should be in cart`);
  }

  @when("Customer clicks on Check out")
  public async customerClicksOnCheckout() {
    await this.page.evaluate(`document.querySelector('div.cart-summary div.checkout a').click()`);
    await this.page.waitForNavigation({ waitUntil: "networkidle2" });
  }
}
