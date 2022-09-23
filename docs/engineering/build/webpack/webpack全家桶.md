

# webpack全家桶

## webpack-flow编译流程

- 初始化参数（配置文件） 					==> 
  
  开始编译（`compiler`对象run方法）    ==> 
  
  编译模块（执行各种`loader`） 			==> 
  
  完成模块编译（每个模块的依赖关系） ==> 
  
  输出资源（组装chunk） 					   ==> 
  
  输出完成（文件系统）
  
  - Compiler：整个webpack对象
  - Compilation：编译对象，每次编译都有一个compilation对象，包含modules chunks assets属性
    - module
    - chunk，一个代码块
    - chunkGroup，chunk分组
    - asset，一个资源
    - file，一个文件

## webpack-loader

> why loader？将非js模块转成js模块
>
> 指定加载自定义loader的方法：1.rules的use**使用绝对路径**；2.resolveLoader中定义**alias别名**；3.resolveLoader中配置modules，**指定loader查找目录**
>
> this指向？指向loaderContext，每个loader都有自己的上下文对象
>
> loader-utils包的getOptions方法可以获取用户配置，stringifyRequest将绝对路径转成相对路径
>
> loader.raw设置为true：告诉webpack不把原文件转成字符串，对于一些图片文件

- babel-loader
  - 核心包：@babel/core，@babel/preset-env（真正进行转换的预设集合）
  - babel的作用：将es6语法转成es5语法
  - pollyfill的作用：垫片，针对某些不支持的语法，进行低版本浏览器的支持，如promise等
  
  ```js
  const babel = require('@babel/core');
  function loader(source, inputSourceMap){
  	// this.request ==> loader路径 + 文件路径
  	// todo 转换逻辑
      let options = {
          presets: ["@babel/preset-env"],
          inputSourceMap,
          sourceMap: true
      }
      // code：编译后的代码，map：映射文件，ast：抽象语法树
      let {code, map, ast} = babel.transform(source, options);
      // return code; // 只能返回一个值
      return this.callback(null, code, map, ast); // 返回多个值的方式
  }
  module.exports = loader;
  ```
  
- file-loader
  
  - 二进制文件
  
  ```js
  // 获取用户配置信息，翻译配置的文件名
  const {getOptions, interpolateName} = require('loader-utils')
  function loader(content){
      // 获取用户的配置
      let options = getOptions(this) || {}; 
      // 根据配置的文件名，生成文件存放的url
      let url = interpolateName(this, options.filename || '[hash].[ext]', content);
      // 发射文件到指定url
      this.emitFile(url, content);
      // 导出url，引用模块就可以用了
      return `module.exports = ${JSON.stringify(url)}`; 
  }
  loader.raw = true;
  module.exports = loader;
  ```
  
- url-loader
  - 加载图片资源
  - 最终解析结果，根据限制文件的阈值，生成内联base64，或者文件
  
- style-loader
  
  - css放到style标签中
  
- css-loader
  
  - 解决css命名冲突
  - 解决@import和url引用
  - 将css转换成js代码
  - 核心包：
    - postcss（流水线处理css），接收一个插件（返回一个函数），一个一个地处理css
    - css_token_selector（css类型名选择器）
  
- less-loader
  - less ==> css
  - less.render
  
- loader的执行

  - 执行顺序：loader-a.pitch ==> loader-b.pitch ==> loader-c.pitch ==> loader-c ==> loader-b ==> loader-a
  - pitch方法
    - 有返回值，意味着自身和后面的loader都已经执行完毕，并且把返回值作为source传给上一个loader，**后面的pitch不走了**
    - 没返回值，**继续按照流程走**
    - 参数：remainingRequest，剩下的loader + 文件
    - 参数：previousRequest，之前的loader
    - 参数：data，对应loaderContext上的data
  - loader根据返回值分为两类：返回js代码的loader（最左边一个loader必然是返回js代码的），和其他处理的loader
- what pitch?手动执行remainingRequest
  
  ```js
  let {getOptions,stringifyRequest} = require('loader-utils');
  function loader(source){
  }
  loader.pitch = function(remainingRequest,previousRequest,data){
      // pitch返回之后相当于这个main.less就loader转译完成了,**这个阶段不会走less-loader**
      // webpack拿到这个JS之后会解析这个JS,变成AST抽象语法树,然后找到里面**require关键字**,寻找依赖
      // webpack会继续解析依赖,把"./loaders/less-loader.js!./src/main.less"模块ID去**解析加载**
      // moduleId：!!./loaders/less-loader.js!./src/main.less ==>
      // module函数内容：module.exports="#root {\n  color: red;\n}\n"
      let script = `
        let style = document.createElement('style');
        style.innerHTML = require(${stringifyRequest(this,"!!"+remainingRequest)});
        //style.innerHTML = require("!!./loaders/css-loader.js!./src/main.less");
        document.head.appendChild(style);
      `;
      return script;
  }
  module.exports = loader;
  ```

  
  - **loader的叠加顺序**：pre（前置），post（后置），inline（行内），auto（普通）
    - !：noAutoLoaders，**不要普通loader**，只要前置和后置和行内
    - -!：noPreAutoLoaders，不要前置和普通loader，**只要后置和行内**
    - !!：noPrePostAutoLoaders，不要前置/后置和普通loader，**只要行内loader **
  - **loader的查找规则**: 
    - 加载配置文件的loaders
    - 根据!，-!，!!，决定哪些loader执行

## sourcemap

- 可以使用compiler.jar包对目标js文件进行编译打包出一个json格式的sourcemap文件
- 打包source-map的一些组合属性：cheap，inline，module
- VLQ编码，6个二进制

## loader-runner

- 参数：options（用户自定义），callback（加载完成的回调）
- **iteratePitchingLoaders方法**：递归调用loader-pitch，递归退出时，调用processResource读取文件
- **processResource方法**：读取正则匹配的目标文件
- **iterateNormalLoaders方法**：递归调用loader-normal，递归退出时，调用callback完成加载
- 其他细节：
  - 维护一个全局的loaderContext对象
  - 如何获取当前的loaderContext？通过维护一个loaders列表，和loaderIndex
  - 如何获取request，remainingRequest，currentRequest，previousRequest，data？通过自定义属性，Object.DefinedProperty(loaderContext，...)
  - 实现loader.raw。true时返回二进制，false时返回utf8字符串
  - 实现this.async()，异步loader。返回一个回调函数，在loader-runner内部维护一个isSync属性，只有同步时，iterateNormalLoaders递归才会往下，否则需要用户手动执行上面的回调函数

- 代码：

```js
// 将用户配置的loader转成一个loaderObject
// 参数loader是一个绝对路径
function createLoaderObject(loader){
    // 这个data是传递给loader方法的data
    let loaderObject = {data:{}};
    // 请求路径
    loaderObject.request = loader; 
    // 加载loader的函数体
    loaderObject.normal = require(loader); 
    // 获取loader的pitch方法
    loaderObject.pitch = loaderObject.normal.pitch; 
}
// loader-runner核心代码
const runLoders = (options, callback) => {
    // 空对象，挂载了当前loaderIndex，目标文件源代码resource，所有的loaders
    let loaderContext = {}; 
    // 解构用户配置
    let {resource, loaders} = options;
    loaders = loaders.map(createLoaderObject);
    // 挂载并初始化当前loaderIndex
    loaderContext.loaderIndex = 0;
    // 挂载目标文件源代码
    loaderContext.resource = resource;
    // 挂载所有的loaders
    loaderContext.loaders = loaders;
    // 递归调用所有loaders的pitch方法
    iteratePitchingLoaders(loaderContext, callback);
    // 异步处理，默认是同步的
    // why async？**可供用户手动控制loader的调用时机**
    let isSync = true;
    loaderContext.async = function(){
        // 设置异步
        isSync = false;
        // 返回一个内部callback方法
        return innerCallback;
    }
	// 内部callback方法
    const innerCallback = function(err, args){
        // 用户调用了callback，需要重置isSync状态
        isSync = false;
        // 索引减1，指向上一个loader
        loaderContext.loaderIndex--;
        // 手动执行loader的方法体，传入loaderContext, args, callback三个参数
        iterateNormalLoaders(loaderContext, args, callback);
    }

    // 获取所有loader的绝对路径和目标文件源代码路径，使用!分开
    Object.defineProperty(loaderContext, 'request', {
        get: function(){
            return loaderContext.loaders.map(o => o.request).concat(loaderContext.resource).join('!');
        }
    });
    // 获取从当前索引到最后的所有路径，不包括当前索引的loader
    Object.defineProperty(loaderContext, 'reminingRequest', {
        get: function(){
            return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(o => o.request).concat(loaderContext.resource).join('!');
        }
    });
    // 获取从当前索引到最后的所有路径，包括当前索引的loader
    Object.defineProperty(loaderContext, 'currentRequest', {
        get: function(){
            return loaderContext.loaders.slice(loaderContext.loaderIndex).map(o => o.request).concat(loaderContext.resource).join('!');
        }
    });
    // 获取从索引0到当前索引的所有路径，不包括当前索引的loader
    Object.defineProperty(loaderContext, 'previousRequest', {
        get: function(){
            return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(o => o.request).concat(loaderContext.resource).join('!');
        }
    });
    // 获取当前loaderContext的data属性，在用户定义的loader方法体中会调用
    Object.defineProperty(loaderContext, 'data', {
        get: function(){
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    });
    
    function iteratePitchingLoaders(loaderContext, callback){
        // 终止条件，遍历完所有loader
        if(loaderContext.loaderIndex >= loaderContext.loaders.length){
            // 索引减一，指向最后一个loader
            loaderContext.loaderIndex--;
            // 加载目标文件源代码
            return processResource(loaderContext, callback);
        }
        // 取当前loaderObject
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        // 去当前loaderObject的pitch方法
        let pitchFn = currentLoaderObject.pitch;
        // pitch不存在，递归调用下一个loader的pitch
        if(!pitchFn){
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext, callback);
        }
        // 执行pitch，传入reminingRequest，previousRequest，data三个参数
        let args = pitchFn.apply(loaderContext, [loaderContext.reminingRequest, loaderContext.previousRequest, currentLoaderObject.data]);
        // 判断返回值，有返回值
        if(args){
             // 索引回到上一个loader
            loaderContext.loaderIndex--;
            // 执行上一个loader的函数体，传入loaderContext，args，callback三个参数
            iterateNormalLoaders(loaderContext, args, callback);
        }
        // 没有返回值
        else{
            // 继续递归调用下一个loader的pitch
            loaderContext.loaderIndex++;
            return iteratePitchingLoaders(loaderContext, callback);
        }
    }
    
    // 读取源文件，调转方向，调用loader的方法体
    function processResource(loaderContext, callback){
        // 读取目标文件源代码的buffer
        // TODO 判断loader.raw属性，是否生成为二进制数据（true），或utf8字符串（false）
        let buffer = fs.readFileSync(loaderContext.resource);
        // 将参数loaderContext, buffer, callback，传递给当前loaderIndex的方法
        iterateNormalLoaders(loaderContext, buffer, callback);
    }
    
    // 递归调用所有loader的方法体
    function iterateNormalLoaders(loaderContext, args, callback){
        // 终止条件
        if(loaderContext.loaderIndex < 0){
            return callback(null, args);
        }
        // 取当前loaderObject
        let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
        // 去当前loaderObject的normal方法
        let normalFn = currentLoaderObject.normal;
        // 执行normal方法，传入args两个参数
        // 把转换后的返回值重新赋值给args
        args = normalFn.apply(loaderContext, [args]);
        // 如果是同步，自动往下走.否则需要等用户自己掉异步callback往下走
        if(isSync){
            // 索引减1，指向上一个loader
            loaderContext.loaderIndex--;
            // 递归调用下一个loader的方法体，传入当前loader转换后的args（目标代码）
            iteratePitchingLoaders(loaderContext, args, callback);
        }
    }
}
```

## Tapable

- webpack借助Tapable将各个插件串联起来，其中webpack的compiler和compilation都是Tapable的实例
- 总共有9种Hook
- Tapable按类型分：
  - **Sync**：同步
  - **AsyncParallel**：异步并行
  - **AsyncSeries**：异步串行
- Tapable按返回值分： 
  - **basic**：只执行函数，不关心返回值
  - **bail**：一旦有返回值（非undefined），**直接结束**
  - **waterfull**：瀑布，上一个输出是下一个输入
  - **loop**：循环，**直到所有结果都是undefined为止**，一旦有返回值（非undefined），则**跳回第一个函数继续循环**
- **hook.tap方法**：注册监听（类似dom.addEventListener）
  - 将用户传的参数`name,fn`添加到实例的taps属性上
- **hook.call方法**：触发钩子执行（类似dom.dispatchEvent）
  - 参数`name, fn`
  - 创建一个自定义函数，然后传入把参数传进去调用它
  - 通过子类的**compile方法**里调用**工厂实例**来构造这个函数，传递一个对象参数{taps: this.taps, args: this.args}
  - 定义工厂类，里面定义setup和create方法
    - **setup方法**：给钩子的实例的_x属性赋值一个fn数组
    - **create方法**：返回一个函数，return new Function(this.args(), this.header() + this.content())
      - **args方法**：返回参数列表的字符串，使用","拼接
      - **header方法**：返回属性定义的代码字符串
      - **content方法**：返回函数体的代码字符串
- **hook.tapSync方法**：注册异步回调，类似tap的实现
  - 参数`name,syncFn`
- **hook.callSync方法**：触发异步回调，类似call的实现
  - 参数`name,syncFn`
  - 重新定义自己的工厂类
- 异步并行：循环+计数器+回调
- 异步并行：迭代next回调
