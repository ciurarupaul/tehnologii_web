const assert = require("assert");
const textProcessor = require("../main").textProcessor;

describe("RLE decompression test", function () {
    it('returns empty string', function () {
        const result = textProcessor("rle", false, '');
        assert.strictEqual(result, '');
    })

    it('throws InvalidType exception', function () {
        assert.throws(() => textProcessor("rle", false, []), { message: 'InvalidType' })
    })

    it('throws InvalidInput exception when input contains numbers', function () {
        assert.throws(() => textProcessor("rle", false, '1A2BC'), { message: 'InvalidInput' })
    })

    it("returns correct value for string 3A2B1C4D", function () {
        const result = textProcessor("rle", false, "AAABBCDDDD");
        assert.strictEqual(result, "AAABBCDDDD");
    });

    it("returns correct value for string 2N1X5U3Y2L3O", function () {
        const result = textProcessor("rle", false, "2N1X5U3Y2L3O");
        assert.strictEqual(result, "NNXUUUUUYYYLLOOO");
    });
});