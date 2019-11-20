import {PageObjectModel} from "../../src/PageObjectModel";
import {when} from "../../src/Decorators";
import {ElementHandle} from "puppeteer";
import {singleton} from "@xul/core";

@singleton()
export abstract class PrestaPage extends PageObjectModel {

    @when("Customer clicks on category {word}")
    public async customerClicksOn(category: string) {
        let categories: Array<ElementHandle> = await this.page.$$("#top-menu > li > a");
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

}