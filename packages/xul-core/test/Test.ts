import { ClassLoader } from "../src/ClassLoader";

const start = Date.now();
ClassLoader.run({
  onStart: () => {
    console.log(`Application started after ${Date.now() - start}ms`);
  }
});
