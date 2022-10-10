export default {}

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types

// 实现类型 UnionToIntersection，用来将联合类型转换为交叉类型
type UnionToIntersection<T> = (T extends any ? ((t: T) => void) : never) extends ((r: infer R) => any) ? R : never

/*
(T extends any ? ((t: T) => void) : never) 会返回多个函数联合，组成的一个类型；
每一个函数的参数类型是联合类型T中的某一项，比如这里的结果就是：
type fun1 = ((t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void)
同一类型变量在反向变量位置的多个候选变量会导致推断交叉点类型，于是类型就变成了 {a:string}&{b:string}&{c:string}
*/
type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }> // {a: string} & {b: string} & {c: string}


// 步骤拆开来，就有问题，还是推导为联合类型
type Step1<T> = (T extends any ? ((t: T) => void) : never)

type val1 = Step1<{ a: string } | { b: string } | { c: string }>
// type val1 = ((t: {     a: string; }) => void) | ((t: {     b: string; }) => void) | ((t: {     c: string; }) => void)
// 这里 val1 实际上是 (t:{a:string}|{b:string}|{c:string})=>void

// val1 以及 (t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void) 在走Step2的时候不会分布，因为当前实际类型是 (t:{a:string}|{b:string}|{c:string})=>void
// 是确定的类型，只是参数类型是不确定的联合类型；
type Step2<T> = T extends ((r: infer R) => any) ? R : never
type val2 = Step2<val1>
type val3 = Step2<((t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void)>
