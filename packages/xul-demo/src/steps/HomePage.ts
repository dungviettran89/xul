import { singleton, singletons } from "@xul/core";
import { given, PageObjectModel, then} from "@xul/test";
import { expect } from "chai";
import { ElementHandle } from "puppeteer";


@singleton()
export class HomePage extends PageObjectModel {
  @given("Customer open home page")
  public async open() {
    return await this.page.goto("https://xul-demo-shop.cuatoi.us/index.php", { waitUntil: "networkidle2" });
  }

  @then("Popular products are displayed")
  public async popularProductsAreDisplayed() {
    const titles: ElementHandle[] = await this.page.$$("#content > section > div > article > div > div.product-description a");
    expect(titles !== null && titles.length > 0).eq(true, `Popular products must be displayed.`);
  }
}

export const homePage: HomePage = singletons.get(HomePage);
