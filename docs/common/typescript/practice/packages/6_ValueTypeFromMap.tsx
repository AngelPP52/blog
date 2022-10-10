export default {}

// 获取一个map中所有值的类型

type ValueTypeFromMap<T> = { [k in keyof T]: T[k] }[keyof T]

type a = ValueTypeFromMap<{ name: string, age: number, flag?: boolean }>
// string|number|boolean|undefined
