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

// 2. import()

// 3. BigInt
// 4. Promise.allSettled
// 5. globalThis
console.log('---------globalThis---------');
console.log(globalThis === window);
console.log(globalThis === global);

// for-in机制,ECMAScript遗留了一个关于for-in循环顺序的详细描述。感谢Kevin Gibbons所付出的努力，为for-in机制定义了一系列规则。
// forin 的相关东西比较复杂，后续有时间再回看
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

