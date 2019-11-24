import { singleton, singletons } from "@xul/core";
import { expect } from "chai";
import { ElementHandle } from "puppeteer";
import { given, then, when } from "../../src/Decorators";
import { PageObjectModel } from "../../src/PageObjectModel";

@singleton()
export class HomePage extends PageObjectModel {
  @given("Customer open home page")
  public async open() {
    return await this.page.goto("http://107.172.188.129:31080/", { waitUntil: "networkidle2" });
  }

  @then("Popular products are displayed")
  public async popularProductsAreDisplayed() {
    const titles: ElementHandle[] = await this.page.$$("#content > section > div > article > div > div.product-description > h1 > a");
    expect(titles !== null && titles.length > 0).eq(true, `Popular products must be displayed.`);
  }
}

export const homePage: HomePage = singletons.get(HomePage);
