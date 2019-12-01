import { ClassLoader } from "../src/ClassLoader";

const start = Date.now();
ClassLoader.run({
  onStart: async () => {
    console.log(`Application started after ${Date.now() - start}ms`);
    await new Promise(r => setTimeout(r, 15000));
    process.exit();
  }
});
