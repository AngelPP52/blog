import { isTrue } from './55_isTrue';

export default {};

type IF<T, F1, F2> = isTrue<T> extends true ? F1 : F2;

type a = IF<1 extends 1 | 2 ? true : false, 'aaa', 'bbb'>; // aaa
type b = IF<3 extends 1 | 2 ? true : false, 'aaa', 'bbb'>; // bbb
