export default {}

type Trim<T> = T extends ` ${infer R}` ? Trim<R> : T extends `${infer L} ` ? Trim<L> : T;

type A = Trim<'    BFE.dev'> // 'BFE'
type B = Trim<' BFE. dev  '> // 'BFE. dev'
type C = Trim<'  BFE .   dev  '> // 'BFE .   dev'
type D = Trim<'    BFE.dev'> // 'BFE .   dev'

const a: A = 'BFE.dev'
const b: B = 'BFE. dev'
const c: C = 'BFE .   dev'
const d: D = 'BFE.dev'

