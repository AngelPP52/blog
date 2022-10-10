export default {}

export type Equal<T, K> = [T] extends [K] ? [K] extends [T] ? (keyof T extends keyof K ? keyof K extends keyof T ? true : false : false) : false : false;
// type Equal<T, K> = T extends K ? K extends T ? (keyof T extends keyof K ? keyof K extends keyof T ? true : false : false) : false : false;

assertTrue<Equal<any, any>>()                       // true
assertFalse<Equal<any, 1>>()                        // false
assertTrue<Equal<never, never>>()                   // true
assertTrue<Equal<'BFE', 'BFE'>>()                   // true
assertFalse<Equal<'BFE', string>>()                 // false
assertTrue<Equal<1 | 2, 2 | 1>>()                   // true
assertTrue<Equal<{ a: number }, { a: number }>>()   // true

type a1 = Equal<any, any>                           // true
type a2 = Equal<any, 1>                             // false
type a3 = Equal<never, never>                       // true
type a4 = Equal<'BFE', 'BFE'>                       // true
type a5 = Equal<'BFE', string>                      // false
type a6 = Equal<1 | 2, 2 | 1>                       // true
type a7 = Equal<{ a: number }, { a: number }>       // true

/*
*  使用 [T] extends [K] ? [K] extends [T]， 而不是直接使用 T extends K ? K extends T，具体原因是因为泛型条件类型前者不会分布，后者会分布
*
*  使用 `keyof T extends keyof K ? keyof K extends keyof T`判断的原因是用来区别 any与其他类型；
*  keyof any 得到的是 string|number|symbol
*  keyof number 得到的是 toString | toFixed | ...
*/

type E1<T, K> = [T] extends [K] ? [K] extends [T] ? 'a' : 'b' : 'c'
type E2<T, K> = T extends K ? (K extends T ? 'a' : 'b') : 'c'

type e1 = E1<1 | 2, 2 | 1>          // a：不会分布
type e2 = E2<1 | 2, 2 | 1>          // a,b：会分布（即使是分布，那也应该是只有a呀？）；可能情况是这样的，在T extends K之后的 K extends T的后面的T，已经是收窄了；
                                    // 第一步：(1 extends 2|1 ? {{1}} : 'c') | (2 extends 2|1 ? {{2}} : 'c')第一步两个都通过了
                                    // 第二步：此时{{1}} 应该是 2|1 extends 1，{{2}} 应该是 2|1 extends 2，两个结果都是 'a'|'b'，所以最后结果是这个

type isExtend<T, K> = T extends K ? 'a' : 'b'
type h1 = isExtend<1 | 2 | 3, 1 | 2 | 4>                    // 是ab
type h2 = 1 | 2 | 3 extends 1 | 2 | 4 ? 'a' : 'b'           // b，难道不是 a,b吗？，由此可见，直接判断确定的类型与通过泛型类型的方式来判断是不一样的，直接类型不会分布，泛型会分布
