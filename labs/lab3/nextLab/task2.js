// const getTotalArea = (squareDimensions) => {
//   return squareDimensions
//     .map((side) => {
//       return side * side;
//     })
//     .reduce((prev, current) => {
//       return prev + current;
//     }, 0);
// };

const getTotalArea = (squareDimensions) =>
  squareDimensions
    .map((side) => side * side)
    .reduce((prev, current) => prev + current, 0);

const squareDimensions = [3, 5, 12, 3, 5, 3];

const result = getTotalArea(squareDimensions);
console.log("result: ", result);

// implementați o funcție care primește ca parametrii un array de numere și un număr și returnează suma tuturor numerelor din array divizibile cu cel de-al doilea parametru

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const divisor = 2;

const getDivisorsSum = (numbers, divisor) =>
  numbers
    .filter((number) => number % divisor === 0)
    .reduce((prev, curr) => prev + curr, 0);

const improvedDivisorsSum = (numbers, divisor) =>
  numbers.reduce((sum, number) => {
    if (number % divisor === 0) {
      return sum + number;
    }
    return sum;
  }, 0);

console.log(getDivisorsSum(numbers, divisor));
console.log(improvedDivisorsSum(numbers, divisor));
