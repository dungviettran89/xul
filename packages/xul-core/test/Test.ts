import { context } from "../src/Context";
import "./singleton/Singleton1";
import "./singleton/Singleton2";

(async () => {
  await context.initialize();
  await new Promise(r => setTimeout(r, 15000));
  process.exit();
})();
