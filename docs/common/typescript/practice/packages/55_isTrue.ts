import { IsAny } from './18_isAny';

export default {};

export type isTrue<T> = IsAny<T> extends true
  ? false
  : [T] extends [true]
  ? [T] extends [true]
    ? true
    : false
  : false;

type a1 = isTrue<true>; // true
type a2 = isTrue<any>; // false
type a3 = isTrue<false>; // false
type a4 = isTrue<boolean>; // false
type a5 = isTrue<never>; // false
type a6 = isTrue<null>; // false
type a7 = isTrue<unknown>; // false
type a8 = isTrue<{}>; // false
type a9 = isTrue<object>; // false

let a = [1] as [never];
let b:[true];
// a = b; 报错
b = a;
