export default {}

type Add<A extends number, B extends number, AA extends any[] = [], BB extends any[] = []> = A extends AA["length"] ? (B extends BB["length"] ? [...AA, ...BB]["length"] : Add<A, B, AA, [...BB, '']>) : Add<A, B, [...AA, ''], BB>

type A = Add<1, 2> // 3
type B = Add<0, 0> // 0
