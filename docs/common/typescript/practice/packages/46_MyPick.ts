export default {}

type MyPick<T, K extends keyof T> = { [k in K]: k extends keyof T ? T[k] : never }

type Foo = {
    a: string
    b: number
    c: boolean
}

type A = MyPick<Foo, 'a' | 'b'> // {a: string, b: number}
type B = MyPick<Foo, 'c'> // {c: boolean}
// type C = MyPick<Foo, 'd'> // Error