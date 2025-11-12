const assert = require("assert");
const { render } = require("../app.js");

describe("render-9", function () {
  it("renders multiple root nodes when input is an array", function () {
    const input = [
      { tag: "a", children: ["one"] },
      { tag: "b", attrs: { hidden: true }, children: [] },
    ];
    assert.strictEqual(render(input, {}), "<a>one</a><b hidden></b>");
  });
});
