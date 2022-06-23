// if any of the operands in binary '+' operator is string, then second operand converts to strings
console.log("string" + true);   // stringtrue
console.log(false + "string");  // falsestring

// bunary '+' operator executed from left to right
console.log("100" + 100 + 100); // 100100100
console.log(100 + 100 + "100"); // 200100

// if any of the operators is number, then other operand convert to number too.
console.log(100 + true);        // 101
console.log(100 + false);       // 100

// other binary mathematical operators convert operands to numbers
console.log("100" * 10);        // 1000
console.log("100" * "10");      // 1000
console.log("100" * true);      // 100
console.log("100" * false);     // 0
console.log(100 * true);        // 100
console.log(100 * false);       // 0

console.log("100" / true);      // 100
console.log("100" / false);     // Infinity. Yes, we can devide by zerro, its safe.
console.log("100" / 10);        // 10
console.log("100" / "10");      // 10
console.log(100 / false);       // Infinity
console.log("string" / 10);     // NaN, Not a Number, becouse first operand is NaN
