const assert = require("assert");
const { render } = require("../app.js");

describe("render-1", function () {
  it("throws InvalidType when first parameter is not an object or array", function () {
    assert.throws(() => render("", {}), { message: "InvalidType" });
    assert.throws(() => render(null, {}), { message: "InvalidType" });
  });
});
