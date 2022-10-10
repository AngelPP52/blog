import {useState} from "react";

export const delay = (duration = 0) => new Promise(resolve => setTimeout(resolve, duration))
export const randomDelay = async (start: number, end: number) => await delay(Math.random() * (end - start) + start)

interface SimpleMethod {(...args: any[]): any}

const getAsyncState = <T>(setter: (getter: (val: T) => any) => any): Promise<T> => {
    return new Promise<T>(resolve => setter(val => {
        resolve(val)
        return val
    }))
}

export function useAsyncMethods<Methods extends Record<string, SimpleMethod>>(methods: Methods, alone?: boolean):
    Methods & { loading: Record<keyof Methods | 'global', boolean> } {

    const methodNames = Object.keys(methods) as (keyof Methods)[]
    const newMethods = {} as Record<keyof Methods, SimpleMethod>
    const loadingInitialState = {} as Record<keyof Methods, boolean>

    methodNames.forEach(methodName => {
        const method = methods[methodName]
        loadingInitialState[methodName] = false
        newMethods[methodName] = async (...args: any[]) => {
            const loading = await getAsyncState(setLoading)
            if (alone) {
                if (loading.global) {return}
            } else {
                if (loading[methodName]) {return}
            }
            setLoading(loading => {
                return {
                    ...loading,
                    [methodName]: true,
                    global: true,
                }
            })
            try {
                return await method(...args)
            } finally {
                setLoading(loading => {
                    return {
                        ...loading,
                        [methodName]: false,
                        global: methodNames.findIndex(name => name !== methodName && loading[name]) > -1,
                    }
                })
            }
        }
    })

    const [loading, setLoading] = useState({
        ...loadingInitialState,
        global: false,
    })

    return {
        ...newMethods,
        loading,
    } as any
}
