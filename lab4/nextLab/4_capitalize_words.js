String.prototype.capitalizeWords = function () {
  return this.replace(/\b[a-z]/g, (match) => match.toUpperCase());
};

console.log("this words will be capitalized".capitalizeWords());

// implementați metoda 'times' pe tipul Number, astfel încât 3.times(() => {}) să execute funcția de 3 ori.

Number.prototype.times = function (fn) {
  const value = this.valueOf();
  for (let i = 0; i < value; i++) {
    fn(i);
  }
};

(3).times(() => console.log("hello!"));
