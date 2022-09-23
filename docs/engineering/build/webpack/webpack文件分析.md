# webpack文件分析

## Symbol.toStringTag

> 重新定义默认toString方法的输出类型

## Object.create(null)

> 创建一个没有原型链的对象

## require上的特殊属性

为了压缩代码体积，使用简写的字母来表示

### require.m

>  modules
>
> 所有模块，存储key value的一个对象

```js
__webpack_require__.m = modules;
```

### require.c

> installedModules
>
> 缓存/已加载模块

```js
__webpack_require__.c = installedModules;
```

### require.d

> 给exports定义一个可枚举属性，并挂载其getter（get方法）
>
> Object.definedProperty

```js
__webpack_require__.d = function (exports, name, getter) {
 if (!__webpack_require__.o(exports, name)) {
   Object.defineProperty(exports, name, { enumerable: true, get: getter });
 }
};

```

### require.o

> 判断exports上是否有某个属性
>
> Object.prototype.hasOwnProperty

```js
__webpack_require__.o = function (object, property) {
 return Object.prototype.hasOwnProperty.call(object, property);
};
```

### require.r

> 定义exports为一个es模块（判断条件：只要有export或import节点）
>
> exports[Symbol.toStringTag] = 'Module'，使输出exports.toString() === [Object Module]
>
> exports.__esModule = ture

```js
__webpack_require__.r = function (exports) {
 if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
   Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
 }
 Object.defineProperty(exports, "__esModule", { value: true });
};
```

### require.n

> 获取导出的函数，且兼容非harmony模块（commonjs模块）
>
> 返回一个getter，getter.a的返回值 --> es模块：`module['default']` ，`commonjs模块：module`
>
> getter.a的返回值 --> `es模块：module['default']` ，` commonjs模块：module`

```js
__webpack_require__.n = function (module) {
 var getter =
   module && module.__esModule
     ? function getDefault() {
         return module["default"];
       }
     : function getModuleExports() {
         return module;
       };
 __webpack_require__.d(getter, "a", getter);
 return getter;
};
```

### require.t

> 把任意模块变成一个es模块

```js
/**
   * 创建一个模拟的命名空间对象
   * mode & 1 value是模块ID直接用__webpack_require__加载
   * mode & 2 把所有的属性合并到命名空间ns上
   * mode & 4 当已经是命名空间的时候(__esModule=true)可以直接返回值
   * mode & 8|1 行为类似于require
   */
// mode = {sholdRequire: true, copyProperties: true, nowWrapper: true, directReturn: true}
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === "object" && value && value.__esModule)
      return value;
    var ns = Object.create(null); //定义一个空对象
    __webpack_require__.r(ns);
    Object.defineProperty(ns, "default", { enumerable: true, value: value });
    if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  };

```

### require.p

> publicPath,配置属性

### require.e

> 按需加载异步模块
>
> 内部包装成一个

```js
__webpack_require__.e = function requireEnsure(chunkId) {
 var promises = [];
 var installedChunkData = installedChunks[chunkId]; // 一个二维数组 [[resolve,reject,promise]...]
 if (installedChunkData !== 0) { // chunkId未加载
   if (installedChunkData) { // 如果chunkId已经开始加载，增加一个promises
     promises.push(installedChunkData[2]);
   } else { // chunkId从未被加载
     var promise = new Promise(function (resolve, reject) {
       installedChunkData = installedChunks[chunkId] = [resolve, reject]; // 将异步模块记录到installedChunks，已完成的chunk是0，异步模块是二位数组
     });
     promises.push((installedChunkData[2] = promise));
     // jsonp开始按需加载
     var script = document.createElement("script");
     script.charset = "utf-8";
     script.timeout = 120;
     script.src = jsonpScriptSrc(chunkId);
     document.head.appendChild(script);
   }
 }
 return Promise.all(promises);
};
```

### 简易的webpack打包代码

```js
(function (modules) { // 一个存储了key（文件路径）和value（一个函数，函数体是用户自己写的代码）的模块对象
  var installedModules = {}; // 模块是否被缓存
  function require(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId];
    }
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });
    modules[moduleId].call(modules.exports, module, module.exports, require); // modules --> value --> 一个函数（函数体是用户自己写的代码）
    module.l = true;
    return module.exports;
  }
  return require((require.s = "./src/index.js"));
})({
  "./src/index.js": function (module, exports, require) {
    var title = require("./src/title.js");
    console.log(title);
  },
  "./src/title.js": function (module, exports) {
    module.exports = "title";
  },
});
```

## 兼容非harmony模块

### commonjs 加载commonjs

> 不需要改变

### commonjs加载esModule 

> 模拟esModule的实现
>
> require.r方法和require.d方法

tip：export default 和export可以同时写到同一个文件，但export default只需要定义一次

### esModule 加载esModule

> 模拟esModule的实现

### esModule加载commonjs

> require.r方法（自己的模块）和require.n方法（别的模块）

## 按需加载

> 原理：将懒加载的文件分隔成独立代码块，需要时，通过jsonp和promise来加载
>
> chunkId --> jsonp加载代码块 --> 通过promise获取到代码块 --> 将懒加载的代码块挂载到modules中 --> 使用\__webpack_require__从modules中导入代码块

```js
// ****动态import('./lazy')语法打包后的代码
__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./lazy */ "./src/lazy.js")); 

// ****使用了动态import的代码块，自执行函数体会加下面的代码
var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || []; // 定义window["webpackJsonp"]
var oldJsonpFunction = jsonpArray.push.bind(jsonpArray); // 旧的window["webpackJsonp"].push方法
jsonpArray.push = webpackJsonpCallback; // 重写数组window["webpackJsonp"].push方法
jsonpArray = jsonpArray.slice(); // 浅拷贝一个新的数组
for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]); // 清空window["webpackJsonp"]的moreModule
var parentJsonpFunction = oldJsonpFunction; // 缓存旧的push方法

// ****新的push方法
function webpackJsonpCallback(data) {
	var chunkIds = data[0];
	var moreModules = data[1];
	var executeModules = data[2]; // [入口模块,延迟模块列表]
    
	var moduleId, chunkId, i = 0, resolves = [];
	for(;i < chunkIds.length; i++) {
		chunkId = chunkIds[i];
		if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) { // chunk未加载完成，且chunk是异步chunk
			resolves.push(installedChunks[chunkId][0]); // 取chunkId对应的resolve
		}
		installedChunks[chunkId] = 0; // chunkId=>chunk已经加载
	}
	for(moduleId in moreModules) {
		if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
			modules[moduleId] = moreModules[moduleId]; // 把异步chunk的模块添加到modules中
		}
	}
	if(parentJsonpFunction) parentJsonpFunction(data); // 调用旧的push方法，往window["webpackJsonp"]存已加载的chunk

    while(resolves.length) {
		resolves.shift()(); // 使promises完成
	}

    // 对延迟列表添加入口模块
	deferredModules.push.apply(deferredModules, executeModules || []);
    
	return checkDeferredModules();
};

// ****deferredModules,对延迟列表添加入口模块
// 先将延迟模块添加到modules中，再执行入口模块，这个时候入口模块就可以拿到延迟列表的模块代码了
// deferredModules是一个二维数组，[['入口模块','延迟模块1',...],...]
deferredModules.push(["./src/pageA.js","vendors-pageA-pageB-pageC","commons-pageA-pageB-pageC"]); 
function checkDeferredModules() {
    var result;
    for(var i = 0; i < deferredModules.length; i++) {
        var deferredModule = deferredModules[i];
        var fulfilled = true;
        for(var j = 1; j < deferredModule.length; j++) { // 从1开始，跳过入口模块，判断延迟模块是否全部加载完成
            var depId = deferredModule[j];
            if(installedChunks[depId] !== 0) fulfilled = false;
        }
        // 延迟模块已经全部加载完成
        if(fulfilled) {
            deferredModules.splice(i--, 1); // 全部加载完成后，删除
            result = __webpack_require__(__webpack_require__.s = deferredModule[0]); // 开始加载入口模块
        }
    }
}
```

------

如有不足，欢迎指出，共同进步！

