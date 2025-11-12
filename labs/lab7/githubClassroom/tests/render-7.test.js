const assert = require("assert");
const { render } = require("../app.js");

describe("render-7", function () {
  it("performs token substitution in string attributes", function () {
    const node = {
      tag: "img",
      attrs: { alt: "By ${author}", src: "/x" },
      children: [],
    };
    assert.strictEqual(
      render(node, { author: "Grace" }),
      '<img alt="By Grace" src="/x"></img>',
    );
  });
});
