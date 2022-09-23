# 《你不知道的 js - 中卷》

[^作者]: AngelPP
[^日期]: 2020-07-25 11:22:00
[^备注]: 仅整理学习笔记用



## 类型和语法

### 类型

#### 1.js 七种内置类型

- 字符串（`string`）
- 数值（`number`）
- 布尔值（`boolean`）
- 空值（`null`）
- 未定义（`undefined`）
- 对象（`object`）
- 符号（`symbol`，ES6 新增）

#### 2.奇怪的 null

- typeof null == "object"

- 检测 null 值

  ```js
  const a = null;
  if(!a && typeof a === 'object'){}
  ```

#### 3.object 的子类型

- 函数，（`function`）

  因为函数有一个_内部属性[[call]]_，使之可以被调用

- 数组，（`array`）

#### 4.值与类型

- 变量没有类型，只有值才有

- 未定义变量，（`undefined`）

- 未声明变量，（`undeclared`）

  直接使用 undeclared 变量会报 RefrenceError 错误

#### 5.typeof

- 用来检测变量的类型

- typeof 的_安全防范机制_

  ```js
  // 这段代码会报 RefrenceError
  if(DEBUG){...}
  // 这段代码却是安全的
  if(typeof DEBUG === 'undefined'){...}
  ```

- 检查变量是否在宿主程序中被定义

### 值

#### 1.数组

- delete 操作符并不会改变数组的 length 属性

- 数组可以同时添加数字索引和字符串索引

  数字索引会改变_length 属性_，但字符串索引不会（除非此字符串可以被强制类型转换为十进制的数字）

#### 2.类数组

一组通过数字索引的值。可以通过_Array.prototype.的函数_处理这些类数组

##### 2.1 字符串

- 不可变，_'改变'_只是重新创建并返回了一个新的字符串

- 可以_'借用'_数组的_非变更成员函数_，处理字符串（不可变）

  join，map...

- 另外一种处理方法，将_字符串转成数组_，处理完再转成字符串

##### 2.2 数字

- 小数点最后面的 0 会被省略

  ```js
  42.00 === 42; // true
  ```

- 指数格式，（toExponential）

- 小数位数，（toFixed）

- 有效数位，（toPrecision）

- 浮点数

  存在精确度的问题

  ```js
  0.1 + 0.2 === 0.3; // false
  // 机器精确度，Number.EPSILON ==> 2^-52
  (0.1 + 0.2) - 0.3 === Number.EPSILON; // true
  ```

- 最大/小正整数

  ```js
  Number.MAX_SAFE_INTEGER（2^53 - 1），Number.MIN_SAFE_INTEGER（1 - 2^53）
  ```

- 整数检测，（isInteger，isSafeInteger）

- 32 位有符号整数，（数位操作的最大位数）

  a | 0 可以将数值快速转换为 32 位有符号整数

#### 3.特殊的数值

- `void`运算符

  ```js
  void a; // 可以获取一个 undefined 返回结果
  ```

- `NaN`

  ```js
  NaN !== NaN; // 自己不等于自己，唯一的非自反值
  // 判断数值是否为 NaN
  // × 方法一：
  isNaN(...); // 全局工具函数，不建议
  // √ 方法二：
  Number.isNaN(...); // 最佳
  ```

- `Infinity`

  有穷数溢出得到无穷数，无穷数无法再转回有穷数

  ```mermaid
  graph LR
  有穷数 --> 无穷数
  无穷数 -.- 有穷数
  ```

- `-0`

  ```js
  0 === -0； // true
  console.log(0 / -3); // -0
  console.log(JSON.parse('-0')); // -0
  console.log(JSON.stringify(-0)); // "0"
  ```

- `Object.is`

  判断两个值是否绝对相等，主要用来处理特殊的相等比较。应该_优先使用==或===_

  ```js
  const a = 2 / 'foo';
  const b = 0 / -3;
  console.log(Object.is(a, NaN)); // true
  console.log(Object.is(b, 0)); // false
  console.log(Object.is(b, -0)); // true
  ```

#### 4.值和引用

- 简单值（标量基本类型值，null，undefined，string，number，boolean，symbol）：_值复制方式来赋值/传递_

- 复合值（对象—数组和封装对象，函数）：_引用复制方式来赋值/传递_

- _一个引用无法更改另外一个引用的指向_

- _标量基本类型值是不可更改的_，改变变量的标量基本类型值只会重新创建一个包含新值的数字对象

  ```js
  // 引用传递
  (function(){
      function foo(x){
          x.push(4);
          console.log(x); // [1, 2, 3, 4]
      
          x.length = 0;
          x.push(...[5, 6, 7, 8]);
          console.log(x); // [5, 6, 7, 8]
      }
      
      var a = [1, 2, 3];
      
      foo(a);
  })();
  // 值传递
  (function(){
      function foo(x){
          x = x + 1;
          console.log(x);
      }
  
      var a = 2;
      var b = new Number(a);
  
      foo(b);
      console.log(b); // 2
  })();
  ```

### 原生函数

