import { singleton, singletons } from "@xul/core";
import { PageObjectModel } from "../../src/PageObjectModel";
import { given, then, when } from "../../src/Decorators";

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

  @then("Popular products are displayed")
  public async popularProductsAreDisplayed() {
    console.log("Popular products are displayed");
  }
}

export const homePage: HomePage = singletons.get(HomePage);
