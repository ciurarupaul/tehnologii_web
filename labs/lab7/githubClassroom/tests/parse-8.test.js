const assert = require("assert");
const { parse } = require("../app.js");

describe("parse-8", function () {
  it("throws InvalidMarkup on mismatched tags", function () {
    assert.throws(() => parse("<a><b></a>"), { message: "InvalidMarkup" });
  });
});
