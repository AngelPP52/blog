---
title: 练习 4
group:
  title: TypeScript
  path: /typescript
---

# 一、实现组件继承属性类型

- 实现类型 `ComponentType<Option>` 以及函数 `createComponent` 的类型定义（无需实现功能）
- 使得函数 createComponent 能够创建一个 React 组件，支持设置三个属性值：props 属性，emits 事件以及 inherit 继承组件，具体要求看使用代码；
- 先做的简单一点，组件所有属性都是可选属性 (props,emits 以及继承的属性都是可选的)。
- 提示：先完整看一遍题目再开始实现功能；

```tsx | pure
function createComponent<Option extends ComponentOption>(option: Option): { (props: ComponentType<Option>): any } {return {} as any}

// 基于 button 标签封装的组件，覆盖 title 属性以及 onClick 事件类型
const Button = createComponent({
    inherit: "button",                              // 继承 button 标签所有属性以及事件
    props: {
        // 基础类型的属性
        label: String,
        width: Number,
        loading: Boolean,
        block: [Boolean, Number],                   // 联合属性类型：block: boolean|number
        title: Number,                              // 覆盖 button 的属性类型 title:string -> title:number
    },
    emits: {
        'show-change': (len: number) => {},         // 自定义的事件类型
        click: (name: string) => {},                // 覆盖 button 的 click 事件类型
    },
})

console.log(
    /*
    *  要求：
    *  1. 属性类型为 {label?:string, width?:number, loading?: boolean, block?:boolean|number, title?:number}
    *  2. 事件类型为：{onShowChange?:(len:number)=>void, onClick?:(name:string)=>void}
    *  3. 能够继承 button 的所有属性以及事件
    */
    <Button
        label={""}
        width={100}
        title={111}
        onShowChange={len => {
            console.log(len.toFixed(0))     // 不允许有隐式的 any 类型，这里即使没有定义 len 的类型，len 也应该能够自动推断出来为 number 类型
        }}
        onClick={e => {
            console.log(e.charAt(0))
        }}
    />
)

// 基于 Button 组件封装的组件，覆盖 label 属性以及 show-change，click 事件类型
const ProButton = createComponent({
    inherit: Button,                                // 继承 Button 所有属性以及事件
    props: {
        // 基础类型数据推断
        proLabel: String,
        label: [String, Number],                    // 覆盖 Button 的 label 属性类型：label:string -> label:string|number
    },
    emits: {
        'show-change': (el: HTMLButtonElement) => {},// 覆盖的事件类型
        click: (el: HTMLButtonElement) => {},       // 覆盖的事件类型
        'make-pro': () => {},                       // 自定义事件类型
    },
})

console.log(
    /*
    *  要求：
    *  1. 属性类型为 {proLabel?:string, label?:string|number}
    *  2. 事件类型为：{onShowChange?:(el: HTMLButtonElement)=>void, onClick?:(el: HTMLButtonElement)=>void, onMakePro?:()=>void}
    *  3. 继承 Button 组件所有的属性以及事件
    */
    <ProButton
        label={111}
        onShowChange={e => {
            console.log(e.offsetWidth)                  // 不允许有隐式的 any 类型，这里即使没有定义 len 的类型，len 也应该能够自动推断出来为 number 类型
        }}
        onClick={e => {
            console.log(e.offsetWidth)
        }}
        onMakePro={() => {}}
    />
)
```

**提示，如何得到 button 标签的属性类型**

- 在文件：node_modules/@types/react/index.d.ts 中寻找 JSX.IntrinsicElements
- 比如 div 标签的属性类型为 JSX.IntrinsicElements["div"]

```tsx | pure
const MyDiv = (props: JSX.IntrinsicElements["div"]) => null
console.log(<>
    <div contentEditable={true} aria-label="div text"/>
    <MyDiv contentEditable={true} aria-label="div text"/>
</>)
```

# 二、(React) 实现 Hook 函数 useAsyncMethods

- React 同学专属题目，Vue 同学请看第三题；
- 使用 hook 函数以及 hook 组件实现，如果可以的话尽量不要使用 class 组件；
- useAsyncMethods 函数是一个 hook 函数，接收两个参数：(methods:Record<string, SimpleMethod>,alone?:boolean)
- SimpleMethod 类型 `interface SimpleMethod {(...args: any[]): any}`
- 返回值类型为一个对象，这个对象的类型与参数 methods 一致，不过会多出来一个属性 loading；loading 是一个对象，对象的 key 类型为 methods 中的 key，除此之外还多了一个 key，叫做 global，loading 对象所有属性值类型都是布尔值；这些属性的作用如下所示：
    - 比如 `const methods = useAsyncMethods({fun1:(val:string)=>{},fun2:(val:number)=>{}})`
    - `methods.fun1` 与定义的时候的类型一致，只不过返回值一定是 Promise 的包装类型，不管原始的 fun1 是否为异步函数；
    - `methods.fun2` 也是一样，与定义的时候的类型一致；
    - `methods.loading.fun1` 可以用来判断 fun1 是否执行完毕，同理 `methods.loading.fun2`也是；
    - `methods.loading.global` 任意一个函数没有执行完，这个值就是 true，所有函数执行完毕之后，这个值就是 false；
- 当`methods.fun1`没有执行完毕时，再次调用该函数无效，也就是在没有结束之前不会执行定义的时候的 fun1 函数；
- 当设置了 alone 参数为 true 的时候，只有当所有函数执行完毕之后才能执行下一个函数；也就是说，alone 为 false 的时候，函数执行只跟自己是互斥的，fun1 执行完之后才能再次执行 fun1；与 fun2 无关；当设置了 alone 为 true 的时候，所有函数都是互斥的，fun1 执行完之后才能执行 fun1，fun2；

## 示例效果页面

- http://martsforever-demo.gitee.io/template-plain-react-micro-base/
- 子应用 -> React 子应用 -> 测试 createAsyncMethods 按钮
- 目前有四个按钮，每个按钮对应一个异步函数执行；
- 每个异步函数都会有一个 state，是个数字类型的 count，异步函数执行完之后 count 会加一；

## 用来测试的示例代码

```tsx | pure
import React, {useState} from "react";
import {randomDelay, useAsyncMethods} from "@/pages/message/useAsyncMethods";
import {Button, Spin} from "antd";

const Demo1 = () => {

    const [method1, setMethod1] = useState(0)
    const [method2, setMethod2] = useState(0)
    const [method3, setMethod3] = useState(0)
    const [togetherMethod2and3, setTogetherMethod2and3] = useState(0)

    const methods = useAsyncMethods({
        method1: async (id: string) => {
            console.log('任务一开始')
            await randomDelay(1000, 3000)
            console.log('任务一结束')
            setMethod1(val => val + 1)
        },
        method2: async (start: number, end: number) => {
            console.log('任务二开始')
            await randomDelay(1000, 2000)
            console.log('任务二结束')
            setMethod2(val => val + 1)
            return start + end
        },
        method3: async (result: any) => {
            console.log('任务三开始', {result})
            await randomDelay(2000, 3000)
            console.log('任务三结束')
            setMethod3(val => val + 1)
        },
        togetherMethod2and3: async () => {
            console.log('任务四开始')
            // const ret = await methods.method2()                   // 错误，缺少必须参数 start 以及 end
            const ret = await methods.method2(2, 3)
            // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
            await methods.method3(ret.toFixed(2))
            console.log('任务四结束')
            setTogetherMethod2and3(val => val + 1)
        },
    })

    return <>
        <div style={{backgroundColor: 'white', padding: '20px'}}>
            <h1>测试 createAsyncMethods</h1>
            <h3>允许多个不同的异步同时执行，但是同一个异步函数不能同时执行多个，必须在函数执行完毕之后，才能开始再次执行该异步函数</h3>
            <Button.Group>
                <Button onClick={() => methods.method1('__')}>
                    <span>一号异步任务 ({method1})</span>
                    {!!methods.loading.method1 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method2(0, 1)}>
                    <span>二号异步任务 ({method2})</span>
                    {!!methods.loading.method2 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method3('?')}>
                    <span>三号异步任务 ({method3})</span>
                    {!!methods.loading.method3 && <Spin/>}
                </Button>
                <Button onClick={() => methods.togetherMethod2and3()}>
                    <span>四号异步任务 ({togetherMethod2and3})</span>
                    {!!methods.loading.togetherMethod2and3 && <Spin/>}
                </Button>
            </Button.Group>
        </div>
    </>
}


const Demo2 = () => {

    const [method1, setMethod1] = useState(0)
    const [method2, setMethod2] = useState(0)
    const [method3, setMethod3] = useState(0)
    const [togetherMethod2and3, setTogetherMethod2and3] = useState(0)

    const methods = useAsyncMethods((() => {
        const m = {
            method1: async (id: string) => {
                console.log('任务一开始')
                await randomDelay(1000, 3000)
                console.log('任务一结束')
                setMethod1(val => val + 1)
            },
            method2: async (start: number, end: number) => {
                console.log('任务二开始')
                await randomDelay(1000, 2000)
                console.log('任务二结束')
                setMethod2(val => val + 1)
                return start + end
            },
            method3: async (result: any) => {
                console.log('任务三开始', {result})
                await randomDelay(2000, 3000)
                console.log('任务三结束')
                setMethod3(val => val + 1)
            },
            togetherMethod2and3: async () => {
                console.log('任务四开始')
                // const ret = await methods.method2()                   // 错误，缺少必须参数 start 以及 end
                const ret = await m.method2(2, 3)
                // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
                await m.method3(ret.toFixed(2))
                console.log('任务四结束')
                setTogetherMethod2and3(val => val + 1)
            },
        }
        return m
    })(), true)

    return <>
        <div style={{backgroundColor: 'white', padding: '20px'}}>
            <h3>无论是否为同一个异步函数，同一时刻仅能够有一个异步函数在执行</h3>
            <Button.Group>
                <Button onClick={() => methods.method1('__')}>
                    <span>一号异步任务 ({method1})</span>
                    {!!methods.loading.method1 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method2(0, 1)}>
                    <span>二号异步任务 ({method2})</span>
                    {!!methods.loading.method2 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method3('?')}>
                    <span>三号异步任务 ({method3})</span>
                    {!!methods.loading.method3 && <Spin/>}
                </Button>
                <Button onClick={() => methods.togetherMethod2and3()}>
                    <span>四号异步任务 ({togetherMethod2and3})</span>
                    {!!methods.loading.togetherMethod2and3 && <Spin/>}
                </Button>
            </Button.Group>
        </div>
    </>
}

export default () => {

    return <>
        <Demo1/>
        <Demo2/>
    </>
}
```

## 问题

Demo2 中的 useAsyncMethods 为什么要这样创建；

# 三、(Vue3.0) 实现 Composition 函数 createAsyncMethods

- Vue3.0 同学专属题目，React 同学请看第二题
- 使用 reactive api 实现
- createAsyncMethods 函数是一个普通函数，接收两个参数：(methods:Record<string, SimpleMethod>,alone?:boolean)
- SimpleMethod 类型 `interface SimpleMethod {(...args: any[]): any}`
- 返回值类型为一个对象，这个对象的类型与参数 methods 一致，不过会多出来一个属性 loading；loading 是一个对象，对象的 key 类型为 methods 中的 key，除此之外还多了一个 key，叫做 global，loading 对象所有属性值类型都是布尔值；这些属性的作用如下所示：
    - 比如 `const methods = createAsyncMethods({fun1:(val:string)=>{},fun2:(val:number)=>{}})`
    - `methods.fun1` 与定义的时候的类型一致，只不过返回值一定是 Promise 的包装类型，不管原始的 fun1 是否为异步函数；
    - `methods.fun2` 也是一样，与定义的时候的类型一致；
    - `methods.loading.fun1` 可以用来判断 fun1 是否执行完毕，同理 `methods.loading.fun2`也是；
    - `methods.loading.global` 任意一个函数没有执行完，这个值就是 true，所有函数执行完毕之后，这个值就是 false；
- 当`methods.fun1`没有执行完毕时，再次调用该函数无效，也就是在没有结束之前不会执行定义的时候的 fun1 函数；
- 当设置了 alone 参数为 true 的时候，只有当所有函数执行完毕之后才能执行下一个函数；也就是说，alone 为 false 的时候，函数执行只跟自己是互斥的，fun1 执行完之后才能再次执行 fun1；与 fun2 无关；当设置了 alone 为 true 的时候，所有函数都是互斥的，fun1 执行完之后才能执行 fun1，fun2；

## 示例效果页面

- http://martsforever-demo.gitee.io/template-plain-react-micro-base
- 子应用 -> Vue 子应用 -> 测试 createAsyncMethods 按钮
- 目前有四个按钮，每个按钮对应一个异步函数执行；
- 每个异步函数都会有一个 state，是个数字类型的 count，异步函数执行完之后 count 会加一；

## 用来测试的示例代码

```html

<template>
    <div style="background-color: white;padding: 20px 10px">
        <h1>测试 createAsyncMethods</h1>
        <h3>允许多个不同的异步同时执行，但是同一个异步函数不能同时执行多个，必须在函数执行完毕之后，才能开始再次执行该异步函数</h3>
        <el-button @click="methods.method1">
            <span>一号异步任务 ({{ state.method1 }})</span>
            <el-icon class="is-loading" v-if="methods.loading.method1">
                <Loading/>
            </el-icon>
        </el-button>
        <el-button @click="methods.method2">
            <span>二号异步任务 ({{ state.method2 }})</span>
            <el-icon class="is-loading" v-if="methods.loading.method2">
                <Loading/>
            </el-icon>
        </el-button>
        <el-button @click="methods.method3">
            <span>三号异步任务 ({{ state.method3 }})</span>
            <el-icon class="is-loading" v-if="methods.loading.method3">
                <Loading/>
            </el-icon>
        </el-button>
        <el-button @click="methods.togetherMethod2and3">
            <span>四号异步任务 ({{ state.togetherMethod2and3 }})</span>
            <el-icon class="is-loading" v-if="methods.loading.togetherMethod2and3">
                <Loading/>
            </el-icon>
        </el-button>

        <h3>无论是否为同一个异步函数，同一时刻仅能够有一个异步函数在执行</h3>
        <el-button @click="methods2.method1">
            <span>一号异步任务 ({{ state2.method1 }})</span>
            <el-icon class="is-loading" v-if="methods2.loading.method1">
                <Loading/>
            </el-icon>
        </el-button>
        <el-button @click="methods2.method2">
            <span>二号异步任务 ({{ state2.method2 }})</span>
            <el-icon class="is-loading" v-if="methods2.loading.method2">
                <Loading/>
            </el-icon>
        </el-button>
        <el-button @click="methods2.method3">
            <span>三号异步任务 ({{ state2.method3 }})</span>
            <el-icon class="is-loading" v-if="methods2.loading.method3">
                <Loading/>
            </el-icon>
        </el-button>
        <el-button @click="methods2.togetherMethod2and3">
            <span>四号异步任务 ({{ state2.togetherMethod2and3 }})</span>
            <el-icon class="is-loading" v-if="methods2.loading.togetherMethod2and3">
                <Loading/>
            </el-icon>
        </el-button>

    </div>
</template>

<script lang="ts">

    import {createAsyncMethods, randomDelay} from "@/pages/message/createAsyncMethods";
    import {Loading} from '@element-plus/icons'
    import {defineComponent, reactive} from 'vue'

    export default defineComponent({
        components: {Loading},
        setup() {
            const state = reactive({
                method1: 0,
                method2: 0,
                method3: 0,
                togetherMethod2and3: 0,
            })
            const methods = createAsyncMethods({
                method1: async (id: string) => {
                    console.log('任务一开始')
                    await randomDelay(1000, 3000)
                    console.log('任务一结束')
                    state.method1++
                },
                method2: async (start: number, end: number) => {
                    console.log('任务二开始')
                    await randomDelay(1000, 2000)
                    console.log('任务二结束')
                    state.method2++
                    return start + end
                },
                method3: async (result: any) => {
                    console.log('任务三开始', {result})
                    await randomDelay(2000, 3000)
                    console.log('任务三结束')
                    state.method3++
                },
                togetherMethod2and3: async () => {
                    console.log('任务四开始')
                    // const ret = await methods.method2()                   // 错误，缺少必须参数 start 以及 end
                    const ret = await methods.method2(2, 3)
                    // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
                    await methods.method3(ret.toFixed(2))
                    console.log('任务四结束')
                    state.togetherMethod2and3++
                },
            })

            const state2 = reactive({
                method1: 0,
                method2: 0,
                method3: 0,
                togetherMethod2and3: 0,
            })
            const methods2 = createAsyncMethods((() => {
                const m = {
                    method1: async (id: string) => {
                        console.log('任务一开始')
                        await randomDelay(1000, 3000)
                        console.log('任务一结束')
                        state2.method1++
                    },
                    method2: async (start: number, end: number) => {
                        console.log('任务二开始')
                        await randomDelay(1000, 2000)
                        console.log('任务二结束')
                        state2.method2++
                        return start + end
                    },
                    method3: async (result: any) => {
                        console.log('任务三开始', {result})
                        await randomDelay(2000, 3000)
                        console.log('任务三结束')
                        state2.method3++
                    },
                    togetherMethod2and3: async () => {
                        console.log('任务四开始')
                        const ret = await m.method2(2, 3)
                        await m.method3(ret.toFixed(2))
                        console.log('任务四结束')
                        state2.togetherMethod2and3++
                    },
                }
                return m
            })(), true)

            return {
                state,
                methods,
                state2,
                methods2,
            }
        },
    })

</script>
```

## 问题

methods2 中的 createAsyncMethods 为什么要这样创建；

# 四、（React）实现使用弹框选择数据服务：pick 函数

- React 同学专属题目，Vue 同学请看第五题
- pick 函数是一个异步函数，参数是一个对象；返回值的类型，依据参数类型而定；参数类型如下所示

```ts
interface iUsePickOption<Data> {
    data: Data[],
    render: (row: Data, index: number) => any
}

interface iUsePickOptionMultiple<Data> {
    data: Data[],
    render: (row: Data, index: number) => any
    multiple: true
}
```

- （单选）当参数符合`iUsePickOption`时，返回值为选项 data 数组中元素的类型；
- （多选）当参数符合`iUsePickOptionMultiple`是，返回值类型等同于选项 data，也是个数组；
- 使用弹框渲染这个 data 数据，点击弹框取消按钮或者遮罩时，pick 异步任务终止 (Promise.reject)；
- 用户没有选择数据点击弹框确定按钮的时候，如果没有选中任何一条数据，提示选择数据，但是不得关闭弹框；
- 用户选中数据，并且点击确定之后，异步任务执行完毕，返回用户选中数据；
- pick 函数还能够接收一个泛型，当传入这个泛型的时候，选项中的 data 的类型将忽略，返回值以这个泛型类型为主，如下列示例代码中的第三个示例为例；
  `const pickWithCustomType = await pick<Student>(...)` 得到的返回值类型为`Student`，如果是多选，则返回值为`Student[]`

> 提示：函数 pick 的类型为一个重载函数

测试代码如下所示：

```tsx | pure
import {Button, Modal} from "antd"
import {pick} from "@/pages/demo-pick/pick";
import studentJsonData from './student.json'

export default () => {

    interface Staff {
        name: string,
        age: number,
        avatar: string,
    }

    const staffData: Staff[] = [
        {
            "name": "张三",
            "age": 20,
            "avatar": "http://abc.com/zhangsan"
        },
        {
            "name": "李四",
            "age": 21,
            "avatar": "http://abc.com/lisi"
        },
        {
            "name": "王五",
            "age": 22,
            "avatar": "http://abc.com/wangwu"
        }
    ]

    /*---------------------------------------单选-------------------------------------------*/
    const pick1 = async () => {
        //  pickPerson 自动推导类型为 Staff
        const pickStaff = await pick({
            data: staffData,
            // render 函数的 row 参数自动推导为 Person，与 data 选项的 persons 对象类型保持一致
            render: (row) => [row.name, row.age, row.avatar].join(',')
        })
        Modal.info({maskClosable: true, content: [pickStaff.name, pickStaff.age, pickStaff.avatar].join(',')})
    }

    /*---------------------------------------多选-------------------------------------------*/
    const pick2 = async () => {
        // pickPersonList 自动推导类型为 Staff[]
        const pickStaffList = await pick({
            data: staffData,
            // render 函数的 row 参数自动推导为 Person，与 data 选项的 persons 对象类型保持一致
            render: (row) => [row.name, row.age, row.avatar].join(','),
            multiple: true,
        })
        Modal.info({
            maskClosable: true,
            content:
                pickStaffList.map(staff => [staff.name, staff.age, staff.avatar].join(',')).join('\n')
        })
    }

    /*---------------------------------------多选，手动传递类型-------------------------------------------*/
    interface Student {
        name: string,
        code: string,
        grade: number
    }

    const pick3 = async () => {
        const pickWithCustomType = await pick<Student>({
            // 无法确定 data 的类型
            data: studentJsonData,
            // render 函数的 row 参数自动推导为 Person，与 data 选项的 persons 对象类型保持一致
            render: (row) => [row.name, row.grade, row.code].join(','),
            multiple: true,
        })
        // pickWithCustomType 推导类型为 Student[]
        Modal.info({
            maskClosable: true,
            content:
                pickWithCustomType.map(student => [student.name, student.grade, student.code].join(',')).join('\n')
        })
    }

    return (
        <div style={{backgroundColor: 'white', padding: '20px 10px'}}>
            <h1>TestPick</h1>
            <Button.Group>
                <Button onClick={pick1}>选中单条数据</Button>
                <Button onClick={pick2}>选中多条数据</Button>
                <Button onClick={pick3}>选中多条数据（手动传递类型）</Button>
            </Button.Group>
        </div>
    )
}
```

student.json

```json
[
  {
    "name": "张三",
    "grade": 4,
    "code": "01001"
  },
  {
    "name": "李四",
    "grade": 5,
    "code": "01002"
  },
  {
    "name": "王五",
    "grade": 6,
    "code": "01003"
  }
]
```

# 五、（Vue3.0）实现使用弹框选择数据服务：pick 函数

- Vue 同学专属题目，React 同学请看第四题
- pick 函数是一个异步函数，参数是一个对象；返回值的类型，依据参数类型而定；参数类型如下所示

```ts
interface iUsePickOption<Data> {
    data: Data[],
    render: (row: Data, index: number) => any
}

interface iUsePickOptionMultiple<Data> {
    data: Data[],
    render: (row: Data, index: number) => any
    multiple: true
}
```

- （单选）当参数符合`iUsePickOption`时，返回值为选项 data 数组中元素的类型；
- （多选）当参数符合`iUsePickOptionMultiple`是，返回值类型等同于选项 data，也是个数组；
- 使用弹框渲染这个 data 数据，点击弹框取消按钮或者遮罩时，pick 异步任务终止 (Promise.reject)；
- 用户没有选择数据点击弹框确定按钮的时候，如果没有选中任何一条数据，提示选择数据，但是不得关闭弹框；
- 用户选中数据，并且点击确定之后，异步任务执行完毕，返回用户选中数据；
- pick 函数还能够接收一个泛型，当传入这个泛型的时候，选项中的 data 的类型将忽略，返回值以这个泛型类型为主，如下列示例代码中的第三个示例为例；
  `const pickWithCustomType = await pick<Student>(...)` 得到的返回值类型为`Student`，如果是多选，则返回值为`Student[]`

> 提示：函数 pick 的类型为一个重载函数

测试代码如下所示：

```html
<template>
  <div style="background-color: white;padding: 20px 10px">
    <h1>TestPick</h1>
    <el-button-group>
      <el-button @click="pick1">选中单条数据</el-button>
      <el-button @click="pick2">选中多条数据</el-button>
      <el-button @click="pick3">选中多条数据（手动传递类型）</el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts">
import {pick} from "./pick";
import studentJsonData from './student.json'
import {ElMessageBox} from 'element-plus'

export default {
  setup() {

    interface Staff {
      name: string,
      age: number,
      avatar: string,
    }

    const staffData: Staff[] = [
      {
        "name": "张三",
        "age": 20,
        "avatar": "http://abc.com/zhangsan"
      },
      {
        "name": "李四",
        "age": 21,
        "avatar": "http://abc.com/lisi"
      },
      {
        "name": "王五",
        "age": 22,
        "avatar": "http://abc.com/wangwu"
      }
    ]

    /*---------------------------------------单选-------------------------------------------*/
    const pick1 = async () => {
      //  pickPerson 自动推导类型为 Staff
      const pickStaff = await pick({
        data: staffData,
        // render 函数的 row 参数自动推导为 Person，与 data 选项的 persons 对象类型保持一致
        render: (row) => [row.name, row.age, row.avatar].join(',')
      })
      ElMessageBox({message: [pickStaff.name, pickStaff.age, pickStaff.avatar].join(',')})
    }

    /*---------------------------------------多选-------------------------------------------*/
    const pick2 = async () => {
      // pickPersonList 自动推导类型为 Staff[]
      const pickStaffList = await pick({
        data: staffData,
        // render 函数的 row 参数自动推导为 Person，与 data 选项的 persons 对象类型保持一致
        render: (row) => [row.name, row.age, row.avatar].join(','),
        multiple: true,
      })
      ElMessageBox({
        message:
            pickStaffList.map(staff => [staff.name, staff.age, staff.avatar].join(',')).join('\n')
      })
    }

    /*---------------------------------------多选，手动传递类型-------------------------------------------*/
    interface Student {
      name: string,
      code: string,
      grade: number
    }

    const pick3 = async () => {
      const pickWithCustomType = await pick<Student>({
        // 无法确定 data 的类型
        data: studentJsonData,
        // render 函数的 row 参数自动推导为 Person，与 data 选项的 persons 对象类型保持一致
        render: (row) => [row.name, row.grade, row.code].join(','),
        multiple: true,
      })
      // pickWithCustomType 推导类型为 Student[]
      ElMessageBox({
        message:
            pickWithCustomType.map(student => [student.name, student.grade, student.code].join(',')).join('\n')
      })
    }

    return {
      pick1,
      pick2,
      pick3,
    }
  },
}
</script>
```

student.json

```json
[
  {
    "name": "张三",
    "grade": 4,
    "code": "01001"
  },
  {
    "name": "李四",
    "grade": 5,
    "code": "01002"
  },
  {
    "name": "王五",
    "grade": 6,
    "code": "01003"
  }
]
```