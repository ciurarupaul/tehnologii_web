const sampleArray = [1, 2, 3, 4, 5];

const map = (array, transformation) => {
  const result = [];
  for (const element of array) {
    result.push(transformation(element));
  }
  return result;
};

console.log(map(sampleArray, (x) => x * 2));

//  reimplementați metoda reduce(reduceleft) ca o funcție globală

// functie globala?
const globalReducer = (arr, reducer, initialValue) => {
  let res = initialValue;

  for (const el of arr) {
    res = reducer(res, el);
  }

  return res;
};

const numbers = [1, 2, 3, 4, 5];
const sumReducer = (sum, curr) => sum + curr;

console.log(globalReducer(numbers, sumReducer, 0));
console.log(globalReducer(numbers, sumReducer, 100));
