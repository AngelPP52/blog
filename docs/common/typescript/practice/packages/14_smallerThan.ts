export default {}

type SmallerThan<T extends number, K extends number, TT extends any[] = [], KK extends any[] = []> =
    T extends TT["length"] ? (K extends KK["length"] ? false/*相等*/ : true/*大于*/) : (K extends KK["length"] ? false/*小于*/ : SmallerThan<T, K, [...TT, ''], [...KK, '']>)

type A = SmallerThan<0, 1> // true
type B = SmallerThan<1, 0> // false
type C = SmallerThan<10, 9> // false
