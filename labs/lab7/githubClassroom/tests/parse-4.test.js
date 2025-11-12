const assert = require("assert");
const { parse } = require("../app.js");

describe("parse-4", function () {
  it("parses nested children", function () {
    const node = parse("<a><b><c>content</c></b><d>first</d></a>");
    assert.strictEqual(node.tag, "a");
    assert.strictEqual(node.children[0].tag, "b");
    assert.strictEqual(node.children[0].children[0].tag, "c");
    assert.deepStrictEqual(node.children[0].children[0].children, ["content"]);
    assert.strictEqual(node.children[1].tag, "d");
    assert.deepStrictEqual(node.children[1].children, ["first"]);
  });
});
