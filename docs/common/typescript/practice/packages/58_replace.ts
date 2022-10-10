export default {}

type Replace<T extends string, F1 extends string, F2 extends string> = T extends `${infer L}${F1}${infer R}` ? `${L}${F2}${Replace<R, F1, F2>}` : T

type a1 = Replace<'types are fun! it is so fun!', 'fun', 'awesome'> // expected to be 'types are awesome! it is so awesome!'
