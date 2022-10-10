export default {}

function Foo(this: { a: string }) {}

function Bar() {}

type MyThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown

type A = MyThisParameterType<typeof Foo> // {a: string}
type B = MyThisParameterType<typeof Bar> // unknown