const sortObjects = (array, key) => {
  return array.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    } else {
      return 1;
    }
  });
};

const laptops = [
  {
    brand: "HP",
    processor: "i5",
    ram: 8,
  },
  {
    brand: "Lenovo",
    processor: "i7",
    ram: 32,
  },
  {
    brand: "Acer",
    processor: "i5",
    ram: 16,
  },
  {
    brand: "Asus",
    processor: "i7",
    ram: 8,
  },
];

const result = sortObjects(laptops, "ram");
console.log("result: ", result);
