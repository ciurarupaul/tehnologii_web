function fibGen() {
  const cache = [1, 1];

  const fib = (index) => {
    if (index < cache.length) {
      console.log("found " + index);
      return cache[index];
    } else {
      console.log("calculated" + index);
      cache[index] = fib(index - 1) + fib(index - 2);
    }
  };

  return fib;
}

const fib = fibGen();
console.log(fib(1));
console.log(fib(5));
console.log(fib(3));

// implementați o variantă recursiva a unei funcții de exponențiere. Atât rezultatele finale cât și cele intermediare vor fi memoizate.

function memoizedPower() {
  const cache = {};

  const power = (base, exp) => {
    const key = `${base},${exp}`;

    if (key in cache) {
      console.log(`cache: ${key} found`);
      return cache[key];
    }

    // stop
    if (exp === 0) return 1;

    console.log(`calculate: ${key}`);
    const result = base * power(base, exp - 1);
    cache[key] = result;

    return result;
  };

  return power;
}

const power = memoizedPower();
console.log(power(2, 3));
console.log(power(2, 4));

/*
calculate: 2,3
calculate: 2,2
calculate: 2,1
8
calculate: 2,4
cache: 2,3 found
16
*/
