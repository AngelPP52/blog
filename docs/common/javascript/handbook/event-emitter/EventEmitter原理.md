# EventEmitter原理

[^日期]: 2020-06-02 22:13:00
[^作者]: AngelPP

## 一.常用API

### EventEmitter.prototype.on

- 订阅，每次发布时都会调用回调函数

### EventEmitter.prototype.once

- 仅能订阅一次，每次调用完后，把回调函数从缓存中删掉

### EventEmitter.prototype.off

- 取消订阅，把指定的回调函数从缓存中删掉

### EventEmitter.prototype.emit

- 发布

### Event['newListener']

- 监听订阅事件的发生

### 代码

> ````javascript
> function EventEmitter() {
>     this.events = {}; // 缓存订阅的事件
> }
> 
> /**on**/
> EventEmitter.prototype.on = function (eventName, callback) {
>     // 如果订阅的类型不是newListener，则立即发布一次newListener的回调
>     if(eventName !== 'newListener'){
>         this.emit('newListener', eventName);
>     }
> 
>     // 将订阅的回调函数缓存起来
>     (this.events[eventName] || (this.events[eventName] = [])).push(callback);
> }
> 
> /**once**/
> EventEmitter.prototype.once = function (eventName, callback) {
>     // 创建一个临时的订阅回调
>     // 第一次发布时，会执行noce回调，并且把eventName下的callback从缓存中删掉
>     // 每次once发布时，都会创建一个新的临时的订阅回调
>     let once = (...args) => {
>         callback(...args);
>         this.off(eventName, callback);
>     }
>     once.listener = callback;
>     this.on(eventName, once);
> }
> 
> /**off**/
> EventEmitter.prototype.off = function (eventName, callback) {
>     // cb!==callback：on订阅
>     // cb.listener !== callback：once订阅
>     this.events[eventName] = this.events[eventName].filter(cb=>(cb!==callback) && (cb.listener !== callback));
> }
> 
> /**emit**/
> EventEmitter.prototype.emit = function (eventName, ...args) {
>     // 遍历缓存，将所有订阅回调函数取出来一个一个执行
>     (this.events[eventName] || []).forEach(cb => {
>         cb(...args);
>     });
> }
> 
> module.exports = EventEmitter;
> ````

