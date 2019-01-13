import test from "ava";

import {
  defaultConfig,
  objHasKeys,
  validateConfig,
  validateObjectKeyType
} from "../src/utils";

for (const [name, obj, key, type, expected] of [
  ["string === string", { foo: "bar" }, "foo", "string", true],
  ["string !== number", { foo: "bar" }, "foo", "number", false],
  ["number === number", { foo: 2 }, "foo", "number", true],
  ["bad key fails", { foo: "bar" }, "bar", "string", false],
  ["object === object", { foo: { obj: 1 } }, "foo", "object", true]
]) {
  test(name, t => {
    const r = validateObjectKeyType(obj, key, type);
    t.is(r, expected);
  });
}

for (const [name, obj, keys, exptected] of [
  ["has expected keys", { foo: 1, bar: 2 }, ["foo", "bar"], true],
  ["fails key check with length mismatch", { foo: 1, bar: 2 }, ["foo"], false],
  ["fails with bad key", { foo: 1, bar: 2 }, ["foo"], false]
]) {
  test(name, t => t.is(objHasKeys(obj, keys), exptected));
}

for (const [name, config, expectedValid] of [
  ["default config should pass", defaultConfig, true],
  [
    "default config with archive key type !== string fails",
    { archives: [{ name: 1, path: "/" }] },
    false
  ],
  ["default config with empty archives array passes", { archives: [] }, true],
  ["extra top level key fails", { ...defaultConfig, foo: 1 }, false]
]) {
  test(name, t => t.is(validateConfig(config), expectedValid));
}