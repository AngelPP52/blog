# react 基础

[^作者]: AngelPP
[^日期]: 2020-07-28 23:54:00

## JSX

- 一种 JS 和 HTML 混合的语法
- JSX 语法糖会通过 babel 转译成`React.createElement`语法
- JSX 表达式：{}，使用大括号来包裹表达式
- JSX 属性：对应 HTML 中的属性（class，for 等），但写法上并不一样
- JSX 可以作为变量，返回值，参数使用

## React 元素与 ReactDOM

- React 元素是 React 应用的最小单位

- 通过 ReactDOM 将 React 元素渲染到浏览器中

  ```jsxarguments
  // 使用React.createElement
  ReactDOM.render(React.createElement('h1', 'hello'), document.getElementById('root'));
  // 使用JSX
  ReactDOM.render(<h1>hello</h1>, document.getElementById('root'));
  ```

- ReactDOM 只会更新必要的部分（变化的部分）

## 组件和 Props

- 函数组件

  ```jsx | pure
  import React from 'react';
  import ReactDOM from 'react-dom';

  const root = document.getElementById('root');

  function Welcome(props) {
    return <h1>hello, {props.name}</h1>;
  }

  ReactDOM.render(<Welcome name="AngelPP" />, root);
  ```

- 类组件

  ```jsx | pure
  import React from 'react';
  import ReactDOM from 'react-dom';

  class Welcome extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <h1>hello, {this.props.name}</h1>;
    }
  }

  ReactDOM.render(<Welcome name="AngelPP" />, root);
  ```

- 组件渲染

  ReactDOM.reander

- 复合组件和提取组件

  定义父子组件...

- Props 的只读性

  Props 无法被修改，函数组件是一个`纯函数`

- Props 的默认值和类型检查

  默认值：static 属性 defaultProps，类型检查：static 属性 propTypes

## BabelJs

将 JSX 语法转换成 JS 语法

> 转换前

```jsx
<h1 id="title">
  <span>hello</span>world
</h1>
```

> 转换后

```js
React.createElement(
  'h1',
  {
    id: 'title',
  },
  React.createElement('span', null, 'hello'),
  'world'
);
```

## React 类

功能一：根据 BabelJs 的返回结果，创建一个 VDOM

功能二：创建组件的 ref 属性

功能三：使函数组件支持 ref 属性

- createElement 方法

  返回一个 VDOM

- createRef 方法

  返回一个对象{current: null}

- forwardRef 方法

  传入一个函数组件，返回一个类组件

```js
// type：元素类型
// config：配置对象（props）
// children：儿子
function createElement(type, config, children) {
  let ref; // ref 作用？
  if (config) {
    delete config.__source; // ?
    delete config.__self; // ?
    ref = config.ref;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children; // 作用？
  return {
    type,
    props,
    ref,
  };
}

function createRef() {
  return { current: null };
}

// 使函数组件具有 ref 属性，原理还是通过返回一个类组件
function forwardRef(functionComponent) {
  return class extends Component {
    render() {
      return functionCoponent(this.props, this.props.ref); // 通过第二个参数传递 ref
    }
  };
}
```

## ReactDOM 类

功能：根据 VDOM 获取真实 DOM（包括处理元素属性，类组件/函数组件，孩子节点等）

- render 方法

  传入一个 VDOM 和真实的根 DOM

- createDOM 方法

  传入一个 VDOM，返回一个真实 DOM

  - 普通节点（string，number）
    - document.createTextNode
  - React 元素节点，type 是一个 function，函数返回了（结束了）
    - 函数组件 --> mountClassComponent
    - 类组件 --> mountFunctionComponent
  - 原生元素节点
    - document.createElement
  - 更新属性 --> updateProps。虚拟 DOM 对象的 props 属性挂了当前节点的 dom 属性以及所有孩子
  - 处理孩子节点
    - 普通孩子节点（string，number）
    - VDOM 孩子节点，是一个 object --> render
    - [VDOM] 孩子节点，是一个数组 --> 遍历 render
    - 其他情况，显示 toString 结果
  - 使 ref.current 指向创建的 dom（除了函数组件和类组件，其他情况都会进行这样指向，父节点可以通过赋值 ref 调用这个节点的 dom 方法）

- mountFunctionComponent 方法

  传入一个 FunctionName 的 VDOM，返回最终真实 DOM

  - 运行函数，获取最终真实 VDOM
  - 调用 createDOM，返回最终真实 DOM

- mountClassComponent 方法

  传入一个 ClassName 的 VDOM，返回最终真实 DOM

  - 创建类组件实例
  - 调用实例的 reander 方法，返回最终真实 VDOM
  - 调用 createDOM，返回最终真实 DOM
  - 使 ref.current 指向这个实例（类组件需要进行这样的指向，在父节点就可以通过赋值 ref 调用这个类子节点的实例方法了）
  - 使实例的 dom 属性指向这个最终真实节点

- reconcileChildren 方法

  遍历 reander 孩子节点

- updateProps 方法

  遍历 props 的 key

  - children（TODO）

  - style

    由于跟原生直接赋值给 dom.style

  - on 事件

    调用 event/addEvent 方法创建监听，传入（dom，监听事件名，用户定义的函数）

  - 普通属性

    直接赋值，dom[key] = props[key]

```js
function render(vDOM, pDOM) {
  let dom = createDOM(vDOM);
  pDOM.appendChild(dom);
}

// 将一个虚拟 DOM 转换成真实 DOM
function createDOM(vDOM) {
  // 文本节点
  if (typeof vDOM === 'string' || typeof vDOM === 'number') {
    return document.createTextNode(vDOM);
  }
  let { ref, props, type } = vDOM;
  let dom;
  // 组件
  if (typeof type === 'function') {
    return type.isReactComponent ? mountClassComponent(vDOM) : mountFunctionComponent(vDOM);
  }
  // 普通 dom 元素
  else {
    dom = document.createElement(type);
  }
  // 更新属性
  updateProps(dom, {}, props);
  // 处理孩子
  // 孩子是文本节点
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children;
  }
  // 孩子是 vDOM 对象
  else if (typeof props.children === 'object' && props.children.type) {
    render(props.children, dom);
  }
  // 孩子是 vDOM 对象数组
  else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom); // 遍历 children 调用 render
  } else {
    // 其他情况就当是文本处理
    dom.textContent = props.children ? props.children.toString() : '';
  }
}

// 挂载类组件
function mountClassComponent(vDOM) {
  let { ref, props, type } = vDOM;
  let classInstance = new type(props);
  let childVDOM = classInstance.render(props);
  return createDOM(childVDOM);
}

// 挂载函数组件
function mountFunctionComponent(vDOM) {
  let { ref, props, type } = vDOM;
  let childVDOM = type(props);
  return createDOM(childVDOM);
}
```

## Event 类

功能一：添加 DOM 事件监听

功能二：合适的时机，触发批量更新（setState）

- addEvent 方法
  - 创建一个 dom.store 对象，存用户定义的 handle 函数
  - document.addEventListener 创建一个监听 --> dispatchEvent
- dispatchEvent 方法
  - 创建一个合成事件对象（用来存原生 event 对象和它的属性）
  - 进入批量更新状态，updateQueue.isBatchingUpdate = true
  - 调用用户定义的 handle 函数
  - 进行批量更新，updateQueue.batchUpdate
  - 清空合成事件对象的属性

```js
import { updateQueue } from './Component';

function addEvent(dom, eventType, listener) {
  let stpre = dom.store || (dome.store = {});
  store[eventType] = listener; // 先把用户的 listener 挂载到 dom 身上
  // addEventListener 的第三个参数是 useCapture，为 false 时表示冒泡阶段执行，为 true 时表示捕获阶段执行
  document.addEventListener(eventType.subString(2), dispatchEvent, false);
}

function dispatchEvent(event) {
  // event 是原生的事件对象
  let { target, type } = event; // target 就是 dom
  let eventType = `on${type}`;
  updateQueue.isBatchingUpdate = true;
  while (target) {
    // 手动冒泡
    let { store } = target;
    let listener = store && store[eventType]; // 从 dom 身上取下用户的 listener
    if (listener) {
      let syntheicEvent = createSyntheticEvent(event);
      syntheticEvent.mativeEvent = event;
      listener.call(target, syntheticEvent);
    }
    target = target.parentNode;
  }
  updateQueue.batchUpdate();
}

// 合成事件对象
function createSyntheticEvent(nativceEvent) {
  let syntheticEvent = {};
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key];
  }
  return syntheticEvent;
}
```

## Component 类

功能一：创建一个类组件。构造函数接收外面传来的 props

功能二：类组件的 setState 方法，更新组件状态

功能三：类组件的批量更新

功能四：类组件的生命周期钩子

- Component 类
  - setState 方法
    - 每个类组件实例都有一个$updater 容器，用户调用 setState，都会往这个容器中添加这个等待 state
  - forceUpdate 方法
    - 调用类实例上的 render 方法获取 VDOM 和 VDOM 上的 props
    - 触发生命周期钩子 componentWillReceiveProps（组件将接收到 props）
    - 触发生命周期钩子 getDerivedStateFromProps（用户使用 props 更新了 state）
    - 触发生命周期钩子 componentWillUpdate（组件将开始更新）
    - 调用 createDOM 获取新的真实 dom，dom-diff，更新或替换旧的 dom
- updateQueue 对象

  - isBatchingUpdate 属性
    - 控制这个类组件的批量更新状态
  - add 方法
    - 添加一个更新者 updater
  - batchUpdate 方法
    - 遍历所有的 updater 进行批量更新

- Updater 类

  - addState 方法
    - 添加一个等待更新 state
    - 调用 emitUpdate 发射一次更新
  - emitUpdate 方法
    - 发射一次更新
    - 如果是批量更新，则 updateQueue.add 添加一个 Updater 实例（自己）
    - 如果是普通更新，直接调 updateComponent 准备更新类组件
  - updateComponent 方法
    - 调用 shouldUpdate 方法准备更新类组件
  - getState 方法
    - 从所有等待 state 中计算出最新的 state，新旧 state 是合并的，不是替换
    - 返回最新的 state

- ​ shouldUpdate 方法
  - 触发生命周期钩子 shouldComponentUpdate，如果不是返回 false，调用类组件实例的 forceUpdate 直接更新

## 高阶组件

> 基于高阶函数，传入一个老组件，返回一个新组件，函数或类组件都可以
>
> 可以通过新组件给老组件传递 props
>
> 嵌套不要太深（影响渲染性能和可读性）

**render props**

- render 属性（名字可以自定义）

```jsx | pure
ReactDOM.render(<App render={(props) => <div>render 属性</div>}></App>, document.getElementById('root'));
```

- children 是一个渲染的方法

```jsx | pure
ReactDOM.render(<App>{(props) => <div>children 是一个渲染方法</div>}</App>, document.getElementById('root'));
```

- HOC

  传入一个老组件，返回一个新组件

```jsx | pure
function withTracker(OldComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }
    render() {
      return (
        <div>
          <OldComponent {...this.state} />
        </div>
      );
    }
  };
}
function show(props) {
  return (
    <>
      <h1>
        {props.x},{props.y}
      </h1>
    </>
  );
}
```

- 反向继承

  新组件和老组件都是类组件，使新组件继承老组件

  1. 渲染劫持（可以在新组件里面修改老组件）
  2. 增强功能，如操作 state
  3. 注意：子类（新组件）state 和 props 会覆盖父类（老组件）
  4. 场景：例如开发一组相同属性的 Button

```jsx | pure
class Button extends React.Component {
  render() {
    return <button />;
  }
}
const wrapper = (OldComponent) => {
  return class extends OldComponent {
    render() {
      let OldRenderElement = super.render();
      return React.cloneElement(OldRenderElement, OldRenderElement.props, '1');
    }
  };
};
// HOC 父 componentWillMount 儿子 componentWillMount 儿子 componentDidMount 父亲 componentDidMount
//反向 儿子 componentWillMount 父 componentWillMount 儿子 componentDidMount 父亲 componentDidMount
```

- 反向（属性）代理

  通过新组件给老组件传递 props 或者 state

```jsx | pure
function loading = message => OldComponent => {
    return class extends React.Component{
        render(){
            const state = {x:0}
            return (
                <div>
                    {message}
                    <OldComponent {...this.props} {...state}/>
                </div>
            )
        }
    }
}
function show(props){
    return (<div>{props.x}</div>)
}
const LoadingHello = loading('正在加载')(show); // LoadingHello 新的组件
```
