<template>
  <div style="background-color: white;padding: 20px 10px">
    <h1>测试createAsyncMethods</h1>
    <h3>允许多个不同的异步同时执行，但是同一个异步函数不能同时执行多个，必须在函数执行完毕之后，才能开始再次执行该异步函数</h3>
    <el-button @click="methods.method1">
      <span>一号异步任务({{ state.method1 }})</span>
      <el-icon class="is-loading" v-if="methods.loading.method1">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods.method2">
      <span>二号异步任务({{ state.method2 }})</span>
      <el-icon class="is-loading" v-if="methods.loading.method2">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods.method3">
      <span>三号异步任务({{ state.method3 }})</span>
      <el-icon class="is-loading" v-if="methods.loading.method3">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods.togetherMethod2and3">
      <span>四号异步任务({{ state.togetherMethod2and3 }})</span>
      <el-icon class="is-loading" v-if="methods.loading.togetherMethod2and3">
        <Loading/>
      </el-icon>
    </el-button>

    <h3>无论是否为同一个异步函数，同一时刻仅能够有一个异步函数在执行</h3>
    <el-button @click="methods2.method1">
      <span>一号异步任务({{ state2.method1 }})</span>
      <el-icon class="is-loading" v-if="methods2.loading.method1">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods2.method2">
      <span>二号异步任务({{ state2.method2 }})</span>
      <el-icon class="is-loading" v-if="methods2.loading.method2">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods2.method3">
      <span>三号异步任务({{ state2.method3 }})</span>
      <el-icon class="is-loading" v-if="methods2.loading.method3">
        <Loading/>
      </el-icon>
    </el-button>
    <el-button @click="methods2.togetherMethod2and3">
      <span>四号异步任务({{ state2.togetherMethod2and3 }})</span>
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
        // const ret = await methods.method2()                   // 错误，缺少必须参数start以及end
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

<style lang="scss">

</style>