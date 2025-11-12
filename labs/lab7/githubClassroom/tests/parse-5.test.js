const assert = require("assert");
const { parse } = require("../app.js");
const { get } = require("./helper.js");

describe("parse-5", function () {
  it("returns an array when there are multiple roots", function () {
    const nodes = parse("<a>one</a><b hidden></b>");
    assert.ok(Array.isArray(nodes));
    assert.strictEqual(nodes.length, 2);
    assert.strictEqual(nodes[0].tag, "a");
    assert.strictEqual(nodes[1].tag, "b");
    assert.strictEqual(get(nodes[1], "attrs.hidden"), true);
  });
});
