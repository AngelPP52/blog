export default {}

type Foo = (a: string, b: number, c: boolean) => string

type MyParameters<T extends (...args: any) => any> = T extends (...args: infer R) => any ? R : any

type A = MyParameters<Foo> // [a:string, b: number, c:boolean]
type B = A[0] // string
// type C = MyParameters<{ a: string }> // Error