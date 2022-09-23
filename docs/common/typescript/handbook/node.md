## 基本数据类型

- `boolean` - 布尔类型
- `number` - 数值类型
- `string` - 字符串类型
- `Array<T>` - 数组类型（或者表示为 T[]）
- `[string,number]` - 元组类型
- 枚举 enum

```js
//枚举类型 (TS)
enum Gender{
    GIRL = 0,
    BOY = 1
}
//枚举类型 (JS 转码后)
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
// Gender[0] = 'GIRL'
// Gender['GIRL'] = 0
```

- `any` - 任意类型
- `never` - 可以用于表示不会返回的函数的返回值，这样的函数都无法正常执行

```js
function func1{
    throw new Error('error');
    // 后面的代码都不会被执行
    let a;
}
function func2{
    while(true){}
    // 后面的代码都不会被执行
    let a;
}
```

- `void` - 可以用来表示函数没有返回值，可以被赋值`null`或`undefined`
- `bigint` - 大整数类型（2^53 - 1）
- `string|number` - 联合类型，表示这个对象可以是 string 或 number，再未正确赋值前，这个对象可以调 string 和 number 的共同的 api，如赋值 number 后，除了共同 api，还可以调 number 的全部 api
- **类型断言** - as 操作符，可以使用两个 as 表示双重断言，`xx as any as boolean`
- **字面量类型** - `type Direction = 'down'|'up'|'left'|'right';`，可以实现枚举的效果
- **类型字面量** - `type Person = {name: string, age: number}`，Persion 类型的对象必需包含 name 和 age 属性
  > null 和 undefined 是其他类型的子类型
  >
  > `非空断言` - element!.style.color，告诉编译器，element 对象肯定不为空，可以放心使用
  > 字符串字面量类型和联合类型区别在于，字面量类型限制了取值，联合类型不限制值只限制类型的范围
  >
  > **接口和属性继承以及类装饰器返回的新类只能多不能少**

## 函数类型

```js
// 规定了传参和返回值的类型
type Func = (name: string, age: string) => string;
```

- 函数重载，**重载声明和实现需要紧紧挨着**，中间不要加任何逻辑

```js
function add(a: string, b: string): void
function add(a: number, b: number): void
function add(a: string|number, b: string|number):void{
    // todo
}
```

## 存取器

```js
get name(){}
set name(value: any)()
```

## 类继承

- 子类继承父类的所有公有属性（子类内部可以访问保护属性）
- 父类实例可以赋值给子类实例
- 子类实例不能赋值给父类实例

## 装饰器

- 类装饰器

```js
function classDecorator(x: Function) {
  // todo
}
@classDecorator
class A {}
```

- 通过类装饰器的返回值达到替换类的效果

```js
function replaceClass(x: Function){
    return class{
        name: string;
        age: number
    }
}
@replaceClass
class A{
    name: string
}
```

- 装饰器工厂，其实就是**内部返回一个装饰器的函数**

```js
function classDecoratorFactory(...args: any[]) {
  return function classDecorator(x: Function) {
    // todo
  };
}
@classDecorator("class decorator factory")
class A {}
```

- 属性装饰器
  - 实例属性装饰器，target 是构造函数的原型
  - 静态属性装饰器，target 是构造函数的本身
  - 方法装饰器，第三个参数是`PropertyDescriptor`类型，属性描述符，**可以实现劫持并改写原来的方法的效果**

```js
function upperCase(target: any, propertyKey: string) {
  let value = target[propertyKey];
  const getter = () => value;
  const setter = (newVal: string) => {
    if (delete target[propertyKey]) {
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    }
  };
}
function staticDecorator(target: any, propertyKey: string) {}
function toNumber(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let oldMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    args = args.map((item) => parseFloat(item));
    return oldMethod.apply(this, args);
  };
}
class Person {
  @upperCase name: string = "name";
  @staticDecorator static age: number = 10;
  @toNumber
  sum(...args: any[]) {}
}
```

- 参数装饰器，**可以通过劫持方法和参数达到改写方法参数的效果**

```js
// 类似 IOC，
// 接收三个参数 target 构造函数，methodName 方法名，paramIndex 参数索引
function addAge(target: any, methodName: string, paramIndex: number) {
  // todo
}
class Person {
  age: number;
  login(name: string, @addAge password: string) {}
}
```

- 装饰器的执行顺序
  属性装饰器（从上往下） -.-> 方法装饰器（从内往外，先执行参数装饰器，再执行方法装饰器） --> 类装饰器（先执行最靠近类声明的装饰器）

## 命名空间

- 命名空间之间是互相隔离的沙箱
- 命名空间编译后就是一个模块变量作为参数和一个`自执行函数`
- 如果使用 export 语法，可以向外面暴露属性

```js
namespace a{
    export let name = 'name';
}
namespace b{
    console.log(a.name); // "name"
}
```

## 多态、重写、重载

- 多态，同一个方法不同的子类有不同的实现
- 重写，子类继承重写父类方法
- 重载，同名函数的重载（多种参数情况多种实现）

## 接口

- 描述对象的"形状"，一种对象行为的抽象
- 声明多个同名的接口，类型会自动合并
- 一个类可以继承多个接口
- 只读属性类型，`readonly`
- 任意属性类型

```js
interface A{
    readonly id: number;
    name: stirng;
    [key:string]: any; // 属性名是任意字符串（包括数值），值是任意
}
```

- 函数类型接口

```js
interface Discount {
  (price: number): number; // 定义了参数类型，返回值类型
}
const discount: Discount = (price: number): number => {
  return porice * 0.8;
};
```

- 可索引类型接口

```js
interface User {
  [index: number]: string; // 属性名必需是数值，值是字符串
}
let user: User = {
  0: "0",
  1: "1",
  2: "2",
};
```

- 构造函数类型接口，用来装饰构造函数

```js
// 构造函数接口
interface WithNameClass {
  new(name: string): any;
}
// 类名本身就是构造函数
class Animal {
  constructor(name: string) {}
}
let wc: WithNameClass = Animal;
function createClass(clazz: WithNameClass, name: string) {
  return new clazz(name);
}
let a = createClass(Animal, "name");
console.log(a.name); // "name"
```

## 泛型

- 泛型构造函数接口

```js
// 泛型构造函数接口
function factory<T>(type: { new(): T }): T {
  return new type();
}
class A {}
factory < A > A;
```

- 泛型函数接口

```js
// 泛型函数接口
interface Func<T> {
  <U>(a: T, b: T): U;
}
let func: Func<number> = function <U>(a: number, b: number): U {};
```

- 泛型可以写多个

```js
function swap<A, B>(tuple: [A, B]): [B, A] {
  return [tuple[1], tuple[0]];
}
```

- 默认泛型

```js
function func<T = number>() {}
```

- 泛型约束，继承`类`

```js
// 唯一标准就是判断接口形状是否一致
// 自己和自己的孩子才兼容
class GrandFather {
  grandFather: string
}
class Father extends GrandFather {
  father: string;
}
class Child extends Father {
  child: string
}
function get<T extends Father>() {}
get<Father>(); // √
get<Child>(); // √
get<GrandFather>(); // x，GrandFather 没有 father:string 属性 只能是子类型
```

- 泛型约束，继承`联合类型`

```js
interface Func{
    <T extends (number|string)>(a:T,b:T):void
}
let sum:Func = function<T extends (number|string)>(a:T,b:T):void
sum<number>(1,1); // √，number 是 (number|string) 的子类型 
sum<number|string|boolean>(null,null);// ×，类型不兼容
```

> 综上，泛型约束只能使用子类型

- `类型别名`
  - 能使用接口就不要使用泛型类型别名
  - 当需要使用`联合类型或元祖类型`的时候，泛型类型别名更加合适

```js
type Cart<T> = { list: T[] } | T[];
let c1: Cart<number> = [0, 1, 2];
let c2: Cart<string> = { list: ["0"] };
```

## 结构类型系统

- 接口的兼容性

  与自己形状一致的接口都可以兼容，**自己和自己的孩子**，只能接收子类型

- 类的兼容性

  子类实例可以赋值给父类类型，父类实例不能赋值给子类类型（属性 `只能多不能少`）

- 函数的兼容性

  - 参数类型是逆变的，返回值类型是协变的
  - 传参数可以是`自己和自己的父类`，能少不能多
  - 返回值可以是`自己和自己的子类`，能多不能少

- 泛型的兼容性

  - 泛型在判断兼容性的时候会`先判断具体的类型，然后再进行兼容性判断`
  - 接口内容为空没用到泛型的时候是兼容的

  ```js
  interface Empty<T>{}
  let x!:Empty<string>;
  let y!:Empty<number>;
  x=y; // √
  ```

  - 接口内容不为空且使用到泛型的时候是不兼容的

  ```js
  interface Empty<T>{
      data: T
  }
  let x!:Empty<string>;
  let y!:Empty<number>;
  x=y; // ×
  ```

- 数字和枚举是互相兼容的

## 类型保护

- `typeof` - 判断基本数据类型

- `instanceof` - 判断是否为指定类的实例

- `for in` - 判断实例的属性

- `null 保护` - 对于联合类型`string|null`的对象，加 if 语句判断空值，ts 就可以判断此对象非空

- **可辩别的联合类型** - ts 可以通过对象属性具体的值来判断类型；ts 可以通过**对象的属性是否存在（key in obj）**来判断类型

- **自定义类型保护** - 利用 ts 类型谓词（parameterName is Type）语法，
  
  ```js
  interface Bird{
    swing: number
  }
  interface Dog{
    leg: number
  }
  function isBird(x: Bird|Dog):y is Bird{
    return (y as Bird).swing === 2;
  }
  function getAnimal(x: Bird|Dog){
    if(isBird(x)){console.log(x)}else{console.log(x)}
  }
  ```
  
- `unknown` - 是 any 的安全类型，**可以对 unknown 类型的对象进行任意赋值**，但与 any 不同的是，unknown 类型的对象不能调用未知的方法或属性（除非你已经赋过值并且可以明确知道具体的类型）

- **联合类型的 unknown** - 最后都是 unknown

- **交叉类型的 unknown** - 最后都是另外一个类型

- **交叉类型**（子类型）。接口类型&接口类型等于他们的共同孩子；联合类型&联合类型等于他们的共同类型

- **never 是 unknown 的子类型**

- **映射属性** - `interface getType<T> = {[P in keyof T]: number}`

- `keyof unknown 等于 never`

## 类型变换

- **从右向左** - `变量的类型`可以由定义推断，`let foo = 1; // foo 就是 number 类型`

- **底部流出** -` 返回值的类型`可以由`return`语句推断

- **从左向右** - `函数参数类型/返回值类型`可以通过赋值来判断

- **结构化** - `变量的类型`可以由对象字面量的赋值来判断

- **解构** - 推断规则同样适用

- **？可选的类型** - `interface{name?: string} // name 就是联合类型 string|undefined`

- **小心使用返回值类型** - 如果函数的返回值很复杂（比如调用了另外一个函数，它的返回值是 any），返回值类型就不是很确定了

- **交叉类型** - 是`他们的子类型`。对于接口&接口而言，交叉类型就是他们的所有属性之和；对于联合类型而言，交叉类型就是他们的相同类型

- **typeof** - 获取一个变量的类型

- **索引访问操作符** - 获取一个类型的子类型。`interface Persoon{age: number}; // Person['age'] 的类型就是 number`

- **keyof** - 索引类型查询操作符，返回类型的所有属性名

- **映射类型** - 例如将一个接口中的属性都变成可选的，`type Part<T> = {[key in keyof T]?: T[key]}`

- **条件类型** - `type Condition<T, R> = T extends R ? T : R` 
  - 条件类型的分发，**T 如果是 R 的孩子，就返回 T，如果不是就返回 R**
  - 分布式有条件类型，**待检查的类型必须是一个裸类型**，如 [T],R[]...都不合法
  - 联合类型的条件类型分发，`T extends U ? never : T; // 找出 T 中不包含 U 的部分`，`T extends U ? T : nerver; // 找出 T 中包含 U 的部分`
  - `Extract` - 找出 T 中包含 U 的**共同部分**，`T extends U ? T : nerver;`
  - `Exclude` - 找出 T 中不包含 U 的**差异部分**，`T extends U ? never : T;`
  
- **infer** - ts 自带根据 infer 的位置来推断具体的类型
  
  - 推断函数返回值类型
  - 推断函数参数类型
  - 推断类构造函数返回值类型
  - 推断类构造函数参数类型
  - 推断类型属性的子类型，`T extends {name:infer A} ? A : never`
  - 将 tuple 转 union，`T extends Array<infer E> ? E : never`
  - 将联合类型转交叉类型，利用函数参数的逆变的原理（U 类型肯定是 a 和 b 函数的 x 属性的共同 子类型），`T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;`
  
- **内置工具类型** - TS 中内置的一些工具类型

  - `Partial` - 将传入的属性**由必选变为可选**。`type Partial<T> = {[P in keyof T] +? :  T[P]}`

  - `DeepPartial` - **类型递归**。`type DeepPartial<T>={[P in keyof T] +? : T[P] extends object +? DeepPartial<T[P]> : T[P]}`

  - `Required` - 将传入的类型**由可选变成必选**。`type Required<T> = {[P in keyof T] -? : T[P]}`

  - `ReadOnly` - 将传入的属性**转成只读**。`type ReadOnly<T> = {readonly [P in keyof T]: T[P]}`

  - `Pick` - 从传入的属性中**摘取某些项**返回一个新的类型。`type Pick<T, K extends keyof T> = {[P in K]: T[P]}`

    ```typescript
    interface Person{
        name: string;
        age: number;
        married: boolean
    }
    // 从 Person 中摘取'age'和'name'属性，并且返回一个的类型
    type PickNameAndAgeType = Pick<Person, 'age' | 'name'>;
    ```

  - `Record` - 将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型。`type Record<K extends keyof any, T> = {[P in K]: T}` ，如`Record<K, T> => Record<K, U>`

    ```typescript
    keyof any; // 等于联合类型 string | number | symbol
    ```

- **自定义高级类型**

  - `Proxy` - 代理传入的属性。`type Proxify<T> = {[P in keyof T]: Proxy<T[P]>}; type Proxy<T> = {get(): T, set(value: T): void}`

  - `SetDifference` - 找出 T 中不包含 U 的部分，**排除属性**，类似 Exclude。`type SetDifference<T, U> = T extends U ? never : T;`

    ```typescript
    type Type = SetDifference<string | number | boolean, string| number>; // boolean
    ```

  - `Omit` - 找出 T 中的排除某些属性的**剩余属性返回一个新的类型**。`type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>`

    ```typescript
    interface Person{
        name: string;
        age: number;
        married: boolean
    }
    type NoAgeAndNameType = Omit<Person, 'name' | 'age'>
    ```

  - `Diff` - 找出 T 中不包含 U 的**差异属性并返回一个新的类型**。`type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>`

    ```typescript
    type Props = {name: string; age: number; visible: boolean};
    type DefaultProps = {age: number};
    type DiffProps = Diff<Props, DefaultProps>; // {name: string; visible: boolean}
    ```

  - `Intersection` - 找出 T 中包含 U 的**共同属性并返回一个新的类型**。`type Intersection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>`

    ```typescript
    type Props = {name: string; age: number; visible: boolean};
    type DefaultProps = {age: number};
    type IntersectionProps = Intersection<Props, DefaultProps>; // {age: number}
    ```

  - `Override` - 使用 U 的属性**覆盖 T 的相同属性并返回一个新的类型**。`type Override<T extends object, U extends object, I = Diff<T, U> & Intersection<U, T>> = Pick<I, keyof I>`

    ```typescript
    type Props = {name: string; age: number; visible: boolean};
    type DefaultProps = {age: string};
    type OverrideType = Override<Props, DefaultProps>;// {name: string; age: stirng; visible: boolean}
    ```

  - `Compute` - 计算属性，将交叉类型合并。`type Compute<T extends any> = T extends Function ? T : {[K in keyof T]: T[K]}`

  - `Merge` - **合并两个对象的属性**。`type Merge<T extends object, U extends object> = Compute<T & Omit<U, keyof T>> `

    ```typescript
    interface O1{
        id: number;
        age: number;
    }
    interface O2{
        id: number;
        name: string;
    }
    type MergeType = Merge<O1, O2>; // {id: number; age: number; name: string}
    ```

  - `Mutable` - 将传入的属性的`readonly`移除。`type Mutable<T> = {-readonly [K in keyof T] : T[K]}`

## 模块与命名空间

- **模块**
  - **全局模块** - 当你开始一个新的 TS 文件就处于全局命名空间中，这里面定义的变量都属于全局变量
  - **文件模块** - 也称外部模块，当 TS 文件中含有`import`或者`export`时，TS 会在这个文件中创建一个本地的作用域
  - **模块规范** - `AMD` `SystemJS` `ES Module` `commonjs`
  - 通过关键字`Module`声明一个模块，原理就是一个自执行函数，内部可以通过 export 向外导出属性
- **命名空间**
  - 命名空间是内部模块，原理就是一个对象和一个块作用域
  - 命名空间内部可以通过`export`向外导出属性，通过命名空间名称。变量名来调用
  - **相同名称的命名空间的属性会自动合并**
- 不同文件下的同名 Module 模块，不会冲突
- 不同文件下的同名 namespace 命名空间，会冲突

## 类型声明

- 类型声明文件可以让 JS 代码直接兼容到 TS 的系统

- 类型声明在编译的时候会被删除

- 关键字`declare`用来添加各种声明

- 可以使用`declare`+`namespace`来声明包含很多子属性的全局变量，例如扩展 Jquery 的属性

- **类型声明文件**

  - 命名规范为：`*.d.ts`

  - 通过在`tsconfig.json`文件中添加`include`字段来表示去哪个位置查找类型声明文件

    ```json
    {
        "include":[
            "src/**/*", // src 目录下的所有文件夹下的所有文件
            "typings/**/*" // typings 目录下的所有文件夹下的所有文件
        ]
    }
    ```

- **第三方声明文件**

  - `@types/第三方声明的类型库`

  - JS 很多内置对象，已经被 TS 声明好了类型，如`lib.dom.d.ts`等等

  - 引入第三方模块，TS 会自动查找`node_modules/@types/库名/index.d.ts`，或者自己编写声明文件并配置`tsconfig.json`，告诉 TS 去哪里查找声明文件

    ```json
    {
        "compilerOptions": {
            "baseUrl": "./", // 使用 paths 属性的话必须指定 baseUrl 的值
            "paths": {
                "*": ["types/*"]
            }
        }
    }
    ```

  - **npm 声明文件可能的位置**

    - `node_modules/库名/package.json` - `{ "types":"types/xxx.d.ts" }`
    - `node_modules/库名/index.d.ts`
    - `node_modules/@types/库名/index.d.ts`
    - 自定义 `typings/库名/index.d.ts`

- **扩展全局变量的类型**

  - 文件模块没有`export {}`，如使用`interface Stirng`可以扩展全局变量 String 的类型
  - 如果文件模块内部有`export {}`，也可以使用`declare global{...}`来扩展全局变量的类型

- **合并声明**

  - **同名的两个独立声明**会被合并，合并后拥有原先两个声明的特性

  - 同名类型会被合并，可以使用这个特性给一个第三方扩展类型声明

  - 使用`namespace`来扩展类，表示内部类

    ```typescript
    class Form {
      username = '';
      password = '';
    }
    //Item 为 Form 的内部类
    namespace Form {
      export class Item {} // 一定要使用 export
    }
    ```

  - 使用`namespace`来扩展函数

    ```typescript
    function greeting(name: string): string {
        return greeting.words+name;
    }
    namespace greeting {
        export let words = "Hello,";
    }
    ```

  - 使用`namespace`来扩展枚举类型

- 生成声明文件

  ```json
  {
    "compilerOptions": {
       "declaration": true, /* 自动生成 ts 对应的声明文件 '.d.ts' file.*/
    }
  }
  ```

  