export default {}

type FirstItem<T> = T extends [infer L, ...infer R] ? L : never

type A = FirstItem<[string, number, boolean]> // string
type B = FirstItem<['B', 'F', 'E']> // 'B'