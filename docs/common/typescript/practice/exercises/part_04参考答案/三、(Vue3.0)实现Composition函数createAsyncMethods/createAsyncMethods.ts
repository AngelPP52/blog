import {computed, ComputedRef, reactive, Ref, ref} from "vue"

interface SimpleMethod {(...args: any[]): any}

export function createAsyncMethods<Methods extends Record<string, SimpleMethod>>
(methods: Methods, alone?: boolean):
    Methods & { loading: Record<keyof Methods | 'global', boolean> } {

    const newMethods = {} as Record<string, SimpleMethod>
    const loadingInitialState = {} as Record<string, Ref<boolean> | ComputedRef<boolean>>
    const methodNames = Object.keys(methods)

    methodNames.map((name) => {
        const method = methods[name]
        const isLoading = ref(false)
        newMethods[name] = async (...args: any[]) => {
            if (alone) {
                if (loadingInitialState.global.value) {return }
            } else {
                if (isLoading.value) {return}
            }
            isLoading.value = true
            try {
                return await method(...args)
            } catch (e) {
                throw e
            } finally {
                isLoading.value = false
            }
        }
        loadingInitialState[name] = isLoading
    })
    loadingInitialState.global = computed(() => {
        return methodNames.some(name => loadingInitialState[name].value)
    })
    return {
        ...newMethods,
        loading: reactive(loadingInitialState),
    } as any
}

export const delay = (duration: number = 0) => new Promise(resolve => setTimeout(resolve, duration))
export const randomDelay = async (start: number, end: number) => await delay(Math.random() * (end - start) + start)

async function aaa() {}