const assert = require("assert");
const { parse } = require("../app.js");
const { get } = require("./helper.js");

describe("parse-3", function () {
  it("parses mixed string and boolean attributes", function () {
    const node = parse('<button disabled aria-label="Go">Click</button>');
    assert.strictEqual(node.tag, "button");
    assert.strictEqual(get(node, "attrs.disabled"), true);
    assert.strictEqual(get(node, "attrs.aria-label"), "Go");
    assert.deepStrictEqual(node.children, ["Click"]);
  });
});
