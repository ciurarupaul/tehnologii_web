const assert = require("assert");
const { render } = require("../app.js");

describe("render-6", function () {
  it("performs token substitution in text nodes", function () {
    const node = { tag: "p", children: ["Hello ${name}"] };
    assert.strictEqual(render(node, { name: "Ada" }), "<p>Hello Ada</p>");
  });
});
