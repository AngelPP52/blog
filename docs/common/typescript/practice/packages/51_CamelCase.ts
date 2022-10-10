// import {SplitString} from "./52_SplitString";

export default {}

/*type UppercaseFst<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T
type CamelCaseIterator<T, Ret extends string = ''> = T extends [infer L, ...infer R] ? (L extends string ? CamelCaseIterator<R, `${Ret}${UppercaseFst<L>}`> : never) : Ret
export type CamelCase<T> = CamelCaseIterator<SplitString<T, '-'>>*/

export type CamelCase<T extends string, Prev extends string = ''> =
    T extends `${infer L}-${infer R1}${infer R2}` ?
        CamelCase<R2, `${Prev}${L}${Uppercase<R1>}`> :
        Capitalize<`${Prev}${T}`>

type a1 = CamelCase<'handle-open-flag'>         // HandleOpenFlag
type a2 = CamelCase<'open-flag'>                // OpenFlag
