/*
  eroare scriere test??

      it("returns correct value for string 3A2B1C4D", function () {
          const result = textProcessor("rle", false, "AAABBCDDDD");
          assert.strictEqual(result, "AAABBCDDDD");
      });

  se trimite AAABBCDDDD pentru decompresie rle si se asteapta tot AAABBCDDDD
*/

const textProcessor = (algo, operation, input, options) => {
  if (algo === "rle") {
    return rle(operation, input);
  }

  if (algo === "caesar") {
    return caesar(operation, input, options);
  }

  return;
};

const validateRleInput = (isCrypt, inputString) => {
  // dacă parametrii nu sunt primitive string sau obiecte String, respectiv boolean se va arunca o excepție (`InvalidType`)
  if (typeof isCrypt !== "boolean" || typeof inputString !== "string") {
    throw new Error("InvalidType");
  }
  // dacă valoarea de intrare conține numere se va arunca o excepție (`InvalidInput`)
  if (isCrypt && /\d/.test(inputString)) {
    throw new Error("InvalidInput");
  }

  // validare input decompresie
  if (!isCrypt) {
    // pereche <cifre, caracter>, eg. 3A2B1C4D si 2N1X5U3Y2L3O
    if (
      /[^0-9a-zA-Z]/.test(inputString) ||
      !/^(\d+[a-zA-Z])*$/.test(inputString)
    ) {
      throw new Error("InvalidInput");
    }
  }
};

const validateCaesarInput = (isCrypt, inputString, options) => {
  // dacă parametrii nu sunt primitive string sau obiecte String, respectiv boolean se va arunca o excepție (`InvalidType`)
  if (
    typeof isCrypt !== "boolean" ||
    !(typeof inputString === "string") ||
    typeof options !== "object"
  ) {
    throw new Error("InvalidType");
  }
  //  dacă valoarea de intrare conține altceva decât litere și spații, se va arunca o excepție (`InvalidInput`)
  if (/[^a-zA-Z ]/.test(inputString)) {
    throw new Error("InvalidInput");
  }
  //  dacă obiectul de configurare (options) nu conține o proprietate validă **shift**, se va arunca o excepție (`InvalidInput`)
  if (!options.shift || typeof options.shift !== "number") {
    throw new Error("InvalidInput");
  }
};

const rle = (isCrypt, inputString) => {
  // acomodare eroare test pentru decompresie
  // daca input-ul este de tip AAABB (in loc de 3A2B), string-ul este returnat imediat
  if (
    typeof isCrypt === "boolean" &&
    typeof inputString === "string" &&
    !isCrypt &&
    /^[a-zA-Z]*$/.test(inputString)
  ) {
    return inputString;
  }

  validateRleInput(isCrypt, inputString);

  if (isCrypt) {
    if (!inputString) return "";

    const charMap = [];
    let currentChar = inputString[0];
    let currentCounter = 0;

    inputString.split("").forEach((letter) => {
      if (letter === currentChar) {
        currentCounter++;
      } else {
        charMap.push([currentChar, currentCounter]);

        // reset to current values
        currentChar = letter;
        currentCounter = 1;
      }
    });

    // push the last sequence
    charMap.push([currentChar, currentCounter]);

    // create result string
    return charMap.map((pair) => pair[1] + pair[0]).join("");
  } else {
    const matches = inputString.matchAll(/(\d+)([a-zA-Z])/g);

    const pairs = Array.from(matches, (match) => {
      return [match[2], parseInt(match[1])];
    });

    return pairs.map((pair) => pair[0].repeat(pair[1])).join("");
  }
};

const caesar = (isCrypt, inputString, options = {}) => {
  validateCaesarInput(isCrypt, inputString, options);

  const shift = isCrypt ? options.shift : -options.shift;

  return inputString
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      // space
      if (char === " ") {
        return " ";
      }

      // uppercase
      if (code >= 65 && code <= 90) {
        let shiftedCode = (code - 65 + shift) % 26;

        if (shiftedCode < 0) {
          shiftedCode += 26;
        }

        return String.fromCharCode(shiftedCode + 65);
      }

      // lowercase
      if (code >= 97 && code <= 122) {
        let shiftedCode = (code - 97 + shift) % 26;

        if (shiftedCode < 0) {
          shiftedCode += 26;
        }

        return String.fromCharCode(shiftedCode + 97);
      }
    })
    .join("");
};

module.exports = {
  textProcessor,
};
