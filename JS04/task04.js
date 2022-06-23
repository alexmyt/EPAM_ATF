// create the object with property
let car = {
  'color': 'black'
};
car.color = 'green';

// new method of object
car.power = function () {
  console.log(`This ${this.color} car has an engine power of 1000 Wt`);
}

car.power();

// New object - warehouse with apples and pears.
// Method capacity print apples + pears
let warehouse = {
  apples: 0,
  pears: 0,

  capacity: function () {
    console.log(this.apples + this.pears);
  }

}

warehouse.apples = 10;
warehouse.pears = 20;
warehouse.capacity();

// terminal with name
let terminal = { name: 'John' };
function checkName(name) {
  console.log(terminal.name == name ? `Hello, ${name}!` : `Wrong name: ${name}`);
}

checkName('John');
checkName('Alice');

// Gettyng type of an value
const var_1 = 10;
console.log(`The type of 'var_1' is ${typeof var_1}`);

// Check if nuumber is prime
function isPrime(value) {
  
  if (value != parseInt(value)) return false;

  let dividers = 0;
  for (let i = 1; i <= value; i++) {
    if (value % i == 0) dividers++;
    if (dividers > 2) break;
  }

  return dividers == 2;
}

console.log(isPrime(3.5));  // false
console.log(isPrime(3));    // true
console.log(isPrime(31));   // true
console.log(isPrime(35));   // false