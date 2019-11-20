import { singleton } from "@xul/core";
import { then } from "../../src/Decorators";
import { PageObjectModel } from "../../src/PageObjectModel";
import { expect } from "chai";
@singleton()
export class CategoryPage extends PageObjectModel {
  @then("Product category {word} is displayed")
  public async categoryIsDisplayed(category: string) {
    expect(await this.page.title()).eq(category, `Must show the correct category`);
  }
}
