import { Given, Then, When } from "cucumber";

let variable: number = 0;
Given("a variable set to {int}", (number: number) => {
  variable = number;
});

When("I increment the variable by {int}", (number: number) => {
  variable += number;
});

Then("the variable should contain {int}", (number: number) => {
  if (variable !== number) {
    throw new Error(`Failed test cases`);
  }
});
