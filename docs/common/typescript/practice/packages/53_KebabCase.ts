export default {}

/*type KebabCaseIterator<T extends string, TT extends any[] = []> = T extends '' ? TT : (T extends `${infer L}${infer R}` ? KebabCaseIterator<R, [...TT, L extends Uppercase<L> ? `-${Lowercase<L>}` : L]> : never)
type JoinString<T> = T extends [infer L, ...infer R] ? (L extends string ? `${L}${JoinString<R>}` : never) : ''
type RemoveFstSeparator<T> = T extends `-${infer R}` ? R : T
export type KebabCase<T extends string> = RemoveFstSeparator<JoinString<KebabCaseIterator<T>>>;*/

type KebabCase<T, Prev extends string = ''> = T extends `${infer L}${infer R}` ? KebabCase<R, `${Prev}${
L extends Uppercase<L> ? `-${Lowercase<L>}` : L
}`> : (Prev extends `-${infer L}` ? L : Prev)

type a1 = KebabCase<'HandleOpenFlag'>           // handle-open-flag
type a2 = KebabCase<'OpenFlag'>                 // open-flag
