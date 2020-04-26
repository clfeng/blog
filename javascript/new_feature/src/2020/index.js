// 1. String.prototype.matchAll
console.log('----String.prototype.matchAll-------');
let regex = /t(e)(st(\d?))/g;
let string = 'test1test2';

console.log(string.match(regex)); // gives ['test1', 'test2'] - how do i get the capturing groups?
let ret = string.matchAll(regex); // gives RegExpStringIterator

for (const iterator of ret) {
  console.log(iterator);  
}
/*
// 类数组对象
{
    0: "test1"
    1: "e"
    2: "st1"
    3: "1"
    index: 0
    input: "test1test2"
    groups: undefined
    length: 4
}
{
    0: "test2"
    1: "e"
    2: "st2"
    3: "2"
    index: 5
    input: "test1test2"
    groups: undefined
    length: 4
}
*/

// 2. import(specifier)
// a. specifier 支持模板语法可在运行时动态求值
// b. import 可同于script脚本也可以用于module
// c. import 用在一个模块中，不会进行变量提升（不会有类似var，function定义的行为）
// d. 在模块中通过import进行引用其他模块，这个过程时不会进行模块的依赖分析的
// e. mport（）不会建立可以静态分析的依赖项。 （但是，在更简单的情况下，例如import（“ ./ foo.js”），实现仍可能能够执行推测性获取。）


// 3. BigInt
// 目的：为了能表示比2^53更大的数字
// 特点：
// a. 可以通过BigInt方法活着数字后面跟n (100n) 进行实现
// b. BigInt 进行整数的运算在超出2^53不会丢失精度
// c. 进行 / 运算，如果求出的结果是存在小数，会向下取整
// d. 与整数进行比较 === 符号的结果一定为false，== 运算则会做类型转换，可以认为通过Number()将bigInt转成整数
// e. BigInt和Number等可以进行大小比较
// f. 在 if 等操作符下，可像Number一样进行类型的转换
// g. 可在 BigInt64Array and BigUint64Array进行使用
// h. 不能和Number类型直接进行数字运算
// i. 可以与String类型级连操作，整体跟String和Number的运算类似
// j. BigInt 转Number的时候可能会丢失精度（小于等于2^53则不会）
// k. 浮点数转为BigInt会抛出错误（包括字符串类型的浮点数 如‘1.3’）
// l. Math.round,Math.max, | 等操作BigInt都会抛出错误
// 不能在JSON中使用


// 4. Promise.allSettled
// 当所有的promise都进入到settled状态的时候才从pendding状态进入settled状态
// 用法如：Promise.allSettled[promise1, promise2].then(() => {console.log('hi')});
// 

// 5. globalThis
// globalThis 并非是全局对象，不会随着页面url的切换而切换
console.log('---------globalThis---------');
console.log(globalThis === window);
console.log(globalThis === global);

// for-in机制,ECMAScript遗留了一个关于for-in循环顺序的详细描述。感谢Kevin Gibbons所付出的努力，为for-in机制定义了一系列规则。
// 6. optional chaining
// 基本的用法
// obj?.prop       // optional static property access
// obj?.[expr]     // optional dynamic property access
// func?.(...args) // optional function or method call
console.log('---------optional chaining---------');
let data = {};
// 之前
console.log(data && data.article && data.article.title);
// 现在
console.log(data?.article?.title); 

data = {
    article: {
        title: 'this is title'
    }
};
// 之前
console.log(data && data.article && data.article.title);
// 现在
console.log(data?.article?.title); 

// 7. Nullish coalescing Operator
console.log('---------Nullish coalescing Operator---------');
console.log("" || 'default value'); // default value
console.log("" ?? 'default value');
console.log(undefined ?? 'default value');
console.log(null ?? 'default value');

