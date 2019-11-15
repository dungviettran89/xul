import { Application } from "../src/Application";

const start = Date.now();
Application.run({
  onStart: () => {
    console.log(`Application started after ${Date.now() - start}ms`);
  }
});
