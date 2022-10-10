export default {}

type Foo = () => { a: string }

type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any) => infer R ? R : never

type A = MyReturnType<Foo> // {a: string}