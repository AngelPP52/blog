export default {}

type LargerThan<T extends number, K extends number, TT extends any[] = [], KK extends any[] = []> =
    T extends TT["length"] ? (K extends KK["length"] ? false/*相等*/ : false/*小于*/) : (K extends KK["length"] ? true/*大于*/ : LargerThan<T, K, [...TT, ''], [...KK, '']>)

type A = LargerThan<0, 1> // false
type B = LargerThan<1, 0> // true
type C = LargerThan<10, 9> // true
type D = LargerThan<1, 1> // false
