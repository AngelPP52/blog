# Promise原理

[^日期]: 2020-05-24 9:30
[^作者]: Angel屁屁

## 一.高阶函数

### 特征

- 返回值是一个函数

### 应用场景

- 类型判断
- before函数，after函数
- 柯里化

### 查缺补漏

- fn.length，函数的参数个数
- 闭包函数，函数的定义位置和执行位置不在同一个作用域下

### 示例代码

> ```javascript
> /**判断类型**/
> function isType(type,value){
> 	return Object.prototype.toString.call(value) === `[object ${type}]`
> }
> /**是否为数组**/
> function isArray(value){
> 	return isType('Array', value);
> }
> /**柯里化**/
> function currying(fn, arr = []){
> 	let fnLen = fn.length;
> 	return function(...args){
> 		let arrTmp = [...arr, ...args];
> 		if(arrTmp.length < fnLen){
> 			return curring(fn, arrTmp);
> 		}else{
> 			return fn(...arrTmp);
> 		}
> 	}
> }
> ```



## 二.发布订阅模式

### 特征

- 订阅on，把回调函数缓存到数组
- 发布emit，让数组中的回调函数依次执行
- 发布与订阅之间不存在关联

### 应用场景

- eventEmitter 

## 三.观察者模式

### 特征

- 观察者Subject，需要收集被观察者，状态变化时，依次通知
- 被观察者Observer，
- 观察者与被观察者之间存在关联

### 应用场景

- 视图更新
- redux状态机

### 与发布订阅模式的区别

- 观察者模式，在状态变化时，通知观察者们
- 发布订阅模式，手动发布

## 四.Promise

### 特征

- 成功态fullfiled，失败态rejected，等待态pending
- 成功态和失败态由用户自定义的
- 执行器( resolve , reject ) =>  {} 会被立即执行
- then方法，一个参数是成功回调，另一个是失败回调
- 一旦成功或失败，状态不可逆

### 应用场景

- 多个异步请求，Promise.all
- 链式异步请求，往下传递返回值，解决回调地狱
- 优雅处理错误信息，catch

### then链式调用的原理

- 成功或失败回调的返回值会往下层then传递 
- 成功或失败回调返回普通值（传递给下层的成功中），throw出错情况（传递给下层的失败中），还有promise情况（根据promise的状态决定传递给成功还是失败）
- then方法返回一个新的promise

### resolvePromise代码

- 场景：onFullfilled和onRejected方法可能会返回一个promise
- 考虑因素：
  - [x] 防止onFullfilled和onRejected方法返回了p，导致p === x，循环引用
  - [x] 如何判断传入的x就是一个promise
  - [x] 兼容其他库的promise
  - [x] 维护状态不可逆的原则，预防其他库的不规范
  - [x] 如果用户又resolve了一个promise，应该等待这个promise的结果
  - [x] 防止其他库的promise，报了错，走完resolve之后又走reject，反之亦然

> ```javascript
> const resolvePromise = (p, x, resolve, reject) => {
>     // 防止循环引用
>     if (p === x) {
>         return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
>     }
>     let called; // 判断resolve或reject是否执行过了
>     // 判断x是一个promise **重点**
>     if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
>         try {
>             let then = x.then;
>             if (typeof then === 'function') { // 到这里，只能只为x就是一个promise
>                 then.call(x, y => {
>                     if (called) return;
>                     called = true;
>                     // y可能又是一个promise,递归解析
>                     resolvePromise(p, y, resolve, reject);
>                 }, r => {
>                     if (called) return;
>                     called = true;
>                     reject(r);
>                 })
>             } else { // 普通值
>                 resolve(x);
>             }
>         } catch (e) {
>             if (called) return;
>             called = true;
>             reject(e);
>         }
>     } else {
>         resolve(x);
>     }
> }
> ```

### then代码

- 使用：用户调用then方法时，传入onFullfilled和onRejected方法
- 考虑因素：
  - [x] 用户在异步中调用resolve/reject 
  - [x] then支持链式调用
  - [x] 传入onFullfilled和onRejected方法中抛出了异常
  - [x] 传入onFullfilled和onRejected方法返回值是一个promise

> ```javascript
> const then = (onFullfilled, onRejected) => {
>     // then返回新的promise,支持链式调用
>     let p2 = new Promise((resolve, reject) => {
>         // FULLFILLED
>         if (this.status === FULLFILLED) {
>             // 解决resolvePromise传入p2时，p2已经有值
>             setTimeOut(() => {
>                 // 解决onFullfilled中存在的异步代码抛出错误
>                 try {
>                     // 解决返回值x仍是一个promise
>                     let x = onFullfilled(this.value);
>                     resolvePromise(p2, x, resolve, reject);
>                 } catch (e) {
>                     reject(e);
>                 }
>             }, 0);
>         }
>         // REJECTED
>         if (this.status = REJECTED) {
>             // 解决resolvePromise传入p2时，p2已经有值
>             setTimeOut(() => {
>                 // 解决onFullfilled中存在的异步代码抛出错误
>                 try {
>                     // 解决x还是一个promise
>                     let x = onRejected(this.reason);
>                     resolvePromise(p2, x, resolve, reject);
>                 } catch (e) {
>                     reject(e);
>                 }
>             }, 0);
>         }
>         // PENDING
>         if (this.status === PENDING) {
>             // 解决异步的resolve
>             this.onResolveCallbacks.push(() => {
>                 // 解决resolvePromise传入p2时，p2已经有值
>                 setTimeOut(() => {
>                     // 解决onFullfilled中存在的异步代码抛出错误
>                     try {
>                         // 解决x还是一个promise
>                         let x = onFullfilled(this.value);
>                         resolvePromise(p2, x, resolve, reject);
>                     } catch (e) {
>                         reject(e);
>                     }
>                 }, 0);
>             });
>             // 解决异步的reject
>             this.onRejectCallbacks.push(() => {
>                 // 解决resolvePromise传入p2时，p2已经有值
>                 setTimeOut(() => {
>                     // 解决onFullfilled中存在的异步代码抛出错误
>                     try {
>                         // 解决x还是一个promise
>                         let x = onRejected(this.reason);
>                         resolvePromise(p2, x, resolve, reject);
>                     } catch (e) {
>                         reject(e);
>                     }
>                 }, 0);
>             })
>         }
>     });
> }
> ```

### resolve和reject静态方法

- 考虑因素：
  - [x] 返回一个promise
  - [x] 一个是成功态的promise，一个是失败态的promise

> ```javascript
> /**resolve**/
> static resolve(data) {
>     return new Promise((resolve, reject) => {
>         resolve(data);
>     })
> }
> /**reject**/
> static reject(err) {
>     return new Promise((resolve, reject) => {
>         reject(err);
>     })
> }
> ```

### finally代码

- 考虑因素：
  - [x] 一定会执行传入的回调函数
  - [x] 如果finally里面的回调函数返回了一个promise，会等待它执行完成
  - [x] 如果这个promise成功了，使用上一层的返回值value传递给下一层
  - [x] 如果这个promise失败了，用他的失败原因传给下一层

> ```javascript
> const finally = (callback) => {
>     return this.then((value)=>{
>         return Promise.resolve(callback()).then(()=>value);
>     },(reason)=>{
>         return Promise.resolve(callback()).then(()=>{throw reason});
>     })
> }
> ```

### promisify代码

- 考虑因素：
  - [x] 将一个回调函数变成promise
  - [x] 一般用于转化node中的api
  - [x] 返回值是一个函数，此函数的返回值是一个promise

> ````javascript
> const promisify = (fn) =>
>     (...args) => new Promise((resolve, reject) => {
>         fn(...args, function (err, data) {
>             if(err)reject(err);
>             resolve(data);
>         });
>     });
> ````

### Promise.all代码

- 考虑因素：
  - [x] 等待参数里面的promise都执行并返回数据时，最终返回所有结果
  - [x] 判断参数里面的promise是否为真正的promise
  - [x] 任意一个promise为失败态，直接返回失败态的promise

> ```javascript
> /**判断是否为promise**/
> const isPromise = (value) => typeof value.then === 'function';
> /**all**/
> Promise.all = (promises) => {
>     return new Promise((resolve, reject) => {
>         let result = []; // 存放返回结果
>         let count = 0; // promise完成计数器
>         const setResult = (index, value) => {
>             result[index] = value;
>             if (++count === promises.length) {
>                 resolve(result);
>             }
>         }
>         for (let i = 0; i < promises.length; i++) {
>             let p = promises[i];
>             if (isPromise(p)) {
>                 p.then(data => {
>                     setResult(i, data);
>                 }, err => {
>                     reject(err);
>                 })
>             } else {
>                 setResult(i, p);
>             }
>         }
>     })
> }
> ```

### Promise.race代码

- 考虑因素：
  - [x] 谁先执行完毕，就返回谁的结果
  - [x] 如果已经返回了结果，其他promise再返回的值将不再处理

> ```javascript
> /**race**/
> Promise.race = (promises) => {
>     return new Promise((resolve,reject)=>{
>         for (let i = 0; i < promises.length; i++) {
>             const p = promises[i];
>             if (isPromise(p)) {
>                 p.then(resolve, reject);
>             } else {
>                 resolve(p);
>             }
>         }
>     })
> }
> ```

### 中断Promise

- 考虑因素：
  - [x] 用户调用promise实例的abort方法来达到中断效果

> ```javascript
> /**中断一个Promise**/
> const wrap = (p) => {
>     let abort;
>     let newP = new Promise((resolve,reject)=>{
>         abort = reject;
>     });
>     let raceP = Promise.race([p,newP]);
>     raceP.abort = abort;
>     return raceP;
> }
> ```

- 如何中断Promise.then调用链？

> ```javascript
> Promise.resolve(100).then().then(()=>{
> 	return new Promise((resolve,reject)=>{});
> }).then(data=>console.log(data));
> ```

## 五.async/await

### Symbol.iterator遍历器

- 特征：
  - [x] 支持...展开运算符
  - [x] 可以用for of遍历
  - [x] 一种类数组
  - [x] 返回值是一个对象
  - [x] 返回对象要有一个next方法，
  - [x] next方法的返回值格式是{value: *,done: *}

- 代码：

> ```` javascript
> const likeArray = {a:1,b:2,c:3,length:3};
> /**遍历器**/
> likeArray[Symbol.iterator] = () => {
>     let i = 0;
>     return {
>         next(){
>             return {value: this[i], done: i++ === this.length}
>         }
>     }
> }
> ````

### generator生成器

- 特征：

  - [x] generator函数可以生产一个遍历器
  - [x] 与yield结合使用

- 代码：

  > ````javascript
  > likeArray[Symbol.iterator] = function * (){
  >     let i = 0;
  >     while(i < this.length){
  >         yield this[i++];
  >     }
  > }
  > ````

### yield

- 特征：
  - [x] 每次调用next，遇到yield时，代码会暂停执行
  - [x] 第二次以后的next方法的传参，会给上一次yield的返回值赋值
  - [x] 可以使异步代码编写起来更像同步代码
  - [x] 可以使用try catch方式来捕获错误

### co库

- 特征：
  - [x] 处理生成器异步迭代的丑陋的读取代码
  - [x] 返回一个promise
  - [x] 传入参数是一个生成器函数
- 代码：

> ```javascript
> function* read() {
> 	let name = yield fs.readFile('name.txt', 'utf-8');
> 	let age = yield fs.readFile(name, 'utf-8');
> 	return age;
> }
> /**丑陋的读取代码**/
> let { value, done } = it.next();
> value.then(age => {
> 	let { value, done } = it.next(age);
> 	value.then(age => {
> 		console.log(age);
> 	}, err => {
> 		console.log(err);
> 	})
> }, err => {
> 	console.log(err);
> })
> /**co实现**/
> const co = it => {
> 	return new Promise((resolve, reject) => {
> 		let next = (data) => {
> 			let { value, done } = it.next(data);
> 			if (!done) {
> 				Promise.resolve(value).then(next, reject);
> 			} else {
> 				resolve(value);
> 			}
> 		}
> 		next();
> 	});
> }
> ```
>
> 

### async/await特性

- async包装的函数返回一个promise
- await后面跟着一个返回值是promise的函数
- await相当于yield，await后面的逻辑会被包裹在返回值promise的then方法内

## N.浏览器兼容语法

- mdn
- can i use









