import { singleton } from "@xul/core";
import { ElementHandle } from "puppeteer";
import { when } from "../../src/Decorators";
import { PageObjectModel } from "../../src/PageObjectModel";

@singleton()
export class PrestaPage extends PageObjectModel {
  @when("Customer clicks on category {word}")
  public async customerClicksOn(category: string) {
    const categories = await this.queryByInnerText("#top-menu > li > a", new RegExp(category, "i"));
    await categories.pop().click();
    await this.page.waitForNavigation({ waitUntil: "networkidle2" });
  }

  @when("Customer clicks on Cart")
  public async customerClicksOnCart() {
    await this.page.evaluate(`document.querySelector('#_desktop_cart a').click()`);
    await this.page.waitForNavigation({ waitUntil: "networkidle2" });
  }
}
