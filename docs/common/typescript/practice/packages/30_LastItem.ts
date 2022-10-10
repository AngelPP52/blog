export default {}

type LastItem<T> = T extends [...infer L, infer R] ? R : never

type A = LastItem<[string, number, boolean]> // boolean
type B = LastItem<['B', 'F', 'E']> // 'E'
type C = LastItem<[]> // never