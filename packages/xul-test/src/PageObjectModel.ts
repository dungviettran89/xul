import { autowired } from "@xul/core";
import { Browser, Page } from "puppeteer";
import "./PuppeteerContext";
export abstract class PageObjectModel {
  @autowired()
  public page: Page;
  @autowired()
  public browser: Browser;
}
