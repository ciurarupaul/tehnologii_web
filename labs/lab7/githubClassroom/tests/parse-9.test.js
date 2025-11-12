const assert = require("assert");
const { parse } = require("../app.js");

describe("parse-9", function () {
  it("throws InvalidMarkup on wrong closing tag", function () {
    assert.throws(() => parse("<a>content<a>"), { message: "InvalidMarkup" });
  });
});
