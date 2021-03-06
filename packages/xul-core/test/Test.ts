import { assert } from "chai";
import { context } from "../src/Context";
import { LOG, LogLevel } from "../src/log/Log";
import { LOGGER } from "../src/Logger";
import { assign, get, lowerFirst } from "../src/Utils";
import "./singleton/Singleton1";
import "./singleton/Singleton2";
LOGGER.level = "debug";
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

assert.equal(lowerFirst("testBean"), "testBean");
assert.equal(lowerFirst("TestBean"), "testBean");
assert.equal(lowerFirst("A"), "a");
assert.equal(lowerFirst("a"), "a");
assert.equal(lowerFirst(""), "");
assert.equal(lowerFirst(null), null);
assert.equal(get({ a: { b: { c: 1 } } }, "a.b.c"), 1);
assert.equal(get({ a: { b: { c: 1 } } }, "a.b.d"), null);
assert.equal(get(null, "a.b.d"), null);
assert.equal(get(null, "a.b.d", 1), 1);
assert.equal(get({}, "a"), null);
assert.equal(get(1, ""), 1);
assert.equal(get(1, null), 1);
assert.deepEqual(assign({ a: { b: { c: 1 } } }, "a.b.c", 2), { a: { b: { c: 2 } } });
assert.deepEqual(assign(null, "a.b.c", 1), { a: { b: { c: 1 } } });
assert.deepEqual(assign({}, "a.b.c", 1), { a: { b: { c: 1 } } });
assert.deepEqual(assign({ a: {} }, "a.b.c", 1), { a: { b: { c: 1 } } });
