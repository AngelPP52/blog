export default {}

type Slice<A extends any[],
    S extends number,
    E extends number = A["length"],
    Prev extends any[] = [],
    SA extends any[] = [],
    EA extends any[] = [],
    > = A extends [infer First, ...infer Rest] ? (
    SA["length"] extends S ?
        (EA["length"] extends E ? [...Prev, First] : Slice<Rest, S, E, [...Prev, First], SA, [...EA, null]>) :
        Slice<Rest, S, E, Prev, [...SA, null], [...EA, null]>
    ) : Prev

type A1 = Slice<[any, never, 1, '2', true, boolean], 0, 2>          // [any,never,1]                    从第0个位置开始，保留到第2个位置的元素类型
type A2 = Slice<[any, never, 1, '2', true, boolean], 1, 3>          // [never,1,'2']                    从第1个位置开始，保留到第3个位置的元素类型
type A3 = Slice<[any, never, 1, '2', true, boolean], 1, 2>          // [never,1]                        从第1个位置开始，保留到第2个位置的元素类型
type A4 = Slice<[any, never, 1, '2', true, boolean], 2>             // [1,'2',true,boolean]             从第2个位置开始，保留后面所有元素类型
type A5 = Slice<[any], 2>                                           // []                               从第2个位置开始，保留后面所有元素类型
type A6 = Slice<[], 0>                                              // []                               从第0个位置开始，保留后面所有元素类型
