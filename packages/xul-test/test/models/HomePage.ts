import { autowired, singleton, singletons } from "@xul/core";
import { PageObjectModel } from "../../src/PageObjectModel";

@singleton()
export class HomePage extends PageObjectModel {
  public async open() {
    return await this.page.goto("http://107.172.188.129:31080/", { waitUntil: "networkidle2" });
  }
}

export const homePage: HomePage = singletons.get(HomePage);
