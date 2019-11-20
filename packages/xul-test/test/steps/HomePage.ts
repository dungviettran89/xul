import { singleton, singletons } from "@xul/core";
import { PageObjectModel } from "../../src/PageObjectModel";
import { given, then, when } from "../../src/Decorators";
import { ElementHandle } from "puppeteer";
import { expect } from "chai";

@singleton()
export class HomePage extends PageObjectModel {
  @given("Customer open home page")
  public async open() {
    return await this.page.goto("http://107.172.188.129:31080/", { waitUntil: "networkidle2" });
  }

  @then("Popular products are displayed")
  public async popularProductsAreDisplayed() {
    let titles: Array<ElementHandle> = await this.page.$$("#content > section > div > article > div > div.product-description > h1 > a");
    expect(titles !== null && titles.length > 0).eq(true, `Popular products must be displayed.`);
  }
}

export const homePage: HomePage = singletons.get(HomePage);
