---
title: 练习 3
group:
  title: TypeScript
  path: /typescript
---

# 2021-12-05

本次练习的主要内容是联合类型以及对象类型；


# 1、OptionalKeys

获取对象类型中的可选属性的联合类型

```TypeScript
type a1 = OptionalKeys<{ foo: number | undefined, bar?: string, flag: boolean }>        // bar
type a2 = OptionalKeys<{ foo: number, bar?: string }>                                   // bar
type a3 = OptionalKeys<{ foo: number, flag: boolean }>                                  // never
type a4 = OptionalKeys<{ foo?: number, flag?: boolean }>                                // foo|flag
type a5 = OptionalKeys<{}>                                                              // never
```


# 2、PickOptional

保留一个对象中的可选属性类型

```TypeScript
type a1 = PickOptional<{ foo: number | undefined, bar?: string, flag: boolean }>        // {bar?:string|undefined}
type a2 = PickOptional<{ foo: number, bar?: string }>                                   // {bar?:string}
type a3 = PickOptional<{ foo: number, flag: boolean }>                                  // {}
type a4 = PickOptional<{ foo?: number, flag?: boolean }>                                // {foo?:number,flag?:boolean}
type a5 = PickOptional<{}>                                                              // {}
```


# 3、RequiredKeys

获取对象类型中的必须属性的联合类型

```TypeScript
type a1 = RequiredKeys<{ foo: number | undefined, bar?: string, flag: boolean }>        // foo|flag
type a2 = RequiredKeys<{ foo: number, bar?: string }>                                   // foo
type a3 = RequiredKeys<{ foo: number, flag: boolean }>                                  // foo|flag
type a4 = RequiredKeys<{ foo?: number, flag?: boolean }>                                // never
type a5 = RequiredKeys<{}>                                                              // never
```


# 4、PickRequired

保留一个对象中的必须属性

```TypeScript
type a1 = PickRequired<{ foo: number | undefined, bar?: string, flag: boolean }>        // {foo:number|undefined,flag:boolean}
type a2 = PickRequired<{ foo: number, bar?: string }>                                   // {foo:number}
type a3 = PickRequired<{ foo: number, flag: boolean }>                                  // {foo:number,flag:boolean}
type a4 = PickRequired<{ foo?: number, flag?: boolean }>                                // {}
type a5 = PickRequired<{}>                                                              // {}
```


# 5、Merge

合并两个对象类型T以及K，如果属性重复，则以K中属性类型为准；

```TypeScript
type obj1 = {
    el: string,
    age: number
}

type obj2 = {
    el: HTMLElement,
    flag: boolean
}

type obj3 = Merge<obj1, obj2>   // {el:HtmlElement,age:number,flag:boolean}

const a = {...{} as obj3}
console.log(a.el.scrollTop, a.age.toFixed(0), a.flag.valueOf())
// console.log(a.el.charAt(0))     // error
```


# 6、IsNever

判断是否为never类型

```TypeScript
type A = IsNever<never> // true
type B = IsNever<string> // false
type C = IsNever<undefined> // false
type D = IsNever<any> // false
```


# 7、IsEmptyType

判断是否为没有属性的对象类型{}

```TypeScript
type A = IsEmptyType<string> // false
type B = IsEmptyType<{ a: 3 }> // false
type C = IsEmptyType<{}> // true
type D = IsEmptyType<any> // false
type E = IsEmptyType<object> // false
type F = IsEmptyType<Object> // false
type G = IsEmptyType<unknown> // false
```


# 8、IsAny

判断是否为any类型

```TypeScript
type A = IsAny<string> // false
type B = IsAny<any> // true
type C = IsAny<unknown> // false
type D = IsAny<never> // false
```


# 9、Redux Connect

实现Connect类型，能够自动地转化Redux Module对象中的函数类型

```TypeScript
interface Module {
    count: number;
    message: string;

    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;

    syncMethod<T, U>(action: Action<T>): Action<U>;
}

interface Action<T> {
    payload?: T;
    type: string;
}

// 这个要求的结果
type Result = {
    asyncMethod<T, U>(input: T): Action<U>;
    syncMethod<T, U>(action: T): Action<U>;
}

// 实现类型Connect，要求 Connect<Module> 的结果为上面的 Result
// 只要函数类型的属性；
// 如果函数是异步函数，要求自动解析出来Promise中的类型；
```


# 10、UnionToBooleanProps<T>

有且只有一个属性

```tsx | pure
// 实现一个叫做 UnionToBooleanProps 的泛型，使得以下需求成立

type MessageStringType = "info" | "success" | "warning" | "error";
type OneMessageTypes = UnionToBooleanProps<MessageStringType>
type Props = OneMessageTypes & { id: string; }
function Component(props: Props) {
    return <></>
}

const a = <Component id="abc" info/>           //correct
const b = <Component id="abc" success/>        //correct
const c = <Component id="abc"/>                //wrong
const d = <Component id="abc" info success/>   //wrong

// 组件Component所接收的属性，有且只有一个 "info" | "success" | "warning" | "error" 中的值；
```


# 11、UnionToIntersection<T>

将联合类型转换为交叉类型

```TypeScript
type A = UnionToIntersection<{a: string} | {b: string} | {c: string}> 
// {a: string} & {b: string} & {c: string}
```


# 12、UnionPop

取出来联合类型中的任意一个类型

```TypeScript
type a = 1 | 2 | 3
type b = UnionPop<a>;       // 3
```


# 13、UnionToTuple

联合类型转换为元组类型

```TypeScript
type a = UnionToTuple<1 | 2 | 3>                      // [1,2,3]
type b = UnionToTuple<1 | string | boolean>           // [1,string,boolean]
type c = UnionToTuple<any>                            // [any]

type Q1 = UnionToTuple<string | number | symbol>                                // [symbol,number,string]
type Q2 = UnionToTuple<string | number | symbol | boolean>                      // [boolean,symbol,number,string]
type Q3 = UnionToTuple<string | number | symbol | boolean | [boolean]>          // [boolean,[boolean],symbol,number,string]
```
