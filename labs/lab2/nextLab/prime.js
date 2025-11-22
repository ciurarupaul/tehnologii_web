// pas 6 - structuri de control

const checkPrime = (n) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
};

if (process.argv.length < 3) {
  console.log("not enough params");
} else {
  console.log(checkPrime(parseInt(process.argv[2])));
}

// implementează o funcție care calculează elementul de un anumit ordin al șirului lui Fibonacci, primind acest ordin ca parametru de linie de comandă
const calcFibbonaci = (order) => {
  if (order === 1) return 0;
  if (order === 2) return 1;

  order -= 2;

  let prev = 0,
    curr = 1;

  let arr = [0, 1];

  while (order) {
    const next = prev + curr;
    prev = curr;
    curr = next;

    arr.push(next);
    order--;
  }

  console.log(arr);
  return curr;
};

console.log(calcFibbonaci(17));
