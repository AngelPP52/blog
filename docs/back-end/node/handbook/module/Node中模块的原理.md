# Node中模块的原理

[^日期]: 2020-05-31 22:4:00
[^作者]: Angel屁屁

## 一.模块化规范

### commonjs规范

- 模块拆分，方便管理和维护
- 模块间互相独立，解决变量冲突问题（单例模式）
- 一个文件一个模块
- 使用module,exports导出给其他模块使用
- 使用require引入其他模块的导出结果

### 其他规范

- es6Module（import/export）
- umd统一模块规范（支持commonjs/requirejs）
- amd规范（requirejs）
- cmd规范（seajs）

## 二.模块的分类

### 核心模块

node自带的

- fs文件模块
- path路径模块
- vm虚拟机模块，沙箱（干净的环境）

### 第三方模块

npm下载的包 

### 自定义模块

自己写的

## 三.模板引擎的实现原理

### 其他模板引擎

- ejs

### 自定义模板引擎

- 原理：with语法 + 字符串拼接 + new Function
  - [x] 正则匹配特殊字符串
  - [x] 将{{}}模板变量转成\`${}\`形式
  - [x] 使用with包装出一个沙箱环境
  - [x] 使用模板字符串`去拼接模板字符串
  - [x] 使用new Function把模板字符串转成一个可执行脚本

## 四.Node中require方法的原理

### Node中的调试方法

- 浏览器
- webstorm或vs code自带的调试
- 控制台

### require方法的源码

- 流程：
  - [x] Module.prototype.require，用户使用require引入模块时，会自动调用此方法
  - [x] Module._load，返回值是module.exports
  - [x] Module._resolveFilename，获取模块的文件绝对路径。添加.js，.json，.node后缀名
  - [x] Module._cache，查看模块是否已经被缓存
  - [x] 根据id和parent，创建新的模块对象
  - [x] 缓存这个模块对象
  - [x] tryModuleLoad尝试去加载该模块
  - [x] Module.prototype.load，module.load加载当前模块
  - [x] 根据Module._extensions的策略模式，查找扩展名对应调用相应的策略函数并且调用它
  - [x] js文件的策略函数：
    - 获取文件内容
    - 调用Module.prototype._compile方法
    - Module.wrap方法，使用(function (exports, require, module, _filename, _dirname){})()把文件内容包装成一个自执行函数
    - 提供一个沙箱环境，运行上面的自执行函数
    - 模块文件中，用户会给module.exports赋值，此时module._load的返回值就有值了
  - [x] json文件的策略函数：
    - 读取文件内容
  - 使用JSON.parse()运行文件内容，然后给module.exports赋值
  - [x] node文件的策略函数：
    - 略
  
- 实现代码：

  > ````javascript
  > let fs = require('fs');
  > let path = require('path');
  > let vm = require('vm');
  > 
  > 
  > 
  > function Module(fileName) {
  >     this.id = fileName;
  >     this.exports = {};
  > }
  > 
  > Module._cache = {};
  > 
  > Module._extensions = {
  >     '.js': (module, fileName) => {
  >         let content = fs.readFileSync(fileName, 'utf8');
  >         module._compile(content, fileName);
  >     },
  >     '.json': (module, fileName) => {
  >         let content = fs.readFileSync(fileName, 'utf8');
  >         module.exports = JSON.parse(content);
  >     },
  >     '.node': (module, fileName) => { }
  > }
  > 
  > Module.wrap = (code) => {
  >     // 拼接成可执行函数字符串
  >     let fnStr = `(function (exports, require, module, __filename, __dirname){${code}})`;
  >     return fnStr;
  > }
  > 
  > Module._load = (id) => {
  >     let cacheModule = Module._cache[id];
  >     if (cacheModule) {
  >         return cacheModule.exports;
  >     }
  >     // 获取文件绝对路径
  >     let fileName = path.resolve(__dirname, id);
  >     let keys = Object.keys(Module._extensions);
  >     for (let i = 0; i < keys.length; i++) {
  >         const key = keys[i];
  >         if (fs.existsSync(fileName + key)) {
  >             fileName += key;
  >             break;
  >         }
  >     }
  >     // 创建新的module实例
  >     let module = new Module(fileName);
  >     Module._cache[id] = module;
  >     // 尝试加载module
  >     tryModuleLoad(module, fileName);
  > 
  >     return module.exports;
  > }
  > 
  > const tryModuleLoad = (module, fileName) => {
  >     module.load(fileName);
  > }
  > 
  > Module.prototype.load = function (fileName) {
  >     // 获取文件扩展名，根据扩展名获取策略函数
  >     let extName = path.extname(fileName);
  >     let extFn = Module._extensions[extName];
  >     extFn(this, fileName);
  > }
  > 
  > Module.prototype._compile = function (code, fileName) {
  >     let fnStr = Module.wrap(code); // 自执行函数的字符串
  >     let fn = vm.runInThisContext(fnStr); // 使用一个沙箱来执行上面函数
  >     let exports = this.exports;
  >     let require = qqRequire;
  >     let module = this;
  >     let __filename = fileName;
  >     let __dirname = path.dirname(fileName);
  >     fn.call(exports, exports, require, module, __filename, __dirname); // this指向exports
  > }
  > 
  > /** 这个是我要自定义的require **/
  > const qqRequire = Module.prototype.require = function (id) {
  >     return Module._load(id)
  > }
  > ````
  ## 五.Node中模块的module.exports,exports,this分别表示

- module.exports
  - require方法最终返回的是module.exports
- exports：等于module.exports
  - 注意：exports = \**的写法是不对的，原因是，exports被改了，并不会导致module.exports改变。而写成exports.a = **才是正确的。
  - 如果module.exports和exports同时改变地址指向，最终只会以module.exports为准
- this：指向module.exports