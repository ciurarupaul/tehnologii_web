// pasul 1 - functii
let sayHello = (name) => {
  return `Hello ${name}!`;
};

// argumentele incep de la idx 2
// la idx 0 este path-ul catre interpreter
// la idx 1 este path-ul catre script
console.log(sayHello(process.argv[2]));

//  implemetează o funcție arrow care primește ca parametru un array de string și îmi returnează un singur string obținut prin concatenarea string-urilor din array-ul primit ca parametru
const concatStrings = () => process.argv.slice(2).join(" ");
console.log(concatStrings());

// pasul 2 - functii
function checkDivisible(n, divisor) {
  if (n % divisor === 0) {
    return false;
  } else {
    return true;
  }
}

console.log(checkDivisible(10, 2));
console.log(checkDivisible(10, 3));

// implementează o funcție care returnează numărul de caractere diferite între două string-uri de aceeași lungime primite ca parametri. Dacă string-urile primite nu sunt de aceeași lungime, funcția va returna -1.
function getCharDif(string1, string2) {
  if (string1.length !== string2.length) return -1;
  let counter = 0;

  for (let i = 0; i < string1.length; i++)
    if (string1[i] !== string2[i]) counter++;

  return counter;
}

console.log(getCharDif("index", "INdex"));
