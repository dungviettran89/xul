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

  @when("Customer wait {int} seconds")
  public async customerWait(seconds: number) {
    return await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  @when("Customer clicks on category {word}")
  public async customerClicksOn(category: string) {
    let categories: Array<ElementHandle> = await this.page.$$("#top-menu li a");
    for (let c of categories) {
      let title: string = await c.evaluate((n: any) => n.innerText);
      if (title.toLowerCase() === category.toLowerCase()) {
        await c.click();
        await this.page.waitForNavigation({ waitUntil: "networkidle2" });
        return;
      }
    }
    throw `Cannot find category ${category}`;
  }

  @then("Popular products are displayed")
  public async popularProductsAreDisplayed() {
    let titles: Array<ElementHandle> = await this.page.$$("#content > section > div > article > div > div.product-description > h1 > a");
    expect(titles !== null && titles.length > 0).eq(true, `Popular products must be displayed.`);
  }
}

export const homePage: HomePage = singletons.get(HomePage);
