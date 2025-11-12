const assert = require("assert");
const { render } = require("../app.js");

describe("render-3", function () {
  it("renders a simple tag with text", function () {
    const node = { tag: "a", children: ["stuff"] };
    assert.strictEqual(render(node, {}), "<a>stuff</a>");
  });
});
