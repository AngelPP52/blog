import {CamelCase} from "./51_CamelCase";
import React from "react";

export default {}

/*---------------------------------------utils-------------------------------------------*/
interface SimpleConstruct {new(): any}

type InferInstance<T> = T extends () => infer R ? R : (T extends new(...args: any[]) => infer R ? R : T)

/*---------------------------------------component-------------------------------------------*/
interface ComponentOption {
    props?: Record<string, SimpleConstruct | SimpleConstruct[]>,
    emits?: Record<string, (...args: any[]) => any>,
    inherit?: keyof JSX.IntrinsicElements | ((props: any) => any)
}

type ExtractPropType<T> = { [k in keyof T]?: T[k] extends any[] ? InferInstance<T[k][number]> : InferInstance<T[k]> }

type ExtractEmitType<T> = { [k in keyof T as `on${k extends string ? CamelCase<k> : ''}`]?: T[k] extends ((...args: infer A) => any) ? (...args: A) => void : T[k] }

type ExtractInheritType<T> = T extends (props: infer R) => any ? R : (T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : {})

type MergeTypes<Props, Emits, Inherit> = Props & Emits & Omit<Inherit, keyof Props | keyof Emits>

type ComponentType<Option> = Option extends { props?: infer Props, emits?: infer Emits, inherit?: infer Inherit } ? MergeTypes<ExtractPropType<Props>, ExtractEmitType<Emits>, ExtractInheritType<Inherit>> : never

/*---------------------------------------create component-------------------------------------------*/

/*
*  实现类型 ComponentType<Option> 以及函数createComponent的类型定义（无需实现功能）
*  使得函数createComponent能够创建一个React组件，支持设置三个属性值：props属性，emits事件以及inherit继承组件，具体要求看使用代码；
*  提示：先完整看一遍题目再开始实现功能；
*/
function createComponent<Option extends ComponentOption>(option: Option): { (props: ComponentType<Option>): any } {return {} as any}

// 基于button标签封装的组件，覆盖title属性以及onClick事件类型
const Button = createComponent({
    inherit: "button",
    props: {
        // 基础类型的属性
        label: String,
        width: Number,
        loading: Boolean,
        block: [Boolean, Number],                   // 联合属性类型：block: boolean|number
        title: Number,                              // 覆盖继承button的属性类型 title:string -> title:number
    },
    emits: {
        'show-change': (len: number) => {},         // 自定义的事件类型
        click: (name: string) => {},                // 覆盖button的click事件类型
    },
})

console.log(
    /*
    *  要求：
    *  1. 属性类型为 {label:string, width:number, loading: boolean, block:boolean|number, title:number}
    *  2. 事件类型为：{onShowChange:(len:number)=>void, onClick:(name:string)=>void}
    *  3. 能够继承button的所有属性以及事件
    */
    <Button
        label={""}
        width={100}
        title={111}
        onShowChange={len => {
            console.log(len.toFixed(0))     // 不允许有隐式的any类型，这里即使没有定义len的类型，len也应该能够自动推断出来为number类型
        }}
        onClick={e => {
            console.log(e.charAt(0))
        }}
    />
)

// 基于Button组件封装的组件，覆盖label属性以及show-change，click事件类型
const ProButton = createComponent({
    inherit: Button,
    props: {
        // 基础类型数据推断
        proLabel: String,
        label: [String, Number],                    // 覆盖继承属性类型
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
    *  1. 属性类型为 {proLabel:string, label:string|number}
    *  2. 事件类型为：{onShowChange:(el: HTMLButtonElement)=>void, onClick:(el: HTMLButtonElement)=>void, onMakePro:()=>void}
    *  3. 继承Button组件所有的属性以及事件
    */
    <ProButton
        label={111}
        onShowChange={e => {
            console.log(e.offsetWidth)                  // 不允许有隐式的any类型，这里即使没有定义len的类型，len也应该能够自动推断出来为number类型
        }}
        onClick={e => {
            console.log(e.offsetWidth)
        }}
        onMakePro={() => {}}
    />
)

/*
*  提示，如何得到button标签的属性类型
*  在文件：node_modules/@types/react/index.d.ts 中寻找 JSX.IntrinsicElements
*  比如div标签的属性类型为 JSX.IntrinsicElements["div"]
*/
const MyDiv = (props: JSX.IntrinsicElements["div"]) => null
console.log(<>
    <div contentEditable={true} aria-label="div text"/>
    <MyDiv contentEditable={true} aria-label="div text"/>
</>)

