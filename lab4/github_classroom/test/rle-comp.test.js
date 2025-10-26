const assert = require("assert");
const textProcessor = require("../main").textProcessor;

describe("RLE compression test", function () {
  it('returns empty string', function () {
    const result = textProcessor("rle", true, '');
    assert.strictEqual(result, '');
  })

  it('throws InvalidType exception', function () {
    assert.throws(() => textProcessor("rle", true, []), { message: 'InvalidType' })
  })

  it('throws InvalidInput exception when input contains numbers', function () {
    assert.throws(() => textProcessor("rle", true, 'ADFEG123EWQ'), { message: 'InvalidInput' })
  })

  it("returns correct value for string AAABBCDDDD", function () {
    const result = textProcessor("rle", true, "AAABBCDDDD");
    assert.strictEqual(result, "3A2B1C4D");
  });

  it("returns correct value for string NNXUUUUUYYYLLOOO", function () {
    const result = textProcessor("rle", true, "NNXUUUUUYYYLLOOO");
    assert.strictEqual(result, "2N1X5U3Y2L3O");
  });
});