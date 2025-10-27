const a = 3.1415;

const f1 = (a, b) => {
  return a + b;
};

const f2 = (a, b) => {
  return a * b;
};

export { a as pi, f1 as sum, f2 as product };
