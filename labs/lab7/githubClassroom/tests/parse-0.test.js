const assert = require("assert");
const { parse } = require("../app.js");

describe("parse-0", function () {
  it("parses a simple element with text", function () {
    const node = parse("<a>stuff</a>");
    assert.strictEqual(node.tag, "a");
    assert.deepStrictEqual(node.children, ["stuff"]);
  });
});
