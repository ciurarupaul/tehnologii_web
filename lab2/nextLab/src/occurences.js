// pas 3 - structuri de control
function occurences(text, character) {
  // let count = 0;
  // for (let i = 0; i < text.length; i++) {
  //   if (text.charAt(i) === character) {
  //     count++;
  //   }
  // }
  // return count;

  return text.split(character).length - 1;
}

console.log(occurences("sample text", "e"));

// implementează o funcție care primește ca parametru o listă de numere și returnează un array conținând acele numere.
const addNumsToArr = (...nums) => nums;

// sau

const addNumsToArr2 = (...nums) => {
  let newArr = new Array();

  for (let number of nums) {
    newArr.push(number);
  }

  return newArr;
};

console.log(addNumsToArr(1, 2, 3, 4, 5));
console.log(addNumsToArr2(1, 2, 3, 4, 5));
