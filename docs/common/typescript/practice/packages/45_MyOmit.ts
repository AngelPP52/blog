export default {}

type MyOmit<T, K extends string | number | symbol> = { [k in Exclude<keyof T, K>]: k extends keyof T ? T[k] : never }

type Foo = {
    a: string
    b: number
    c: boolean
}

type A = MyOmit<Foo, 'a' | 'b'> // {c: boolean}
type B = MyOmit<Foo, 'c'> // {a: string, b: number}
type C = MyOmit<Foo, 'c' | 'd'>  // {a: string, b: number}