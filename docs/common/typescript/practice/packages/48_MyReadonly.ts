export default {}

type MyReadonly<T> = { readonly [k in keyof T]: T[k] }

type Foo = {a?: string, b?: number, c?: boolean};

const a: Foo = {
    a: 'BFE.dev',
}
a.a = 'bigfrontend.dev'
// OK

const b: MyReadonly<Foo> = {
    a: 'BFE.dev'
}
// b.a = 'bigfrontend.dev'
// Error