const assert = require("assert");
const { parse } = require("../app.js");
const { get } = require("./helper.js");

describe("parse-1", function () {
  it("parses string attributes", function () {
    const node = parse('<a href="link">x</a>');
    assert.strictEqual(node.tag, "a");
    assert.strictEqual(get(node, "attrs.href"), "link");
    assert.deepStrictEqual(node.children, ["x"]);
  });
});
