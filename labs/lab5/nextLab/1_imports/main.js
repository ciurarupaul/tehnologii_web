// import { pi as someValue, sum, product } from "./math.js";
import * as Math from "./math.js";
import { taskModule } from "./task.js";

console.log(Math.pi);
console.log(Math.sum(1, 2));
console.log(Math.product(2, 3));

console.log(taskModule.fnc(taskModule.constant));
