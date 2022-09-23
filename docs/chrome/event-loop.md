# EventLoop原理

[^日期]: 2020-05-31 21:56:00
[^作者]: Angel屁屁

## 一.浏览器中的EventLoop

### JS引擎线程

- 与GUI渲染线程时互斥的

### GUI渲染线程

- 界面渲染

### 事件触发线程

- EventLoop轮询

### 事件线程

- click，setTimeout，ajax
- 特点：当等待事件达到，或者成功后，将回调的方法放到宏任务中

### 宏任务/微任务

- 宏任务可以理解是一个一个执行的
  - JS执行栈，同步/异步代码
  - ajax，setTimeout，setInterval，event。每次拿出一个回调方法，放到JS执行栈中执行
  - ui
  - requestAnimation
  - setImmediate
  - MessageChanel
- 微任务会在JS引擎线程处理完执行栈的代码后，一次性清空
  - Promise.then
  - MutationObserver
  - process.nextTick

## 二.Node中的EventLoop

### 事件轮询机制

[事件轮询机制]: https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/	"引自Node官网"

```javascript
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

### 事件轮询阶段

- timers（定时器）：处理setTimeout和setInterval的回调函数。在这个阶段，会清空已完成的定时器的回调函数列表
- pending callbacks：略
- idle, prepare：略
- poll（轮询）：检索新的I/O事件，清空轮询列表
- check（检测）：setImmediate回调函数。如果检测不到可执行脚本，就会开始下一次轮询，或者轮询终止（代码结束）
- close callbacks：略

### process.nextTick

- 属于微任务
- 优先级高于Promise.then
- 不属于事件环的一部分