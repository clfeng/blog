
// console.log('---------private-property-in-object---------');
// 定义类的私有属性

// class Foo {
//   #bar = "bar";

//   test(obj) {
//     return #bar in obj;
//   }
// }

// let foo = new Foo();
// console.log(foo.test(foo)); // 返回 true
// console.log(foo.test({})); // 返回 false
// console.log(foo.#bar) // 报错：Uncaught SyntaxError: Private field '#bar' must be declared in an enclosing class

// console.log('---------top-level-await---------');
// let val = await new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 10)
// });

// console.log(val);


// console.log('---------class-static-block---------');
// class C {
//   static #x = 42;
//   static y;
//   static {
//     try {
//       this.y = doSomethingWith(this.#x);
//     } catch {
//       this.y = "unknown";
//     }
//   }
// }

// 以上代码将转译为
// class C {
//   static #x = 42;
//   static y;
//   static #_ = (() => {
//     try {
//       this.y = doSomethingWith(this.#x);
//     } catch {
//       this.y = "unknown";
//     }
//   })();
// }



// console.log('---------regexp-match-indices---------');
// const re1 = /a+(?<Z>z)?/d;
// const s1 = 'xaaaz';

// const m1 = re1.exec(s1);
// console.log(m1.indices[0][0] === 1);
// console.log(m1.indices[0][1] === 5);
// console.log(s1.slice(...m1.indices[0]) === 'aaaz');

// console.log(m1.indices[1][0] === 4)
// console.log(m1.indices[1][1] === 5)
// console.log(s1.slice(...m1.indices[1]) === "z")

// m1.indices.groups["Z"][0] === 4;
// m1.indices.groups["Z"][1] === 5;
// s1.slice(...m1.indices.groups["Z"]) === "z";

// // capture groups that are not matched return `undefined`:
// const m2 = re1.exec("xaaay");
// m2.indices[1] === undefined;
// m2.indices.groups["Z"] === undefined;


// console.log('---------relative-indexing-method---------');
// const arr = [1, 2, 3, 4];
// console.log(arr.at(-1)); // 取倒数第一位
// console.log(arr.at(-2)); // 取倒数第二位

// console.log('---------accessible-object-hasownproperty---------');

// let hasOwnProperty = Object.prototype.hasOwnProperty;
// let object = {"foo": false}
// if (hasOwnProperty.call(object, "foo")) {
//   console.log("has property foo")
// }

// if (Object.hasOwn(object, "foo")) {
//   console.log("has property foo")
// }


// console.log(Object.hasOwn(object, "foo")) // true // 等同于 hasOwnProperty.call(object, property)
// let object2 = Object.create({ foo: true })
// console.log(Object.hasOwn(object2, "foo")) // false

// let object3 = Object.create(null)
// console.log(Object.hasOwn(object3, "foo")) // false


console.log('---------class-static-block---------');

let getX;

export class C {
  #x
  constructor(x) {
    this.#x = { data: x };
  }

  static {
    // getX has privileged access to #x
    getX = (obj) => obj.#x;
  }
}

console.log(getX); // (obj) => obj.#x;
console.log(getX(new C('test')));

