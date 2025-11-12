const assert = require("assert");
const { parse } = require("../app.js");
const { get } = require("./helper.js");

describe("parse-2", function () {
  it("parses boolean attributes by presence", function () {
    const node = parse("<input disabled></input>");
    assert.strictEqual(node.tag, "input");
    assert.strictEqual(get(node, "attrs.disabled"), true);
  });
});
