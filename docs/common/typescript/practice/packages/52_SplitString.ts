export default {};

/*export type SplitString<Str, Separator extends string, Ret extends any[] = []> = Str extends '' ? Ret : (Str extends `${infer L}${Separator}${infer R}` ? SplitString<R, Separator, [...Ret, L]> : [...Ret, Str])*/
export type SplitString<T, S extends string, A extends any[] = []> = T extends `${infer L}${S}${infer R}`
  ? SplitString<R, S, [...A, L]>
  : [...A, T];

type A1 = SplitString<'handle-open-flag', '-'>; // ["handle", "open", "flag"]
type A2 = SplitString<'open-flag', '-'>; // ["open", "flag"]
type A3 = SplitString<'handle.open.flag', '.'>; // ["handle", "open", "flag"]
type A4 = SplitString<'open.flag', '.'>; // ["open", "flag"]
type A5 = SplitString<'open.flag', '-'>; // ["open.flag"]
