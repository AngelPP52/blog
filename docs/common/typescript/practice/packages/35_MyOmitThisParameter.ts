export default {}

function foo(this: { a: string }) {}

// foo() // Error

const bar = foo.bind({a: 'BFE.dev'})
bar() // OK

type MyOmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;

type Foo = (this: { a: string }) => string
type Bar = MyOmitThisParameter<Foo> // () => string