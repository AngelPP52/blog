export default {}

type Flat<T> = T extends [...infer M] ? M : [T]
type Push<T, K> = T extends [...infer M] ? [...M, ...Flat<K>] : never

type A = Push<[1, 2, 3], 4> // [2,3]
type B = Push<[1], 2> // [1, 2]
type C = Push<[], string> // [string]

type D = Push<[1, 2, 3], [4, 5]>
type E = Push<[1, 2, 3], [string, number]>
