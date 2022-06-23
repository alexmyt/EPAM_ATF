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

/**
 * Check if nuumber is prime
 * @param {number} value 
 * @returns True if number is natural and prime
 */
function isNaturalPrime(value) {
  
  if (isNaN(value) || value != parseInt(value) || value < 2) return false;

  let dividers = 0;
  for (let i = 1; i < value/2; i++) {
    if (value % i == 0) dividers++;
    if (dividers > 1) break;
  }

  return dividers == 1;
}

console.log(isNaturalPrime(3.5));  // false
console.log(isNaturalPrime('3'));  // true
console.log(isNaturalPrime(31));   // true
console.log(isNaturalPrime(32));   // false

let primes = [];
for(i=1; i <= 271; i++){
  if(isNaturalPrime(i)) primes.push(i);
}
console.log(primes.join(','));
console.log(primes.length);  // Must be a 58, see https://oeis.org/A000040