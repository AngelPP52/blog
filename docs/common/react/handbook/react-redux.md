# Redux

> store 内部保存了一棵状态树
>
> 组件通过 dispatch 派发 action 行为给 store，通过订阅 store 中的 state 来更新视图

![](./redux流程图.png)

> 一个应用只有一个 store，只有一棵状态树
>
> 状态是只读的，只能通过 state 来改变
>
> 单一数据源

## reducer

> 一个函数，接收一个老的 state 和一个 action，返回一个新的 state

## createStore

> 创建一个 store，传入一个 reducer 和一个初始 state，返回一个 store 对象（dispatch，subscribe，getState）
>
> 基于发布订阅，发布（dispatch）和订阅（subscribe）

```js
function createStore(reducer, preloadedState){
    let currentReducer = reducer;
    let currentState = preloadedState;
    let currentListeners = [];
    
    function getState(){
        return currentState;
    }
    
    function subscribe(listener){ // 页面订阅
        currentLiseners.push(listener);
        
        return function unsubscribe(){
            currentListeners = currentListeners.filter(l=> l!== listener);
        }
    }
    
    function dispatch(action){ // 派发 action 时，调用 reducer 更新状态，触发所有订阅回调，更新页面
        currentState = currentReducer(currentState, action);
        // 触发所有的 listener
        for(let i = 0; i < currentListeners.length; i++){
            currentListeners[i]();
        }
        return action;
    }
    
    dispatch({type: '@@INIT'}); // redux 内部先自己派发一次初始化 state
    const store = {
        dispatch,
        subscribe,
        getState
    }
    
    return store;
}
```

## bindActionCreators

> 创建一个工厂实例，直接调用里面的方法即可进行派发。**避免重复写`store.dispatch(actions)`这样的代码**
>
> props.add() ===> add(){store.dispatch(‘add’)}

```js
 // 例如
const actions = {
    add(){
		return {type: 'add'}
    },
    minus(){
        return {type: 'minus'}
    }
}

// 传入单个 action（function 形式），返回一个新的函数（被调用时，会触发 dispatch）
function bindActionCreator(actionCreator, dispatch){
    return function (...args){
        // 调用 action.add 返回{type: 'add'}，调用 dispatch({type: 'add'})
        return dispatch(actionCreator.apply(this, args)); 
    }
}
// 1. 传入单个 action，返回 bindActionCreator(...)
// 2. 传入一个对象，里面定了一个很多 action（function 形式），返回一个新的对象，里面包含了所有 key 对应的新的函数（被调用时，会触发 dispatch）
function bindActionCreator(actionCreators, dispacth){
    if(typeof actionCreators === 'function'){
        return bindActionCreator(actionCreators, dispacth);
    }
    const boundActionCreators = {}; // 用来存储返回的
    for(const key in actionCreators){
        if(typeof actionCreators[key] === 'function'){
        	const actionCreator = bindActionCreator(actionCreators[key], dispacth);
            boundActionCreators[key] = actionCreator;
        }
    }
    return boundActionCreators;
}
```

## combineReducers

> 合并 reducers（对象形式{ Counter1, Counter2 }），返回一个新的 reducer

```js
// 例如
const reducers = {
    counter1, // (state, action) => {}
    counter2,
    // ...
}

function combineReducers(reducers){
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {}; // 用来过滤一些不合规范的 reducer
    for(const i = 0; i < reducerKeys.length; i++){
        const key = reducersKeys[i];
        if(typeof reducers[key] === 'function'){
            finalReducers[key] = reducers[key];
        }
    }
    
    const finalReducerKeys = Object.key(finalReducers);
    // 这是一个新的 reducer
    // dispatch 的时候会被触发，总的 reducer，在里面遍历所有的 reducer，传入老的 state 和 action，判断 state 是否改变。最后返回总的 state
    return function combination(state = {}, action){ 
        let hashChanged = false;
        const nextState = {};
        // 调用每一个 reducer，计算最新的 state：nextState
        for(const i = 0; i < finalReducerKeys.length; i++){
	        const ket = finalReducerKeys[i];
            const reducer = finalReducers[key];
            const prevStateForKey = state[key]; // 根据 key 获取老的 state
            const nexStateForKey = reducer(prevStateForKey, reducer);
            nestState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== prevStateForKey;
    	}
        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        return hasChanged ? nextState : state; // 其中一个 state 改变，其他 state 的关联页面都会重新 render（执行组件）
    }
}
```

## react-redux

> **解决引入 store，订阅 state，取消订阅 state，调用 getState 等重复逻辑**
>
> 用法：
>
> 1. 从 react-redux 引入`connect`
> 2. 调用 connect（柯里化函数），第一次传入`（mapStateProps, [mapDispatchProps 或 actions]）`，第二次传入组件
> 3. `mapStateProps = (state) => state.counter1`; // 传入总的 state，返回子的 state
> 4. `mapDispatchProps = (dispatch) => ({ add(){ dispatch({type: 'ADD' })} })`; // 传入 dispatch，返回一个新的对象（里面含了组件需要派送 action 的方法）
> 5. 从 react-redux 引入`Provider`
> 6. 使用 Provider 组件，把 store 传递给 props.value，向下层组件传递这个 store

### Provider.js

> 就是一个函数组件。提供一个 context，向下层组件传递 store

### Context.js

> 使用 createContext 创建一个 context

### connect.js

> 创建并返回了一个新的组件。强壮了 props 属性（增加了 state 和 dispatch 派发 action 的函数）

```js
function connect(mapStateProps, mapDispatchProps){
    return function(WrappedComponent){
        return function(props){
            const {store} = useContext(Context);
            const {getState, dispatch, subscribe} = store;
            const prevState = getState();
            // 根据组件传进来的 mapStateProps 获取组件需要的 state，prevState 变了才进去渲染（useMomo 减少渲染次数）
            const stateProps = useMemo(()=>mapStateProps(prevState), [prevState]);
            // 根据组件传进来的 mapStateProps 创建一个新对象（里面包含了可以进行派发 action 的函数）
            const dispatchProps = useMomo(()=>{
                let dispatchProps;
                if(typeof mapDispatchProps === 'object'){ // actions 对象
                    dispatchProps = bindActionCreators(mapDispatchProps, dispatch);
                }else if(typeof maDispatchProps === 'function'){
                    dispatchProps = mapDispatchProps(dispatch, props);
                }else{
                    dispatchProps = {dispatch};
                }
            }, [dispatch, props]);
            // 借助 useEffect 和 useReducer，添加一个订阅的回调，当界面进行派发时，所有订阅的回调都会被调用，这个时候，就会使界面进行重新渲染
            const [, forceUpdate] = useReducer(x=>x+1,0);
            useEffect(()=>subscribe(forceUpdate), [subscribe]); // 基本上只会进去一次，因为 subscribe 基本不会被改变
            return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
        }
    }
}
```

## Rudex hooks

### useStore

> 获取 context 中的 value.store

### useReduxContext

> 获取 context

### useDispatch

> 获取 context 中的 value.store.dispatch

### Subscription

> 调用 store 的 subscribe 事件添加一个对 store 的状态变化监听，自己的 notify 作为回调函数
>
> notify 可以用于通知自己，状态更新了，进而通知 useSelector 是时候需要强制刷新界面了
>
> 在 useSelector 的时候，添加 Subscription 的 subscribe 事件

### useSelector

> 一个选择器，从总的状态中选择自己组件的 state

```js
function useSelector(selector){
    const {store, subscription} = useReduxContext();
    const selectedState = useSelectorWithStore(
        selector, equalityFn, store, subscription
    );
    return selectedState;
}

function equalityFn = (a, b) => a===b;

function useSelectorWithStore(selector, equalityFn, store, subscription){
    const [, forceRender] = useReducer(s=>s+1,0);
    let lastSelector = useRef(); // 上一个选择器函数
    let lastStoreState = useRef(); // 上一个仓库状态，老仓库状态
    let lastSelectedState = useRef(); // 上一个选中的状态，老状态
    
    let storeState = store.getStore(); // 最新的仓库状态
    let selectedState;
    // 仓库状态和选择器是否改变了，如果有一个改变了，应该重新计算选中的状态
    if(selector !== lastSelector.current || storeState !== lastStoreState.current){
        selectedState = selector(storeState);
    }else{
        selectedState = lastSelectedState.current;
    }
    
    // 存储选择器，总仓库状态，选中状态
    useLayoutEffect(()=>{
     	lastSelector.current = selector;
        lastStoreState.current = storeState;
        lastSelectedState.current = selectedState;
    });
    
    useLayoutEffect(()=>{
        function checkForUpdates(){
            const newSelectedState = lastSelector.current(store.getState()); // 从最新的总仓库状态中计算出最新的选中状态
            if(equalityFn(newSelectorState, lastSelectedState.current)){
                return;
            }
            lastSelectedState.current = newSelectedState;
            forceRender();
        }
        checkForUpdates(); // 第一次触发
        subscription.subscribe(checkForUpdates); // 当总仓库状态变化时，这里的订阅回调会被通知执行
    }, [equalityFn, store, subscription])
}
```

