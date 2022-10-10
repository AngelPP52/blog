export default {}

type ToNumber<T, K extends any[] = []> = T extends `${K["length"]}` ? K["length"] : ToNumber<T, [...K, '']>

type A = ToNumber<'1'> // 1
type B = ToNumber<'40'> // 40
type C = ToNumber<'0'> // 0
