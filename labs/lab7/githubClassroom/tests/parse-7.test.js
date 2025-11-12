const assert = require("assert");
const { parse } = require("../app.js");

describe("parse-7", function () {
  it("ignores leading and trailing whitespace around the whole input", function () {
    const node = parse("   <a>t</a>  ");
    assert.strictEqual(node.tag, "a");
    assert.deepStrictEqual(node.children, ["t"]);
  });
});
