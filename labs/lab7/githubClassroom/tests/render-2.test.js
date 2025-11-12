const assert = require("assert");
const { render } = require("../app.js");

describe("render-2", function () {
  it("throws InvalidType when values is not an object", function () {
    const node = { tag: "a", children: ["x"] };
    assert.throws(() => render(node, null), { message: "InvalidType" });
  });
});
