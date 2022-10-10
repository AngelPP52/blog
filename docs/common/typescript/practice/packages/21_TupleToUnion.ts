export default {};

type TupleToUnion<T, TT = never> = T extends [infer L, ...infer R] ? TupleToUnion<R, TT> | L | TT : TT;
// type TupleToUnion<T> = T extends (infer E)[] ? E : never;
// type TupleToUnion<T extends any[]> = T[number]

type Foo = [string, number, boolean];

type Bar = TupleToUnion<Foo>; // string | number | boolean
