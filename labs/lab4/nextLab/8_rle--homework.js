//  - (Tema) - Implementați o funcție care face compresie RLE (Run Length Encoding) asupra unui fișier text. După implementare, filmați un videoclip în care descrieți soluția propusă. Încărcați o arhivă cu codul sursă aici. Completați de asemenea link-ul la videoclip (fie încărcat unlisted pe youtube, fie în drive cu share cadrului didactic de la seminariu). Termenul de livrare a temei este o săptămână.

const { readFileSync } = require("fs");

const rle = (inputString) => {
  if (typeof inputString !== "string") {
    throw new Error("Invalid input");
  }

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
  // [ 'a', 2 ] -> pair[0] = 'a' and pair[1] = 2
  return charMap.map((pair) => pair[0] + pair[1]).join("");
};

async function main() {
  try {
    const content = readFileSync("./input.txt", "utf8");
    console.log(rle(content));
  } catch (err) {
    console.error("Error: ", err.message);
  }
}

main();
