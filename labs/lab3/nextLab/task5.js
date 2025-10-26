const sampleDictionary = [
  "the",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "lazy",
  "dog",
];

const sampleText = `
best
read
on
windy
nights
`;

const checkAcrostic = (text, dictionary) => {
  const candidate = text
    .split("\n")
    .filter((e) => e)
    .map((e) => e.trim())
    .map((e) => e[0])
    .join("");

  return dictionary.indexOf(candidate) !== -1;
};

console.log(checkAcrostic(sampleText, sampleDictionary));

// implementați cenzurarea unui text printr-o funcție. Funcția primește un șir de caractere și un dicționar sub forma unui array. De exemplu pentru șirul "javascript este minunat" și dicționarul ["este"] funcția va produce "javascript e**e minunat".

const dictionary = ["este"];
const string = "js este minunat";

// j* e**e m*****t
const censorDictionary = (string, dictionary) =>
  string
    .split(" ")
    .filter((word) => word)
    .map((word) => word.trim())
    .map((word) => {
      if (dictionary.includes(word)) {
        if (word.length > 2) {
          return `${word[0]}${"*".repeat(word.length - 2)}${
            word[word.length - 1]
          }`;
        } else {
          return `${word[0]}${"*".repeat(word.length - 1)}`;
        }
      } else {
        return word;
      }
    })
    .join(" ");

console.log(censorDictionary(string, dictionary));
