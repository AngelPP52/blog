export default {}

type Key = 'a' | 'b' | 'c'

type MyRecord<T extends string | number | symbol, K> = { [k in T]: K }

const a: MyRecord<Key, string> = {
    a: 'BFE.dev',
    b: 'BFE.dev',
    c: 'BFE.dev'
}
a.a = 'bigfrontend.dev' // OK
// a.b = 123 // Error
// a.d = 'BFE.dev' // Error
// type Foo = MyRecord<{ a: string }, string> // Error