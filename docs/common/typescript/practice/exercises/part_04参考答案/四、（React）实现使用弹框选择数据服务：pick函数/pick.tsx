import {defer} from "@/utils/defer";
import {Modal} from 'antd'
import {useState} from "react";
/*---------------------------------------type utils-------------------------------------------*/

type SimpleObject = Record<string, any>
type NotUnknown<T, K> = unknown extends T ? K : T

/*---------------------------------------pick type-------------------------------------------*/
interface iUsePickOption<Data> {
    data: Data[],
    render: (row: Data, index: number) => any
}

interface iUsePickOptionMultiple<Data> extends iUsePickOption<Data> {
    multiple: true
}

/*函数类型: 单选*/
export function pick<T = unknown, ListT = SimpleObject>(option: iUsePickOption<NotUnknown<T, ListT>>): Promise<NotUnknown<T, ListT>>
/*函数类型: 多选*/
export function pick<T = unknown, ListT = SimpleObject>(option: iUsePickOptionMultiple<NotUnknown<T, ListT>>): Promise<NotUnknown<T, ListT>[]>
/*函数实现*/
export function pick<T = unknown, ListT = SimpleObject>(option: iUsePickOption<NotUnknown<T, ListT>> | iUsePickOptionMultiple<NotUnknown<T, ListT>>) {

    const dfd = defer<NotUnknown<T, ListT> | NotUnknown<T, ListT>[]>()

    // 用来在beforeClose的时候判断是否已经选中任何内容
    const state = {
        checked: null as null | NotUnknown<T, ListT>,
        checkedList: [] as NotUnknown<T, ListT>[],
    }

    const Message = () => {

        const [checked, setChecked] = useState(null as null | NotUnknown<T, ListT>)
        const [checkedList, setCheckedList] = useState([] as NotUnknown<T, ListT>[])

        /*获取元素位置索引*/
        const getIndex = (row: any) => checkedList.indexOf(row)
        /*元素是否已经选中*/
        const isChecked = (row: any) => 'multiple' in option && option.multiple ? getIndex(row) > -1 : checked == row

        const onClick = (row: NotUnknown<T, ListT>) => {
            if ('multiple' in option && option.multiple) {
                if (isChecked(row)) {
                    checkedList.splice(getIndex(row), 1)
                } else {
                    checkedList.push(row as any)
                }
                state.checkedList = checkedList
                setCheckedList([...checkedList])
            } else {
                state.checked = row
                setChecked(row)
            }
        }

        return (
            <ul>
                {option.data.map((row, index) => (
                    <li
                        style={{
                            padding: '10px 16px',
                            backgroundColor: isChecked(row) ? 'aliceblue' : ''
                        }}
                        onClick={() => onClick(row as any)}
                        key={index}
                    >
                        {option.render(row as any, index)}
                    </li>
                ))}
            </ul>
        )
    }

    const modal = Modal.info({
        title: '选择',
        okText: '确定',
        cancelText: '取消',
        closable: true,
        maskClosable: true,
        content: <Message/>,
        onCancel: () => dfd.reject('cancel'),
        okButtonProps: {
            onClick: () => {
                if ('multiple' in option && option.multiple) {
                    if (state.checkedList.length === 0) {
                        return Modal.info({content: '请至少选中一条数据', maskClosable: true})
                    } else {
                        dfd.resolve(state.checkedList)
                    }
                } else {
                    if (!state.checked) {
                        return Modal.info({content: '请选中一条数据', maskClosable: true})
                    } else {
                        dfd.resolve(state.checked)
                    }
                }
                return modal.update({visible: false})
            },
        },
    })

    return dfd.promise
}