## webpack插件

> 自定义插件，是一个类，原型上有一个apply方法
>
> webpack启动时，创建一个compiler实例，逐个调用插件的apply方法
>
> 插件的原理：在整个webpack编译流程中，拿到编译对象，往某个钩子上添加一些监听函数，自定义行为

### DonePlugin

> compiler创建完成后，调用done钩子的call方法，在此之前用户字节自定义注册方法
>
> compiler.hooks.done | state	获取一个state对象，所有编译完成时触发

### ChunkAssetPlugin

> 生成chunk资源时，调用chunkAsset钩子的call方法
>
> compiler.hooks.compilation | SyncBailHook | compilation,params	获取compilation对象
>
> compiler.hooks.chunkAsset | SyncBailHook | chunk,filename	获取代码chunk资源对象

### ZipPlugin

> 把所有产出文件压缩成一个压缩包，备份
>
> 引用库：jszip，webpack-sources
>
> emit是发射文件的最后一个钩子，可以在此前面修改目标代码
>
> compiler.hooks.emit | AsyncSeriesHook| compilation,callback	获取compilation对象，可以修改最终产出代码

### AutoExternalPlugin

> 自动加载外部链的插件
>
> 引用库：html-webpack-plugin，webpack/lib/ExternalModule
>
> 功能：
>
> ​			1.向index.html（head，body）插入cdn脚本
>
> ​			2.require或import的外部资源不打包进来
>
> ​			3.如果引入模块配置过外链，就走外部模块的生成方式，如：module.exports = window['jQuery']
>
> ​			4.配置了外链，但实际没有使用require或者import，就不需要加载外部链模块了
>
> webpack配置：
>
> ​			externals: {'jquery' :  '$'}
>
> compiler.hooks.compilation | SyncBailHook | compilation,params	获取compilation对象
>
> HtmlWebpackPlugin.getHooks(compilation).alterAssetTags | AsyncSeriesWaterfallHok |  htmlChunk,callback	这是html-webpack-plugin插件挂载的钩子，不是webpack自带，可以在这里往htmlChunk插入cdn脚本
>
> compiler.hooks.normalModuleFactory | SyncBailHook  | normalModuleFactory	创建模块工厂是会触发此钩子，获取一个普通模块工厂
>
> normalModuleFactory.hooks.factory | SyncWaterfallHook | factory	获取factory对象，可以改造创建模块时的默认的factory方法，加载外部链的模块
>
> normalModuleFactory.hooks.parser.for('javascript/auto') | SyncBailHook | parser	从js代码到创建parser时会触发这个钩子，获得一个转换器对象
>
> parser.hooks.import | SyncBailHook | statment,source	获得一个ast对象和import节点的url，处理import语法
>
> parser.hooks.call.for('require') | SyncBailHook | expression	获取一个require表达式对象