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
      //  pickPerson自动推导类型为 Staff
      const pickStaff = await pick({
        data: staffData,
        // render函数的row参数自动推导为Person，与data选项的persons对象类型保持一致
        render: (row) => [row.name, row.age, row.avatar].join(',')
      })
      ElMessageBox({message: [pickStaff.name, pickStaff.age, pickStaff.avatar].join(',')})
    }

    /*---------------------------------------多选-------------------------------------------*/
    const pick2 = async () => {
      // pickPersonList自动推导类型为 Staff[]
      const pickStaffList = await pick({
        data: staffData,
        // render函数的row参数自动推导为Person，与data选项的persons对象类型保持一致
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
        // 无法确定data的类型
        data: studentJsonData,
        // render函数的row参数自动推导为Person，与data选项的persons对象类型保持一致
        render: (row) => [row.name, row.grade, row.code].join(','),
        multiple: true,
      })
      // pickWithCustomType推导类型为 Student[]
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

<style lang="scss">

</style>