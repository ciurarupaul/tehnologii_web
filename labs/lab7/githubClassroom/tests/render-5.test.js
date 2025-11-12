const assert = require("assert");
const { render } = require("../app.js");

describe("render-5", function () {
  it("renders boolean attributes by presence and omits false", function () {
    const node = {
      tag: "button",
      attrs: { disabled: true, autofocus: false },
      children: ["Click"],
    };
    assert.strictEqual(render(node, {}), "<button disabled>Click</button>");
  });
});
