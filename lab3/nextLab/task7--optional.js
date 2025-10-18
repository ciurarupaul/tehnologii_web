// Dat fiind un array de numere scrieți o funcție pentru a calcula media lor folosind reduce?
const calcAverage = (numbers) => {
  const sum = numbers.reduce((sum, curr) => sum + curr, 0);
  return sum / numbers.length;
};

const numbers = [10, 20, 30, 40];
console.log(calcAverage(numbers));
