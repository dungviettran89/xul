import { setLogLevel } from "../src/log/LogLevel";
setLogLevel("xul.core", "warn");
setLogLevel("xul.core.test", "info");

import { context } from "../src/Context";
import "./singleton/Singleton1";
import "./singleton/Singleton2";
(async () => {
  await context.initialize();
  await new Promise(r => setTimeout(r, 15000));
  process.exit();
})();
