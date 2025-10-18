const words = [
  "fox",
  "wolf",
  "snake",
  "crocodile",
  "lion",
  "cat",
  "crocodile",
  "horse",
];

const forbiddenWord = "crocodile";
const minLength = 4;

const filterWords = (words, forbiddenWord, minLength) =>
  words.filter((word) => word !== forbiddenWord && word.length >= minLength);

console.log(filterWords(words, forbiddenWord, minLength));

// const result = words.filter((word) => {
//   if (word !== forbiddenWord && word.length >= minLength) {
//     return true;
//   }
//   return false;
// });
// return result;

//
// folosiți metodele map și filter pentru a procesa un array de numere reprezentând ani de naștere obținând vârstele peste 18 ani
//

const ages = [60, 75, 2, 19, 69, 13, 64, 42, 6, 59];

// filter
const filterAges = (ages) => ages.filter((age) => age > 18);
console.log(filterAges(ages));

// map
const mapAges = (ages) => {
  const res = ages.map((age) => {
    return age > 18 ? age : null;
  });

  return res.filter((a) => a !== null); // elimina valorile nule
  // [60, 75, null, 19, 69, null, 64, 42, null, 59]; -> [60, 75, 19, 69, 64, 42, 59];
};
console.log(mapAges(ages));

// map improved
const mapAgesImproved = (ages) =>
  ages.map((age) => (age > 18 ? age : null)).filter((age) => age !== null);
console.log(mapAgesImproved(ages));
