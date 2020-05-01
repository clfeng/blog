//1.  Lifting template literal restriction


// 2. s (dotAll) flag for regular expressions
console.log('----s (dotAll) flag for regular expressions-------');

// The dot, the decimal point) matches any single character except line terminators: \n, \r, \u2028 or \u2029.
// . 在正则表达是中，会比配出了换行符之外的其他符号
let str = `
hello
world
`;

// 3. 通过s标识符，使得 . 符号匹配换行符
console.log(/hello.world/.test(str));
console.log(/hello.world/s.test(str));

// 4. RegExp Named Capture Groups
console.log('---- RegExp Named Capture Groups -------');
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
let result = re.exec('2015-01-02');
console.log(result);
// result.groups.year === '2015';
// result.groups.month === '01';
// result.groups.day === '02';

// result[0] === '2015-01-02';
// result[1] === '2015';
// result[2] === '01';
// result[3] === '02';

// 命名组的方向引用
let duplicate = /^(?<half>.*).\k<half>$/u;
console.log(duplicate.test('a*b')); // false
console.log(duplicate.test('a*a')); // true

let reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
let ret = '2015-01-02'.replace(re, '$<day>/$<month>/$<year>');
console.log(ret);


// 使用了 named groups 特性之后，replace 的第二个参数（回调函数），其参数的最后一项为groups 对象
re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
ret = '2015-01-02'.replace(re, (...args) => {
 let {day, month, year} = args[args.length - 1];
 return `${day}/${month}/${year}`;
});
console.log(ret);


// 未使用 named groups特性的正则其执行结果跟以前的保持一直
re = /(\d{4})-(\d{2})-(\d{2})/;
ret = '2015-01-02'.replace(re, (...args) => {
    return `${args[2]}/${args[3]}/${args[1]}`;
})
console.log(ret);
// 命名的反向引用语法 /\k<foo>/ 当前在非 Unicode 正则表达式中是允许的，并且与文字字符串 k<foo> 匹配，当然了，在Unicode 正则表达式中，此类转义是禁止的


// 5. Rproposal-object-rest-spread
console.log('---- Rproposal-object-rest-spreads -------');
let obj = { x: 1, y: 2, a: 3, b: {} };
let { x, y, ...z } = obj;

console.log(z);
console.log(z.b === obj.b);


//6. proposal-regexp-lookbehind
console.log('---- proposal-regexp-lookbehind -------');
//
// a.正反向断言 (?<=...)
// b.负反向断言 (?<!...) 
console.log('正反向断言')
console.log(/(?<=\$\d+\.)\d+/.test('$10.25'));
console.log(/(?<=\$\d+\.)\d+/.test('€10.25'));


console.log('负反向断言');
console.log(/(?<!\$)\d+(?:\.\d*)/.test('$10.25'));
console.log(/(?<!\$)\d+(?:\.\d*)/.test('€10.25'));

console.log('匹配的贪婪模式');
console.log(/(?<=(\d+)(\d+))$/.exec('1035'));
console.log(/(\d+)(\d+)$/.exec('1035'));

console.log('Referring to capture groupss')
// 感觉还是很不理解，似乎跟文档中解释的不大相同
// 文档中解释的是 /(?<=\w)(\1)(\d)$/中的 \1 会匹配到空字符串，因为查找是从后往前的，反向引用只能是引用已经被确定的
// 但从实际demo来看，其实按照正向查找的方式去使用 组的引用就好了/(?<=\w)(\d)(\1)$/的 \1 是可以引用到(\d)的
console.log(/(?<=\w)(\d)(\1)$/.exec('a11'));
console.log(/(?<=\w)(\1)(\d)$/.exec('a11'));


// 7. Promise.prototype.finally
console.log('---- Promise.prototype.finally -------');
Promise.resolve(1).finally(function (ret) {
    console.log(ret); // undefined ， 前面promise的值并不会传到此处
    // throw new Error('error') // 可通过抛出错误触发后续then的rejected
    return 'test'; // 返回一个新值并不会改变原先的值
}).then((ret) => {
    console.log(ret);
}, (ret) => {
    console.log(ret);
});
Promise.resolve(2).then((ret) => {
    console.log(ret);
}, (ret) => {
    console.log(ret);
})

// 8. Asynchronous Iterators for JavaScript
// for await (const line of readLines(filePath)) {
//     console.log(line);
// }

// 9. proposal-regexp-unicode-property-escapes
// todo