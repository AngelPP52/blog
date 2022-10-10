export default {};

// 使用 [T] 避免传入的是联合类型导致类型分布
// unknown 只能赋值给 any 或者 unknown
// any 可以赋值给 string，但是 unknown 不可以赋值给 string
export type IsAny<T> = [unknown] extends [T] ? ([T] extends [string] ? true : false) : false;

type A = IsAny<string>; // false
type B = IsAny<any>; // true
type C = IsAny<unknown>; // false
type D = IsAny<never>; // false

let a:unknown;
let b:string = '';
a = b;
// b = a; 报错
