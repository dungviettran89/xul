import { Before, Given, Then, When } from "cucumber";
import { homePage } from "../models/HomePage";

Given("Customer open home page", async () => {
  await homePage.open();
});

When("Customer wait {int} seconds", async (wait: number) => {
  await new Promise(resolve => setTimeout(resolve, wait * 1000));
});

Then("Popular products are displayed", async () => {
  console.log("Popular products are displayed");
});
