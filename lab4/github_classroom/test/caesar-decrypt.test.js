const assert = require("assert");
const textProcessor = require("../main").textProcessor;

describe("Caesar cipher decrypt test", function () {
    it('returns empty string', function () {
        const result = textProcessor("caesar", false, '', { shift: 10 });
        assert.strictEqual(result, '');
    })

    it('throws InvalidType exception', function () {
        assert.throws(() => textProcessor("caesar", false, [], { shift: 10 }), { message: 'InvalidType' })
    })

    it('throws InvalidInput exception when configuration object is incorrect', function () {
        assert.throws(() => textProcessor("caesar", false, "hello world", { key: 10 }), { message: 'InvalidInput' })
    })

    it('throws InvalidInput exception when input contains symbols', function () {
        assert.throws(() => textProcessor("caesar", false, 'ABCDEFG%!@', { shift: 10 }), { message: 'InvalidInput' })
    })

    it('throws InvalidInput exception when input contains numbers', function () {
        assert.throws(() => textProcessor("caesar", true, 'ABCD123', { shift: 10 }), { message: 'InvalidInput' })
    })

    it("returns correct value for string 'rovvy gybvn'", function () {
        const result = textProcessor("caesar", false, "rovvy gybvn", { shift: 10 });
        assert.strictEqual(result, "hello world");
    });

    it("returns correct value for string 'Omt rdoc v gjibzm OZNO nomdib'", function () {
        const result = textProcessor("caesar", false, "Omt rdoc v gjibzm OZNO nomdib", { shift: 21 });
        assert.strictEqual(result, "Try with a longer TEST string");
    });
});