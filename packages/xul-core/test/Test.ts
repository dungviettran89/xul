import { context } from "../src/Context";
import { LOG, LogLevel } from "../src/log/Log";
import "./singleton/Singleton1";
import "./singleton/Singleton2";
declare var process: any;
(async () => {
  await context.initialize();
  await new Promise(r => setTimeout(r, 8000));
  const testLog = (level: LogLevel) => {
    LOG.level = level;
    LOG.t(this, `${level}:t`);
    LOG.trace(this, `${level}:trace`);
    LOG.d(this, `${level}:d`);
    LOG.debug(this, `${level}:debug`);
    LOG.i(this, `${level}:i`);
    LOG.info(this, `${level}:info`);
    LOG.w(this, `${level}:w`);
    LOG.warn(this, `${level}:warn`);
    LOG.e(this, `${level}:e`);
    LOG.error(this, `${level}:error`);
  };
  testLog("trace");
  testLog("debug");
  testLog("info");
  testLog("warn");
  testLog("error");
  LOG.i(this, `Test completed.`);
  process.exit();
})();
