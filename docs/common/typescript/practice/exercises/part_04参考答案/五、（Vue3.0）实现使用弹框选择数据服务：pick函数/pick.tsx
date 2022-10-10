import {defineComponent, reactive, toRaw} from "vue";
import {ElMessageBox} from 'element-plus'
import {defer} from "@/utils/defer";

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

    const Message = defineComponent({
        setup() {
            /*响应式变量*/
            const innerState = reactive({
                ...state,
                option,
            })

            /*获取元素位置索引*/
            const getIndex = (row: any) => innerState.checkedList.findIndex(item => toRaw(item) == row)
            /*元素是否已经选中*/
            const isChecked = (row: any) => 'multiple' in option && option.multiple ? getIndex(row) > -1 : toRaw(innerState.checked) == row

            const onClick = (row: NotUnknown<T, ListT>) => {
                if ('multiple' in option && option.multiple) {
                    if (isChecked(row)) {
                        state.checkedList.splice(getIndex(row), 1)
                    } else {
                        state.checkedList.push(row)
                    }
                    innerState.checkedList = [...state.checkedList] as any
                } else {
                    state.checked = row
                    innerState.checked = row as any
                }
            }
            return () => (
                <ul>
                    {option.data.map((row, index) => (
                        <li
                            style={{
                                padding: '10px 16px',
                                backgroundColor: isChecked(row) ? 'aliceblue' : ''
                            }}
                            onClick={() => onClick(row)}>
                            {option.render(row, index)}
                        </li>
                    ))}
                </ul>
            )
        },
    })

    ElMessageBox({
        title: '选择',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        message: <Message/>,
        beforeClose: (action, instance, done) => {
            if (action !== 'confirm') {
                return done()
            }
            if ('multiple' in option && option.multiple) {
                if (state.checkedList.length === 0) {
                    return ElMessageBox({message: '请至少选中一条数据'})
                } else {
                    dfd.resolve(state.checkedList)
                }
            } else {
                if (!state.checked) {
                    return ElMessageBox({message: '请选中一条数据'})
                } else {
                    dfd.resolve(state.checked)
                }
            }
            return done()
        },
    })

    return dfd.promise
}