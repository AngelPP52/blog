# react中间件

> 强化store的能力

## applyMiddleware

```js
// 返回一个增强版的store
function applyMiddleware(middleware){
    return function(createStore){ 
        return function(reducer){
            let store = createStore(reducer);
            let dispatch;
            let middlewareAPI = {getState: dispatch.getState, dispatch: action=>dispatch(action)};
            dispatch = middleware(middlewareAPI)(store.dispatch); // 这里规定了中间件的固定写法，先传middlewareAPI({getState, dispatch})，再传递store.dispatch(next)
            return {
                ...store,
                dispatch // 这是增强后的dispatch
            }
        }
    }
}
```

## reduxThunk

> **派发的action是一个函数**

## reduxPromise

> **派发的action是一个promise**
>
> 判断一个对象是否是promise的实例：这个对象是否有then属性且then属性是一个函数

## connected-react-router

> **使用redux来管理路由状态**，并且可以通过派发action来跳转路由

## redux-saga

> 可以为redux提供额外的功能，**为你的应用管理复杂的流程**
>
> 在reducers中的所有操作都是同步的并且是存粹的，即 reducer 都是纯函数
>
> 纯函数是指一个函数的返回结果只依赖于它的参数，并且在执行过程中不会对外部产生副作用，即给它传什么，就吐出什么

 - take - 只监听一次指定的actionType
 - takeEvery - while循环监听指定的actionType，第二个参数是一个生成器
 - put - 派发一个action
 - call - 调用一个返回promise的方法，第二个参数是传的参数数组
 - apply - 调用一个返回promise的方法，第一个参数是context，第三个参数是传的参数数组
 - fork - 开启一个子进程进行其他的任务（生成器），run
 - cancel - 取消一个任务（fork开启的任务）
 - cps - 调用node风格进行回调的函数`(data, callback) => {}`

### 工作原理

- saga采用generator函数来yield effects
- generator函数的作用是可以停止执行，再次执行的时候从上次让停止的地方继续执行
- effect是一个简单的对象，该对象包含了一些给middleware解析执行的信息（type，payload）
- 你可以通过使用effects API如fork，call，take，put，cancel等来创建effect

### 分类

- `worker saga` - 做实际工作，如调用API/异步请求/封装结果
- `watcher saga `- 监听dispatch的actions，监听到action时，调用worker执行实际工作
- `root saga` - 启动saga的唯一入口

## redux-dva