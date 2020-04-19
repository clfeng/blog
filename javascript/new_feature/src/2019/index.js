// 1. Optional catch binding
console.log('----Optional catch binding-------');
try {
    throw new Error('this is an error');
} catch {
    console.log('error');
}

// 2. Object.fromEntries
console.log('----Object.fromEntries-------');
let originObj = { a: 1, b: 2 };
let keyValueList = Object.entries({ a: 1, b: 2 });
console.log(keyValueList);
let obj = Object.fromEntries(keyValueList); // { a: 0, b: 1 }
console.log(obj);


// 3. Symbol.prototype.description
console.log('----Symbol.prototype.description-----');
let testSymbol = Symbol('clf')
console.log(testSymbol.description);
try {
    console.log(Symbol('foo') + 'bar');
} catch (error) {
    console.log('syntax error: ', error.message);
}
console.log(Symbol("foo").toString() + "bar");

// 4. Function.prototype.toString
console.log('-----Function.prototype.toString---------');
function /* this is bar */ bar() {
    // Hello
    return 'Hello, bar!';
}
console.log(bar.toString());

// 以上的新标准下的会按照源码输出：
// function /* this is bar */ bar() {
//     // Hello
//     return 'Hello, bar!';
// }

// 在以往的标准中泽会将注释去掉:
// "function bar() {
//     // Hello
//     return 'Hello, bar!';
// }" 

// 5. JSON.stringify
// 当你使用 JSON.stringify 处理一些无法用 UTF-8 编码表示的字符时（U+D800 至 U+DFFF），
// 曾经返回的结果会是一个乱码 Unicode 字符，即“�”。该提案提出，用 JSON 转义序列来安全的表示这些特殊字符
console.log('-----JSON.stringify---------');
console.log(JSON.stringify('𝌆'))
// → '"𝌆"'
console.log(JSON.stringify('\uD834\uDF06'));
// → '"𝌆"'

// 以下无法用 UTF-8 编码表示的字符，会用 JSON 转义序列来安全的表示
console.log(JSON.stringify('\uDF06\uD834'))
// → '"\\udf06\\ud834"'
console.log(JSON.stringify('\uDEAD'))
// → '"\\udead"'

// 6. Array.prototype.{flat,flatMap}
console.log('-----Array.prototype.{flat,flatMap}---------');
console.log( ['Dog', ['Sheep', ['Wolf']]].flat() );
//[ 'Dog', 'Sheep', [ 'Wolf' ] ]


console.log(
    ['Dog', ['Sheep', ['Wolf']]].flat(2) 
);
//[ 'Dog', 'Sheep', 'Wolf' ]

console.log( 
    ['Dog', ['Sheep', ['Wolf']]].flat(Infinity)
);
//[ 'Dog', 'Sheep', 'Wolf' ]

console.log(
    ['My dog', 'is awesome'].map(words => words.split(' '))
)
//[ [ 'My', 'dog' ], [ 'is', 'awesome' ] ]
console.log(
    ['My dog', 'is awesome'].flatMap(words => words.split(' '))
);
//[ 'My', 'dog', 'is', 'awesome' ]


// 7. JSON superset
// 什么是 JSON 超集？还记得 ⊂ 这个符号的可以这样解释该提案 JSON ⊂ ECMAScript，简而言之就是让 ECMAScript 兼容所有 JSON 支持的文本。
// ECMAScript 曾在标准 JSON.parse 部分阐明 JSON 确为其一个子集，
// 但由于 JSON 内容可以正常包含 U+2028 行分隔符与 U+2029 段落分隔符而 ECMAScript 却不行。
// 该草案旨在解决这一问题。在这之前，如果你使用 JSON.parse() 执行带如上特殊字符的字符串时，
// 只会收到 SyntaxError 的错误提示。该草案同样是向后兼容的，其对用户唯一的影响是保持原样，即在暂不支持特殊字符解析的运行环境中保持 SyntaxError 的报错。

// 8. String.prototype.{trimStart,trimEnd}
console.log('-----String.prototype.{trimStart,trimEnd}}---------');
console.log('   Hello world!   '.trimStart(), '---');
console.log('   Hello world!   '.trimEnd());