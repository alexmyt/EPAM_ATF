/* 1. Print names every films from array */
const films = ["Film 1", "Film 2", "Film 3", "Film 4", "Film 5"];
films.forEach(element => console.log(element));

/* 2. Convert array to string and back to array */
const vendors = ['Audi', 'Mersedes', 'BMV'];
let string = vendors.join(', ');
console.log(string, string.split(', '));

/* 3. Add 'hello' to each element of names array */
let names = ['Anna', 'Alice', 'Bob'];
names = names.map(element => 'hello ' + element);
console.log(names);

/* 4. Convert an array of number to Boolean 
* (what does this mean? I don't understend, but I try :))
*/
const numbers = [0, 3, 5, 7, 9, 12];
console.log(numbers.map(Boolean));
console.log(numbers.map(el => !!el)); // one more variant 

/* 5. Sort an array of numbers */
console.log([3, 5, 2, 1, 9].sort());

/* 6. Reverse sort an array of numbers */
console.log([3, 5, 2, 1, 9].sort((a, b) => b - a));

/* 7. Function with two parameters - array and number, must print index of element equals number
* (I don't understand it, may be translate task to russian is not correctly)
*/
const getElementIndex = function (array, number) {
  let index = array.indexOf(number);
  console.log(index == -1 ? 'Not found' : index);
}
getElementIndex([4, 7, 9, 2, 3, 5], 9);

/* 9. Lopp that prints number while not less then 10 */
let int_9 = 15;
while (int_9 >= 10) { console.log(int_9); int_9-- }

/* 10. Loop that print prime numbers */
for (let i = 2; i < 10; i++) {
  let deviderCount = 0;
  for (j = 2; j <= i / 2; j++) {
    if (i % j == 0) deviderCount++;
  }
  if (deviderCount == 0) console.log('The prime number: ' + i);
}

// 11. Loop that print odd numbers */
for (let i = 0; i < 11; i++) {
  if (i % 2 > 0) console.log(i);
}
