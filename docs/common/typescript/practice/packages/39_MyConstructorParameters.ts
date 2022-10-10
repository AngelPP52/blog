export default {}

type MyConstructorParameters<T extends (new(...args: any[]) => any)> = T extends (new(...args: infer A) => any) ? A : never

class Foo {
    constructor(a: string, b: number, c: boolean) {}
}

type C = MyConstructorParameters<typeof Foo>
// [a: string, b: number, c: boolean]