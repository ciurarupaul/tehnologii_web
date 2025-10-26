const orderCoffee = (type) => {
  const types = {
    SPECIAL: "SPECIAL",
    REGULAR: "REGULAR",
  };

  if (Object.values(types).indexOf(type) === -1) {
    throw new Error("coffee error");
  } else {
    console.log(`preparing ${type} coffee`);
  }
};

try {
  orderCoffee("REGULAR");
  // orderCoffee("SWEET_COFFEE");
} catch (error) {
  console.warn(error);
}

// implementați funcția increaseSalary care primește ca parametrii un array de salarii și un număr reprezentând procentul cu care se vor mări (ex 10). Funcția aruncă excepții dacă primul parametru nu este un array sau al doilea parametru nu este un număr.

console.log();

const increaseSalary = (salaries, increasePercentage) => {
  if (!Array.isArray(salaries) || typeof increasePercentage !== "number") {
    throw new Error("Invalid input");
  }

  return salaries.map((salary) => salary * (1 + increasePercentage / 100));
};

try {
  console.log(increaseSalary([100, 120], 5));
  console.log(increaseSalary([100, 120], "doi"));
} catch (err) {
  console.warn("ERROR: ", err.message);
}
