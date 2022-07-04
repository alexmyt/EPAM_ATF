"use strict";

let animal = {
  movie: true
}

// Prototypal inheritance

// Old style
let cat = {
  __proto__: animal
}
console.log(cat.movie);

// New style
cat = Object.create(animal);
console.log(cat.movie);

// Constructor

function Cat() {
}
Cat.prototype = animal;

cat = new Cat();
console.log(cat.movie);

