import React, {useState} from "react";
import {randomDelay, useAsyncMethods} from "./useAsyncMethods";
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
            // const ret = await methods.method2()                   // 错误，缺少必须参数start以及end
            const ret = await methods.method2(2, 3)
            // await methods.method3(ret.charAt(0))                  // 错误，返回值类型为数字
            await methods.method3(ret.toFixed(2))
            console.log('任务四结束')
            setTogetherMethod2and3(val => val + 1)
        },
    })

    return <>
        <div style={{backgroundColor: 'white', padding: '20px'}}>
            <h1>测试createAsyncMethods</h1>
            <h3>允许多个不同的异步同时执行，但是同一个异步函数不能同时执行多个，必须在函数执行完毕之后，才能开始再次执行该异步函数</h3>
            <Button.Group>
                <Button onClick={() => methods.method1('__')}>
                    <span>一号异步任务({method1})</span>
                    {!!methods.loading.method1 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method2(0, 1)}>
                    <span>二号异步任务({method2})</span>
                    {!!methods.loading.method2 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method3('?')}>
                    <span>三号异步任务({method3})</span>
                    {!!methods.loading.method3 && <Spin/>}
                </Button>
                <Button onClick={() => methods.togetherMethod2and3()}>
                    <span>四号异步任务({togetherMethod2and3})</span>
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
                // const ret = await methods.method2()                   // 错误，缺少必须参数start以及end
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
                    <span>一号异步任务({method1})</span>
                    {!!methods.loading.method1 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method2(0, 1)}>
                    <span>二号异步任务({method2})</span>
                    {!!methods.loading.method2 && <Spin/>}
                </Button>
                <Button onClick={() => methods.method3('?')}>
                    <span>三号异步任务({method3})</span>
                    {!!methods.loading.method3 && <Spin/>}
                </Button>
                <Button onClick={() => methods.togetherMethod2and3()}>
                    <span>四号异步任务({togetherMethod2and3})</span>
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
