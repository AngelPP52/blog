export default {}

type LastChar<T, TT = never> = T extends `` ? TT : T extends `${infer L}${infer R}` ? LastChar<R, L> : never

type A = LastChar<'BFE'> // 'E'
type B = LastChar<'dev'> // 'v'
type C = LastChar<''> // never

type a = '1234567' extends `${infer L}${infer M}${infer R}` ? L : never     //1
type b = '1234567' extends `${infer L}${infer M}${infer R}` ? M : never     //2
type c = '1234567' extends `${infer L}${infer M}${infer R}` ? R : never     //34567
