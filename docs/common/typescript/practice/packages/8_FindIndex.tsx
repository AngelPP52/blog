export default {}

type Equal<T, K> = [T] extends [K] ? [K] extends [T] ? (keyof T extends keyof K ? keyof K extends keyof T ? true : false : false) : false : false;

/*倒叙查找，有问题，如果有重复的，得到的index不是第一个出现的index*/
// type FindIndex<T extends any[], K> = T extends [...infer left, infer last] ? Equal<K, last> extends true ? left["length"] : FindIndex<left, K> : never

/*顺序查找*/
export type FindIndex<T extends any[], K, TT extends any[] = []> = T extends [infer L, ...infer R] ? (Equal<L, K> extends true ? TT["length"] : FindIndex<R, K, [...TT, L]>) : never

type index1 = FindIndex<[1, string, 2, 3, 5], string>
type index2 = FindIndex<[1, 2, string, 3, 5], string>
type index3 = FindIndex<[1, 2, 3, string, 5], string>
type index4 = FindIndex<[1, 2, 3, 5, string], string>

type index5 = FindIndex<[any, never, 1, '2', true, true], true>
type index6 = FindIndex<[any, never, 1, '2', false, false], true>
