const assert = require("assert");
const { render } = require("../app.js");

describe("render-8", function () {
  it("renders nested children", function () {
    const node = {
      tag: "a",
      children: [
        { tag: "b", children: [{ tag: "c", children: ["content"] }] },
        { tag: "d", children: ["first"] },
      ],
    };
    assert.strictEqual(
      render(node, {}),
      "<a><b><c>content</c></b><d>first</d></a>",
    );
  });
});
