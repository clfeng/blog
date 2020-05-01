// 1. Array.prototype.includes
console.log('---------Array.prototype.includes---------');

// arr.indexOf(el) !== -1 的形式存在两个问题
// 1. indexOf 无法很好的表示出我们的目的（判断某个元素是否在数组理）
// 2. 内部使用严格相等进行比较，在遇到 NaN 的情况就出现问题
console.log([NaN].indexOf(NaN) === -1);

// api: arr.includes(searchElement[, fromIndex])
console.log(["a", "b", "c"].includes("a") === true);
console.log(["a", "b", "c"].includes("a", 1) === false);

// 2. Exponentiation Operator
console.log('---------Exponentiation Operator---------');
console.log(2**2);
console.log(2**3);
let a = 2;
a **= 2;
console.log(a);

let b = 3;
b **= 3;
console.log(b);