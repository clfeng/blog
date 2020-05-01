// 1. proposal-object-values-entries
console.log('---------proposal-object-values-entries---------');

let object1 = {
    a: 'somestring',
    b: 42,
    c: false
};
Object.setPrototypeOf(object1, {
    ppp: 'hi'
})

Object.defineProperty(object1, 'test', {
    enumerable: false,
    writable: true
});

// 2. Object.values 用于获取对象上的可枚举属性
console.log(Object.values(object1));
// expected output: Array ["somestring", 42, false]

console.log(Object.entries(object1));

let forInArr = [];
for (const key in object1) {
    forInArr.push(key);
}

console.log(forInArr);

// 3. proposal-string-pad-start-end
console.log('---------proposal-string-pad-start-end---------');
const str1 = '5';
console.log(str1.padStart(3, '0'));
// expected output: "05"

const str2 = 'Breaded Mushrooms';
console.log(str2.padEnd(25, '.'));


// 5. Object.getOwnPropertyDescriptors
console.log('---------Object.getOwnPropertyDescriptors---------');

const shallowClone = (object) => Object.create(
    Object.getPrototypeOf(object),
    Object.getOwnPropertyDescriptors(object)
  );
  
const shallowMerge = (target, source) => Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(source)
);

let obj1 = { a: 1 };
let obj2 = { b: 2 };
obj1.__proto__ = {
    test: 'test'
};
console.log(shallowClone(obj1));
console.log(shallowMerge(obj1, obj2));

let obj3 = Object.create(obj2, {c: {
    value: 1
}});
console.log(obj3);

let mix = (object) => ({
    with: (...mixins) => mixins.reduce(
      (c, mixin) => Object.create(
        c, Object.getOwnPropertyDescriptors(mixin)
      ), object)
  });
  
// multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a, b);
console.log(d);

let obj4 = {
    a: 1,
    [Symbol('b')]: 2
}

// Object.getOwnPropertyDescriptors 可拿到包括symbol属性在内的所有属性的描述器
console.log(Object.getOwnPropertyDescriptors(obj4));

// 7. Trailing commas in function parameter lists and calls
// 允许函数的最后一个参数带上逗号，主要是为了减少代码改动的行数

// 8. Async functions
console.log('---------Async functions---------');
// 支持以下语法
async function asyncFunc() {
    console.log('first');
    let ret = await Promise.resolve('second');
    console.log(ret);
    console.log('third');
}

asyncFunc();

// Shared memory and atomics 
// SharedArrayBuffer 和 Atomics 是 JavaScript 为多线程能力增加的特性，暂时使用的场景不多。存在安全风险
// 可学习文章https://segmentfault.com/a/1190000017890529

/*
SharedArrayBuffer：
SharedArrayBuffer 对象用来表示一个通用的，固定长度的原始二进制数据缓冲区，类似于 ArrayBuffer 对象，
它们都可以用来在共享内存（shared memory）上创建视图。与 ArrayBuffer 不同的是，SharedArrayBuffer 不能被分离。
共享内存能被同时创建和更新于工作者线程或主线程。依赖于系统（CPU，操作系统，浏览器），
变化传递给环境需要一段时间。需要通过 atomic 操作来进行同步。

Atomics：
Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作。
这些原子操作属于 Atomics 模块。与一般的全局对象不同，Atomics 不是构造函数，因此不能使用 new 操作符调用，
也不能将其当作函数直接调用。Atomics 的所有属性和方法都是静态的（与 Math 对象一样）。
多个共享内存的线程能够同时读写同一位置上的数据。原子操作会确保正在读或写的数据的值是符合预期的，
即下一个原子操作一定会在上一个原子操作结束后才会开始，其操作过程不会中断。
*/