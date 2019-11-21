import { PageObjectModel } from "../../src/PageObjectModel";
import { when } from "../../src/Decorators";
import { ElementHandle } from "puppeteer";
import { singleton } from "@xul/core";

@singleton()
export class PrestaPage extends PageObjectModel {
  @when("Customer clicks on category {word}")
  public async customerClicksOn(category: string) {
    let categories = await this.queryByInnerText("#top-menu > li > a", new RegExp(category, "i"));
    await categories.pop().click();
    await this.page.waitForNavigation({ waitUntil: "networkidle2" });
  }

  @when("Customer clicks on Cart")
  public async customerClicksOnCart() {
    await this.page.evaluate(`document.querySelector('#_desktop_cart a').click()`);
    await this.page.waitForNavigation({ waitUntil: "networkidle2" });
  }
}
