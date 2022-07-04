// find strings by teplate: simbol 'a', any symbol, sybol 'b'
let string1 = 'ahb acb aeb aeeb adcb axeb';
console.log(string1.match(/(a.b)/g));   // [ 'ahb', 'acb', 'aeb' ]

// find only '2+3'
let string2 = '2+3 223 2223';
console.log(string2.match(/\d\+\d/)[0])

// Get day, month and year of current date
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1; // adding 1 because the months is numbered from 0
let year = date.getFullYear();

console.log(`day: ${day}, month: ${month}, year: ${year}`);