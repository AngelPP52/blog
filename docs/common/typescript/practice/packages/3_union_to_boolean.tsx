export default {}

type UnionToBooleanProps<T extends string, TT extends string = T> =
    T extends any ?
        { [k in Exclude<TT, T>]?: void } & { [k in T]: boolean; }
        : never

type MessageStringType = "info" | "success" | "warning" | "error";

type OneMessageTypes = UnionToBooleanProps<MessageStringType>

type Props = OneMessageTypes & { id: string; }

function Component(props: Props) {
    return <></>
}

const a = <Component id="abc" info/>           //correct
const b = <Component id="abc" success/>        //correct
// const c = <Component id="abc"/>                //wrong
// const d = <Component id="abc" info success/>   //wrong
