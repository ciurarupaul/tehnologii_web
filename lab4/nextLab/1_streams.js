class Stream {
  #value;
  #nextValue;
  static #count = 0;

  constructor(value, nextValue) {
    this.#value = value;
    this.#nextValue = nextValue;
    Stream.#count++;
  }

  get value() {
    return this.#value;
  }

  get next() {
    this.#value = this.#nextValue(this.#value);
    return this.#value;
  }

  static get count() {
    return Stream.#count;
  }
}

class ConstantStream extends Stream {
  constructor(value) {
    super(value, (value) => value);
  }
}

class NextIntegerStream extends Stream {
  constructor() {
    super(0, (value) => value + 1);
  }
}

const constant = new ConstantStream(1);
const nextInteger = new NextIntegerStream();

for (let i = 0; i < 10; i++) {
  console.log(`constant[${i}] = ${constant.next}`);
  console.log(`nextInteger[${i}] = ${nextInteger.next}`);
}

console.log(Stream.count);

//  implementați un tip obiectual care implementează un șir crescător având ca elemente toate numerele pare pornind de la o valoare dată. Constructorul primește valoarea inițială a secvenței. Singura metodă este 'next' care calculează următoarea valoare din șir.

class EvenSequence {
  constructor(input) {
    if (input % 2 !== 0) {
      throw new Error("Invalid input");
    }
    this.value = input;
  }

  next() {
    this.value += 2;
    return this.value;
  }
}

console.log();

try {
  const seq = new EvenSequence(10);

  console.log(seq.next());
  console.log(seq.next());
  console.log(seq.next());
  console.log(seq.next());
} catch (err) {
  console.warn("ERROR: ", err.message);
}

console.log();

try {
  const invalidSeq = new EvenSequence(1);
  console.log(invalidSeq.next());
} catch (err) {
  console.warn("ERROR: ", err.message);
}
