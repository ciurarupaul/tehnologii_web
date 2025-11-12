const assert = require("assert");
const { render } = require("../app.js");

describe("render-0", function () {
  it("returns empty string for empty object", function () {
    assert.strictEqual(render({}, {}), "");
  });
});
