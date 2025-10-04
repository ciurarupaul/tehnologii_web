// pas 4 - structuri de control
function addToArray() {
  let args = arguments;
  let array = args[0];

  for (let i = 1; i < args.length; i++) {
    array.push(args[i]);
  }

  return array;
}

let array = ["a"];
console.log(addToArray(array, "b", "c").join(", "));

// sau
// function addToArray(array, ...args)

//  implementează o funcție care primește ca parametrii două array-uri de aceeași lungime și returnează un array cu elementele din cele două surse intercalate

const combineArrs = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return -1;
  let newArr = new Array();

  for (let i = 0; i < arr1.length; i++) {
    newArr.push(arr1[i]);
    newArr.push(arr2[i]);
  }

  return newArr;
};

console.log(combineArrs([1, 1, 1], [2, 2, 2]));
