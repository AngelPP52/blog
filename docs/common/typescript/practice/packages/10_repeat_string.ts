export default {};

/*type TupleToString<T, Prev extends string = ''> = T extends [infer L, ...infer R] ? (L extends `${infer LL}` ? TupleToString<R, `${Prev}${LL}`> : '') : Prev

type Repeat<StringTuple extends string[], Len extends number, Char extends string> = StringTuple["length"] extends Len ? TupleToString<StringTuple> : Repeat<[...StringTuple, Char], Len, Char>
type RepeatString<Str, Len extends number> = Len extends 0 ? '' : (Str extends `${infer S}` ? Repeat<[Str], Len, Str> : never)*/

type RepeatString<T extends string, K, A extends any[] = [], Prev extends string = ''> = K extends A['length']
  ? Prev
  : RepeatString<T, K, [...A, null], `${Prev}${T}`>;

type A = RepeatString<'a', 3>; // 'aaa'
type B = RepeatString<'a', 0>; // ''
type C = RepeatString<'a', 1>; // 'a'
type D = RepeatString<'a', 2>; // 'aa'
