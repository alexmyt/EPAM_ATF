"use strict"

console.clear();

// Handle exception
try {
  console.log(a);
  let a = 3;
} catch (err) {
  console.error('Got an error!! Need to declare var before using.')
  console.log(err);
}

// Generate exception
try {
  console.log(1 / 0); // Infinity
  throw new RangeError("We can, but don't want devide by0 ");

} catch (err) {
  console.error(`Error! ${err.message}`);
} finally {
  console.log('Finish.');
}