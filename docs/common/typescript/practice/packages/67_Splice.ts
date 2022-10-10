export default {}

type Splice<A extends any[],
    S extends number,
    L extends number,
    R extends any[] = [],
    Prev extends any[] = [],
    SA extends any[] = [],
    DA extends any[] = [],
    > =
    A extends [infer First, ...infer Rest] ?
        (SA["length"] extends S ?
            (DA["length"] extends L ? [...Prev, ...R, ...A] : Splice<Rest, S, L, R, Prev, SA, [...DA, null]>)
            : Splice<Rest, S, L, R, [...Prev, First], [...SA, null], DA>)
        : Prev


type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>                   // [boolean,null,undefined,never]               从第0开始删除，删除2个元素
type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>                   // [string,undefined,never]                     从第1开始删除，删除3个元素
type A3 = Splice<[string, number, boolean, null, undefined, never], 1, 2, [1, 2, 3]>        // [string,1,2,3,null,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3
