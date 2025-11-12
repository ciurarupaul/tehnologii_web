const assert = require("assert");
const { render } = require("../app.js");

describe("render-4", function () {
  it('renders string attributes as key="value"', function () {
    const node = { tag: "a", attrs: { href: "link" }, children: ["x"] };
    assert.strictEqual(render(node, {}), '<a href="link">x</a>');
  });
});
