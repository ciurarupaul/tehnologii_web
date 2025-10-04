// pas 7 - structuri de control
const sampleString = "the quick brown fox jumps over the lazy dog";

const getCounts = (text) => {
  const words = text.split(" ");
  const result = {};

  for (let word of words) {
    if (word in result) {
      result[word]++;
    } else {
      result[word] = 1;
    }
  }

  // 'in' itereaza eficient doar peste liste de tip <cheie, valoare>
  for (let word in result) {
    result[word] /= words.length;
  }

  return result;
};

console.log(getCounts(sampleString));

// implementează o funcție care calculează frecvențele relative de apariție a unor litere într-un text, excluzând caracterul pentru spațiu

const countLetters = (text) => {
  const letters = text.split("");
  const result = {};

  for (let letter of letters) {
    if (letter === " ") continue;

    if (letter in result) result[letter++];
    else result[letter] = 1;
  }

  for (let letter in result) result[letter] /= text.length;

  return result;
};

console.log(countLetters(sampleString));
