const assert = require("assert");
const { parse } = require("../app.js");

describe("parse-6", function () {
  it("preserves mixed text and element children order", function () {
    const node = parse("<p>Hello <b>x</b> !</p>");
    assert.strictEqual(node.tag, "p");
    assert.strictEqual(node.children[0], "Hello ");
    assert.strictEqual(node.children[1].tag, "b");
    assert.strictEqual(node.children[1].children[0], "x");
    assert.strictEqual(node.children[2], " !");
  });
});
