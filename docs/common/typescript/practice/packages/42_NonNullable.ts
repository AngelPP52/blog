export default {}

type Foo = 'a' | 'b' | null | undefined

type MyNonNullable<T> = T extends null ? never : T extends undefined ? never : T

type A = MyNonNullable<Foo> // 'a' | 'b'