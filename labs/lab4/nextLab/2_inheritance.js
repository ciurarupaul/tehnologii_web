class Robot {
  constructor(name) {
    this.name = name;
  }

  move() {
    console.log(`${this.name} is moving`);
  }
}

const r0 = new Robot("some robot");
r0.move();

class Weapon {
  constructor(description) {
    this.description = description;
  }

  fire() {
    console.log(`${this.description} is firing`);
  }
}

const w0 = new Weapon("pew pew laser");
w0.fire();

class CombatRobot extends Robot {
  constructor(name) {
    super(name);
    this.weapons = [];
  }

  addWeapon(w) {
    this.weapons.push(w);
  }

  fire() {
    console.log("firing all weapons");
    for (const w of this.weapons) {
      w.fire();
    }
  }
}

const r1 = new CombatRobot("some combat robot");
r1.addWeapon(w0);
r1.fire();

Robot.prototype.fly = function () {
  console.log(`${this.name} is flying`);
};

r1.fly();

//  implementați următoarea structură de tipuri. Software este un tip care are metoda 'run'. Browser moștenește Software și poate adăuga și instala Plugin. Un Browser poate avea multiple Plugin.

class Software {
  run() {
    console.log("software is running");
  }
}

class Plugin {
  constructor(name) {
    this.name = name;
  }

  display() {
    console.log(`plugin ${this.name} is installed`);
  }
}

class Browser extends Software {
  constructor() {
    super();
    this.plugins = [];
  }

  installPlugins(plugins) {
    this.plugins.push(...plugins);

    for (const plugin of plugins) {
      console.log(`${plugin.name} was installed`);
    }
  }
}

// test

const chrome = new Browser();
chrome.run();

const plugin1 = new Plugin("plugin1");
const plugin2 = new Plugin("plugin2");

chrome.installPlugins([plugin1, plugin2]);

console.log(chrome.plugins);
