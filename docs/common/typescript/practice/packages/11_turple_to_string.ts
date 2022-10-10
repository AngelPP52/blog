export default {};

type TupleToString<T, Prev extends string = ''> = T extends [infer L, ...infer R]
  ? L extends `${infer LL}`
    ? TupleToString<R, `${Prev}${LL}`>
    : ''
  : Prev;

type A = TupleToString<['a', 'b', 'c']>; // 'abc'
type B = TupleToString<[]>; // ''
type C = TupleToString<['a']>; // 'a'
