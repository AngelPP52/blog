export default {}

interface Module {
    count: number;
    message: string;

    asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;

    syncMethod<T, U>(action: Action<T>): Action<U>;
}

type Result = {
    asyncMethod<T, U>(input: T): Action<U>;
    syncMethod<T, U>(action: T): Action<U>;
}

interface Action<T> {
    payload?: T;
    type: string;
}

type InferConnectFunctionParameterType<Func> =
    Func extends <T, U>(input: Promise<T>) => Promise<Action<U>> ? <T, U>(input: T) => Action<U> :
        Func extends (<T, U>(input: Action<T>) => Action<U>) ? (<T, U>(input: T) => Action<U>) : never

type Connect<T, M extends string = { [k in keyof T]: k extends string ? T[k] extends Function ? k : never : never }[keyof T]> = {
    [k in M]: k extends keyof T ? InferConnectFunctionParameterType<T[k]> : never
}

type Result2 = Connect<Module>
