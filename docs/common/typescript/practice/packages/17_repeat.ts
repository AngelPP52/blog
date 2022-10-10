export default {}

type Repeat<T, K, TT extends any[] = []> = TT["length"] extends K ? TT : Repeat<T, K, [...TT, T]>

type A = Repeat<number, 3> // [number, number, number]
type B = Repeat<string, 2> // [string, string]
type C = Repeat<1, 1> // [1, 1]
type D = Repeat<0, 0> // []
