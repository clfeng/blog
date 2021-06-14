# Typescript 学习笔记

### interface和type alias都能进行复杂类型的定义，他们有什么区别呢？

1. interface是开发的，type alias是封闭的；意思就是interface定义的类型可以二次补充定义，types定义的类型，定义之后不可更改

```
  interface Kitten {
      purrs: boolean;
  }

  interface Kitten {
    colour: string;
  }
  let kitten: Kitten = {
    purrs: true,
    colour: '1'
  }
  // 以上代码可以正常运行
  // ----------------------------
  // 以下的代码会爆，Duplicate identifier 'Puppy'的错误

  type Puppy = {
      color: string;
  };

  type Puppy = {
      toys: number;
  };

```

2. interface 发生错误的时候其错误提示更加简洁，而type alias的更为具体

```
	type BirdType = {
    wings: 2;
  };
  
  interface BirdInterface {
    wings: 2;
  }
  
  const bird1: BirdType = { wings: 2 };
  const bird2: BirdInterface = { wings: 2 };
  
  // They both support extending other interfaces and types.
  // Type aliases do this via intersection types, while
  // interfaces have a keyword.
  
  type Owl = { nocturnal: true } & BirdType;
  type Robin = { nocturnal: false } & BirdInterface;
  
  interface Peacock extends BirdType {
    colourful: true;
    flies: false;
  }
  interface Chicken extends BirdInterface {
    colourful: false;
    flies: false;
  }
  
  let owl: Owl = { wings: 2, nocturnal: true };
  let chicken: Chicken = { wings: 2, colourful: false, flies: false };
  
  // That said, we recommend you use interfaces over type
  // aliases. Specifically, because you will get better error
  // messages. If you hover over the following errors, you can
  // see how TypeScript can provide terser and more focused
  // messages when working with interfaces like Chicken.
  
  owl = chicken;
  //owl = chicken 的错误提示：
  // Type 'Chicken' is not assignable to type 'Owl'.
  // Property 'nocturnal' is missing in type 'Chicken' but required in type '{ nocturnal: true; }'.
  
  
  chicken = owl;
  //chicken = owl 的错误提示：
  // Type 'Owl' is missing the following properties from type 'Chicken': colourful, flies
  
```

官网是比较推推荐使用interface具体见 [官网例子](https://www.typescriptlang.org/play?e=83#example/types-vs-interfaces)



3. 定义对象和函数的语法不通

```
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}

// types alias
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;

```



3. types alias 除了可以定义对象和函数之外还能定义基础类型、联合类型，元组
4. 进行继承的语法不通
5. 类不能实现type alias定义的联合类型

```
	interface Point {
    x: number;
    y: number;
  }
  
  class SomePoint implements Point {
    x = 1;
    y = 2;
  }
  
  type Point2 = {
    x: number;
    y: number;
  };
  
  class SomePoint2 implements Point2 {
    x = 1;
    y = 2;
  }
  
  type PartialPoint = { x: number; } | { y: number; };
  
  // FIXME: can not implement a union type
  class SomePartialPoint implements PartialPoint {
    x = 1;
    y = 2;
  }
```

### unknown 和 any

unknown：可以用来定义一些已开始我们无法确定类型的变量，而后我们在通过js的类型校验方法去检查变量的类型，在检查的过程中ts会识别出该变量的类型，进而做到类型安全



any：可以理解为放弃类型校验，这样代码就更写js一样，即使访问了不存在的属性也不会有类型安全的提示，应用场景基本是为了兼容老的js代码



### void  和 undefined 

如果 函数的返回值定义成undefined会是怎样的跟定义成void有什么区别



### 配置了--strictNullChecks会产生什么样的效果

默认情况下undefined 和 null是其他类型的子集，可以赋值给其他类型，但是如果设置了--strictNullChecks则undefined 和 null则不能再赋值给其他类型了（例外：undefined 依旧可以复制给void类型，undefined 和 null 也依旧能复制给unkown和any类型）



### 类型断言 as

在进行了相应的类型判断之后可以进行以下类型断言，更加精确变量的类型；类型断言有两种方式

```

let someValue: unknown = "this is a string";
// 第一种 as 语法
let strLength: number = (someValue as string).length;

// 第二种 尖括号
let strLength: number = (<string>someValue).length;
```

我们更加倾向的是第一种 as 语法，因为在jsx的场景下只能是用as语法



类型定义的语法：

```
let str: String = 'xxx';

let str: string = 'xxx';
```

以上两种都是合法的，但是推荐小写的string，这个可以和js的原来的基础对象区分开来



### readonly vs const

使用场景：如果是变量使用const，如果是属性的话使用readonly



### 对象字面量赋值给变量后作为参数传递给函数会做更多的额外检查

```
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return { color: config.color || "red", area: config.width || 20 };
}

// 以下两行代码会报错
let errSquare = createSquare({ colour: "red", width: 100 });
let myConfig: SquareConfig = { colour: "red", width: 100 };

// 以下代码不会报错
let config = { colour: "red", width: 100 };
let mySquare = createSquare(config);

// 以下代码依旧会报错，因为squareOptions和SquareConfig完全没有相同的变量
let squareOptions = { colour: "red" };
let mySquare2 = createSquare(squareOptions);
```



### Enums

1. 枚举是在运行时存在的真实对象
2. 如果是数字型的枚举，编译后可以进行键的反映射，也就是通过值去拿到键
3. 如果是字符串类型的枚举，则无法通过值，反映射拿到键







剩余问题：

https://www.typescriptlang.org/docs/handbook/utility-types.html `ThisType<Type>`不是很理解

https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators 整个文章找时间重新看，对修饰器的用得太少了，整体不是很理解