export default {}

type StringToTuple<T extends string, TT extends any[] = []> = T extends '' ? TT : T extends `${infer L}${infer R}` ? StringToTuple<R, [...TT, L]> : never

type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<''> // []