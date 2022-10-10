## 深入认识 JSX

JSX 是一种支持在 js 文件中写 html 标签语法的 JavaScript 语法扩展。

实际用法：

```jsx | pure
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
// 会被编译成以下的代码：
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

### React 必须在作用域内

由于 JSX 语法会被编译成`React.createElement`的调用形式，所以一定要在使用 JSX 语法的模块中引入`react`：

```jsx | pure
// 这是必须的
import * as React from 'react';

function MyButton(props){
    return <button {...props}></button>
}
```

> 如果是通过`script`标签加载的，则必须将 React 挂载到全局变量中

### 使用点语法

当一个模块导出了多个 React 组件时，JSX 允许使用点语法渲染其中一个组件：

```jsx | pure
import * as React from 'react';

const Mycomponents = {
    DatePicker: function DatePicker(){return <div>date picker</div>},
    TimePicker: function TimePicker(){return <div>time picker</div>}
}

function Picker(props){
    // 使用了点语法
    return <Mycomponents.DatePicker {...props}/>
}
```

### React 组件必须以大写字母开头

如果不实用大写字母开头，React 内部会把他当作普通 HTML 标签来处理

### 运行时选择类型

当你需要根据表达式来（动态）决定渲染元素类型时，必须使用中间变量来存储组件的组件名，而不是直接使用表达式：

```jsx | pure
import * as React from 'react';

const MyComponents = {
    photo: function(){return <div>photo</div>},
    video: function(){return <div>video</div>}
}

function Component(props){
    // 错误的写法：
    return <MyComponents[props.type] {...props} />
    // 正确的写法：
    const CurrentComponent = MyComponents[props.type];
    return <CurrentComponent {...props} />
}
```

### JSX 中的 Props

使用`{}`来包裹一个 JavaScript 表达式，作为 props 传递给 JSX 元素：

```jsx | pure
<Compoennt number={1+2+3+4}/>
```

以下 JSX 的写法是等价的：

```jsx | pure
// 1.表达式
<Compoennt msg={'hello world'}/>
// 2.字面量
<Compoennt msg='hello world'/>
```

### Props 默认值为“true”

以下 JSX 的写法是等价的：

```jsx | pure
<Compoennt autocomplete />

<Compoennt autocomplete={true} />
```

### 属性展开

`...`语法。由于这种用法会将 props 全部传递给子组件，导致没必要的 props 也往下穿透了，建议谨慎使用（使用前先过滤一下）

### 子元素

可以通过`porops.children`获取到子元素：

```jsx | pure
function Component(props){
    // 可以添加自定义逻辑。。。
    // 可以粗暴地类比为 ng、vue 的插槽，但不完全一致
    
    return <div>Component children：{props.children}</div>
}

function App(){
    return <Component>hello world</Component>
}
```

### 布尔类型、null 以及 undefined 会被过滤

`false/true`、`null`、`undefined`都是合法的子元素，然而它们不会被渲染（如果你希望渲染这样的值，可以使用`JSON.stringify`语法将其转成字符串）

因此你可以在表达式中使用`&&`来选择是否渲染：

```jsx | pure
function Component(props){
    return 
    (<div>
        {props.list.length > 0 && <div>hello world</div>}
    </div>)
}
```

## 性能优化

### 生产版本

安装[Chrome 的 React 开发者工具](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)来检查：

深色图标表示生产模式，红色图标表示开发模式

### 构建

- 如果你的项目是通过`crate-react-app`脚手架构建的，运行：

```bash
 npm run build
```

- 使用`Brunch`进行构建：

```bash
// 安装
npm install --save-dev terser-brunch
// 创建生产构建
brunch build -p
```

- 使用`Browserify`进行构建：

```bash
npm install -g browserify # 全局安装browserify
npm install --save-dev envify terser uglifyify # 安装优化插件

browserify ./index.js \ # 入口模块index.js
  -g [ envify --NODE_ENV production ] \ # 设置环境变量
  -g uglifyify \ # 移除未引用代码
  | terser --compress --mangle > ./bundle.js # terser压缩；输出为bundle.js
```

- 使用`Rollup`进行构建：

```bash
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser # 安装优化插件
```

在文件`rollup.config.js`中添加以下配置：

```js
plugins: [
    // ...设置环境变量
    require('rollup-plugin-replace')({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // ...支持 commonjs
    require('rollup-plugin-commonjs')(),
    // ...terser 压缩
    require('rollup-plugin-terser')(),
    // ...
]
```

- 使用`Webpack`进行构建：

webpack4+生产模式下默认开启压缩，你也可以在`webpack.config.prod.js`中添加以下配置：

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
};
```

### 使用 Performance 分析 React 组件

...需要手动实践一下

### 虚拟长列表

热门的虚拟滚动库：`react-window`和`react-virtualized`，它们都提供了多种可复用的场景，比如列表、网格和表格数据

### 避免没必要的渲染

React 中使用了”虚拟 DOM“的手段来代替直接操作”真实 DOM“，这样的好处是 React 内部可以根据这个”虚拟 DOM“来计算元素渲染前后的差异（DOM diff），再决定是否需要更新”真实 DOM“

尽管上述的手段可以避免直接操作”真实 DOM“，但无法避免重复渲染带来的时间消耗。所以，请使用`shouldComponentUpdate`来进行提速：

```jsx | pure
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

> `shouldComponentUpdate`的原理是，通过 nextProps 和旧的 props、nextState 和旧的 state 进行比较，进而决定是否渲染（返回 true 则表示需要渲染，默认实现总是返回 true）
>
> 通过继承`React.PureComponent`代替手写`shouldComponentUpdate`：其内部通过**对 props 和 state 的浅比较**来重写了默认实现的`shouldComponentUpdate`

这种浅比较可能会引发意外的 bug：

当你只是修改或新增了引用地址下的某个属性，而再把这个旧的引用地址赋值给新的状态时，浅比较只比较引用地址，实际上引用地址的属性变了，但是比较结果是相同的，导致组件无法被更新

```jsx | pure
// 点击按钮，ListOfWords 并不会被更新
class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>;
    }
}

class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // 这部分代码很糟，而且还有 bug
        // 将旧的 words 直接赋值给新的 word，新旧 words 都是同一个引用地址
        const words = this.state.words;
        words.push('marklar');
        this.setState({words: words});
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick} />
                <ListOfWords words={this.state.words} />
            </div>
        );
    }
}
```

### 不可变数据

鉴于上述提到的浅比较，而开发中往往要避免直接修改 props 和 state 的值

所以，可以这样改写上述代码的例子：

```jsx | pure
// 1.使用 concat 返回一个新数组
handleClick() {
    this.setState(state => ({
        words: state.words.concat(['marker'])
    }));
}
// 2. 使用 ES6 扩展运算符
handleClick() {
    this.setState(state => ({
        words: [...state.words, 'marker']
    }));
}
// 对象类型：可以使用 Object.assign 或者扩展运算符来复制一个新对象
```

## Portals

> 一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀方案

### 用法

`ReactDOM.createPortal(child, container)`

典型用例是当父组件有`overflow:hidden`或`z-index`样式时，但你需要子组件能够在视觉上”跳出“其容器。比如，对话框、悬浮卡以及提示框等

### Portal 事件冒泡

一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树中的祖先：

```html
<html>
    <body>
        <!-- app-root 添加点击监听 -->
        <div id="app-root"></div>
        <!-- modal-root 使用 React.createPortal -->
        <div id="modal-root"></div>
    </body>
</html>
```

在`#app-root`里的`Portal`组件能够捕获到未被捕获的从兄弟节点`#modal-root`冒泡上来的事件

```jsx | pure
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');


function Child() {
    // 点击 button 时，向上冒泡
    return (
        <div className="modal">
            <button>Click</button>    
        </div>
    );
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(      this.props.children,      this.el    );  
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicks: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({      clicks: state.clicks + 1    }));  
    }
    render() {
        // Child 中的 button 被点击时，触发 handleClick 回调
        return (
            <div onClick={this.handleClick}>        
                <p>Number of clicks: {this.state.clicks}</p>
                <Modal>          <Child />        </Modal>      
            </div>
        );
    }
}

ReactDOM.render(<Parent />, appRoot);
```

## Profiler API

> 一种用于测量渲染一个 React 组件多久渲染一次以及渲染一次的“代价”

### 用法

一个是测量组件的`id`，一个是`onRender`（当组件更新时会被 React 调用其回调函数）

```jsx | pure
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>      
        <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

也可以使用多个 Profiler、或者嵌套 Profiler

### onRender 回调

```jsx | pure
function onRenderCallback(
	id, // 发生提交的 Profiler 树的“id”
     phase, // "mount" （如果组件树刚加载）或者 "update" （如果它重渲染了）之一
     actualDuration, // 本次更新 committed 花费的渲染时间
     baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
     startTime, // 本次更新中 React 开始渲染的时间
     commitTime, // 本次更新中 React committed 的时间
     interactions // 属于本次更新的 interactions 的集合
) {
    // 合计或记录渲染时间。。。
}
```

## 不使用 ES6

`create-react-class`模块

## 不使用 JSX

`React.createElement(component, props, ...children)`语法糖

## diff 算法

- 此算法不会尝试匹配不同组件类型的子树（当前的实现中，可以理解为一棵子树能在其兄弟之间移动，但不能移动到其他位置，这种情况下，算法会重新渲染整棵子树）
- Key 应用具有稳定，可预测，以及列表内唯一的特质

## Refs & DOM

### React.createRef()

通过 ref 传递给`render`中的元素，对此元素的引用可以在 ref 的`current`属性中被访问到：

```jsx | pure
class CustomTextInput extends React.Component{
    constructor(props){
        super(props);
        this.textInput = React.createRef();
    }
    
    focus(){
        // 访问 ref
        this.textInput.current.focus();
    }
    
    render(){
        return (
            <div>
                <input 
                    type="text"
                    ref ={this.textInput}/>
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={this.focus}/>
            </div>
        )
    }
}
```

> 无法在函数组件上使用 ref 属性（React.createRef）

然而，可以通过 ref 转发使函数组件也能使用`ref`：

```jsx | pure
const FunctionComponent = React.forwardRef((props, ref)=>{
    return <input ref={ref}/>
})
```

### 回调 Refs

另外一种设置 refs 的方式。

使用`ref`回调函数，在实例的属性中存储对 DOM 节点的引用：

```jsx | pure
class CustomTextInput extends React.Component{
    constructor(props){
        super(props);
        this.textInput = null;
        this.setTextInputRef = element => {this.textInput = element};
    }
    
    focus(){
        // 访问 ref
        this.textInput.current.focus();
    }
    
    componentDidMount(){
        this.focus();
    }
    
    render(){
        return (
            <div>
                 <input 
                    type="text"
                    ref ={this.setTextInputRef}/>
                <input 
                    type="button"
                    value="Focus the text input"
                    onClick={this.focus}/>
            </div>
        )
    }
}
```

> 关于回调 Refs：
>
> 更新过程中它会被执行两次，第一次传入参数`null`，第二次传入参数 DOM 元素。这是因为每次渲染都会创建一个新的函数实例，所以 React 会先清空旧的再设置新的。

## Render Props

> 作用：可以大大提高组件复用逻辑的能力。通过 render props，让可复用组件动态渲染需要的内容

通常，你可以使用 render props 来实现大多数高阶组件（HOC）：

```jsx | pure
function WithMouse(Component){
    return class extends React.Component{
        render(){
            return (
                <Mouse 
                    render= { mouse => (<Component {...this.props} mouse={mouse}/>) } 
                    />
            )
        }
    }
}

class Mouse extends React.Component{
    ...
    render(){
        return (
        	<div>
            	{this.props.render(state)}
            </div>
        )
    }
    ...
}
```

其实，为了如果只是为了达到上述目的，直接使用`children` prop 也可以：

```jsx | pure
<Mouse>
  {mouse => (
    <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
  )}
</Mouse>
```

### 慎重将 Render Props 与 React.PureComponent 一起使用

由于 render 每次都会生成一个新的值，而 React.PureComponent 根据浅比较 props 总会得到 false：

```jsx | pure
class Mouse extends React.PureComponent {
  // 与上面相同的代码......
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          这是不好的！
          每个渲染的 `render` prop 的值将会是不同的。
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

为了改善这个问题，你可以把 render prop 定义成一个实例方法：

```jsx | pure
class MouseTracker extends React.Component {
  // 定义为实例方法，`this.renderTheCat`始终
  // 当我们在渲染中使用它时，它指的是相同的函数
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

## 静态类型检查

## 严格模式

## 使用 PropTypes 类型检查

## 非受控组件

> 受控组件：表单数据由 React 组件来管理
>
> 非受控组件：表单数据由 DOM 节点来处理

## Web Components

## Hook

