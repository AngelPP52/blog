export default {}

type MyInstanceType<T extends (new(...args: any[]) => any)> = T extends new(...args: any[]) => infer R ? R : never;

class Foo {}

type A = MyInstanceType<typeof Foo> // Foo
type AA = InstanceType<typeof Foo> // Foo

// type B = MyInstanceType<() => string> // Error