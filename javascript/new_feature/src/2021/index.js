// console.log('---------replaceAll---------');
// const queryString = 'q=query+string+parameters';
// // const withSpaces = queryString.replace(/\+/g, ' ');
// console.log(queryString.replace(/\+/g, ' '));
// console.log(queryString.replace('+', ' '));
// console.log(queryString.replaceAll('+', ' '));
// console.log(queryString.replaceAll(/\+/g, ' '));


// console.log('---------Promise.any---------');
// Promise.any([
//   new Promise(resolve => setTimeout(() => resolve(1), 1000)),
//   new Promise(resolve => setTimeout(() => resolve(2), 500)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error('x')), 100))
// ]).then(
//   (first) => {
//     // Any of the promises was fulfilled.
//     console.log(first);
//   },
//   (error) => {
//     // All of the promises were rejected.
//     console.log(error);
//   }
// );

// Promise.any([
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error('x')), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error('x')), 500)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error('x')), 100))
// ]).then(
//   (first) => {
//     // Any of the promises was fulfilled.
//     console.log(first);
//   },
//   (error) => {
//     // All of the promises were rejected.
//     console.log(error);
//   }
// );


// console.log('---------numeric-separator---------');
// 1_000_000_000           // Ah, so a billion
// 101_475_938.38          // And this is hundreds of millions

// let fee1 = 123_00;       // $123 (12300 cents, apparently)
// let fee2 = 12_300;       // $12,300 (woah, that fee!)
// let amount1 = 12345_00;  // 12,345 (1234500 cents, apparently)
// let amount2 = 123_4500;  // 123.45 (4-fixed financial)
// let amount3 = 1_234_500; // 1,234,500

// console.log(fee1);
// console.log(fee2);
// console.log(amount1);
// console.log(amount2);
// console.log(amount3);

// console.log(0.000_001);


// let nibbles = 0b1010_0001_1000_0101;
// console.log(nibbles); // true

console.log('---------logical-assignment---------');
// "Or Or Equals" (or, the Mallet operator :wink:)
// a ||= b;
// a || (a = b);

// // "And And Equals"
// a &&= b;
// a && (a = b);

// // "QQ Equals"
// a ??= b;
// a ?? (a = b);
// function example(opts) {
//   // Ok, but could trigger setter.
//   opts.foo = opts.foo ?? 'bar'

//   // No setter, but 'feels wrong' to write.
//   opts.baz ?? (opts.baz = 'qux');

//   return opts;
// }

// console.log(example({ foo: 'foo' }))

function example(opts) {
  // Setters are not needlessly called.
  opts.foo ??= 'bar'

  // No repetition of `opts.baz`.
  opts.baz ??= 'qux';

  return opts;
}
console.log(example({ foo: 'foo' }))
