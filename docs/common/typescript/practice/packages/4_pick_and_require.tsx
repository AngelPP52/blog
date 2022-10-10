export default {}

// 将联合类型转换为交叉类型
/*type Union2Interception<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type PickAndRequired<T,
    K extends keyof T,
    O extends T = { [k in keyof T]-?: T[k] },
    > =
    Union2Interception<K extends keyof O ? { [k in K]: O[k] } : never>*/

type PickAndRequired<T, K extends string> = {
    [k in K]: k extends keyof T ? Exclude<T[k], undefined> : never
}

type yyyy = PickAndRequired<{ name?: string, age?: number, flag?: boolean, id: object }, 'name' | 'flag' | 'id'>
// type yyyy = {name:string, age:number, id:object}
