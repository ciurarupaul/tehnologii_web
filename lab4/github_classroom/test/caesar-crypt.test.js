const assert = require("assert");
const textProcessor = require("../main").textProcessor;

describe("Caesar cipher encrypt test", function () {
    it('returns empty string', function () {
        const result = textProcessor("caesar", true, '', { shift: 10 });
        assert.strictEqual(result, '');
    })

    it('throws InvalidType exception', function () {
        assert.throws(() => textProcessor("caesar", true, [], { shift: 10 }), { message: 'InvalidType' })
    })

    it('throws InvalidInput exception when configuration object is incorrect', function () {
        assert.throws(() => textProcessor("caesar", true, "hello world", { key: 10 }), { message: 'InvalidInput' })
    })

    it('throws InvalidInput exception when input contains symbols', function () {
        assert.throws(() => textProcessor("caesar", true, 'ABCDEFG%!@', { shift: 10 }), { message: 'InvalidInput' })
    })

    it('throws InvalidInput exception when input contains numbers', function () {
        assert.throws(() => textProcessor("caesar", true, 'ABCD123', { shift: 10 }), { message: 'InvalidInput' })
    })

    it("returns correct value for string 'hello world'", function () {
        const result = textProcessor("caesar", true, "hello world", { shift: 10 });
        assert.strictEqual(result, "rovvy gybvn");
    });

    it("returns correct value for string 'Try with a longer TEST string'", function () {
        const result = textProcessor("caesar", true, "Try with a longer TEST string", { shift: 21 });
        assert.strictEqual(result, "Omt rdoc v gjibzm OZNO nomdib");
    });
});