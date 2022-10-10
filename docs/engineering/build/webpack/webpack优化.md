# webpack 优化

## 缩小查找范围

- `resolve`，解析模块时的配置

  - `extensions`，扩展名（数组）

  在查找模块时，通过配置文件扩展名，可以加快扩展名匹配

  - `alias`，别名（对象）

  配置模块的别名，指定加载模块的绝对路径，则不需要从`node_modules`文件夹中查找了

  - `modules`，目录（数组）

  指定模块查找时的目录范围

  - `mainFields`，package.json 文件的入口字段（数组）

  可以配：['browser', 'module', 'main']

  - `mainFiles`，没有 package.json 时指定的入口文件名（数组）

  可以配：['index'] 或更多

- `resolveLoader`，解析 loader 时的配置（对象）

  配置项类似 resolve

## 跳过指定模块解析

- `noParse`，这些模块不会被解析依赖（正则表达式或返回 bool 类型的函数）

## 配置全局变量（webpack 注入式）

- `DefinePlugin`，指定注入的属性（插件）

  内部使用 eval 来转化每一个属性

  ```js
  new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: "1",
      EXPRESSION: "1+2",
      COPYRIGHT: {
          AUTHOR: JSON.stringify("Angel 屁屁")
      }
  })
  ```

## 打包时忽略指定模块的大文件夹

- `IgnorePlugin`，不打包指定模块的某个大文件夹（插件）

  第一个参数是匹配引入模块路径的正则

  第二个参数是匹配模块目录名的正则

  ```js
  new webpack.IgnorePlugin(/^\.\/locale/, /coments$/)
  ```

## 封装打印日志模块

- `log`

  开发环境下，才需要打印日志

  配置`mode: 'development'`或`webpack-dev-server --env=development` 

  webpack 打包了一个@process 模块

  ```js
  function log(..args){
      if(process.env.MODE_ENV === 'development'){
          console.log.apply(console, ...args);
      }
  }
  log('开发模式下，才需要打印日志')
  ```

## 优化和压缩图片

- `image-webpack-loader`，压缩和优化图片（loader）

## 优化日志输出

- `friendly-errors-webpack-plugin`，友好输出日志（插件）

## 费时分析

- `SpeedMeasureWebpackPlugin`，分析编译流程各部件的耗时（插件）

  ```js
  const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
  const swv = new SpeedMeasureWebpackPlugin();
  module.exports = swv.wrap({
      //...
  })
  ```

<img src="./speed-measure-webpack-plugin 打包耗时.png" />

## 打包文件大小分析

- `webpack-bundle-analyzer`，生成代码分析报告（插件）

  ```js
  const BundleAnalyzerPlugin = require('webapck-bundle-analyzer').BundleAnalyzerPlugin;
  
  module.exports = {
      plugins: [
          new BundleAnalyzerPlugin() // 使用默认配置，也可以自己定义配置
          // 默认配置的具体配置项
          // new BundleAnalyzerPlugin({
          //   analyzerMode: 'server',
          //   analyzerHost: '127.0.0.1',
          //   analyzerPort: '8888',
          //   reportFilename: 'report.html',
          //   defaultSizes: 'parsed',
          //   openAnalyzer: true,
          //   generateStatsFile: false,
          //   statsFilename: 'stats.json',
          //   statsOptions: null,
          //   excludeAssets: null,
          //   logLevel: info
          // })
      ]
  }
  ```

  生成 stats.json

  ```json
  {
   "scripts": {
      "generateAnalyzFile": "webpack --profile --json > stats.json", // 生成分析文件
      "analyz": "webpack-bundle-analyzer --port 8888 ./dist/stats.json" // 启动展示打包报告的 http 服务器
    }
  }
  ```

## 打包自定义库

- `library`和`libraryTarget`，配置 output 对象的属性

  | libraryTarget | 使用者的引入方式     | 使用者提供给被使用者的模块的方式             |
  | :------------ | :------------------- | :------------------------------------------- |
  | * var，默认   | 只能以 script 标签     | 以全局变量的形式使用                         |
  | * commonjs    | 只能按照 commonjs 规范 | 按照 commonjs 规范引入，无法直接在浏览器中使用 |
  | ...           |                      |                                              |

  *libraryTarget 设置 this，window，global，挂载到这些对象上*

- `libraryExport`，配置导出的子模块

  只有 libraryTarget 被设为 commonjs 或 commonjs2 才有意义

## DLL 动态链接库

- DllPlugin：用于打包出一个动态链接库
- DllReferencePlugin：在配置文件中引入 DllPlugin 打包好的动态链接库
- AutdllWebpackPlugin：不用配置两份配置文件了，直接在 webpack.config.js 中添加此插件就可以自动完成动态链接库的打包和使用

打包动态链接库

webpack.dll.config.js

```js
const path = require('path');

const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom'] // 可以配多个 dll，且必须是数组形式
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
       	filename: '[name].dll.js',
        library: '_dll_[name]'
	},
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}
```

使用动态链接库

webpack.config.js

```js
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
    ...
    plugins: [
        new DllReferencePlugin({
            manifest: require('./dist/react.manifest.json')
        })
    ]
}
```

一个配置文件搞定 Dll

webpack.config.js

```js
const path = require('path');
const AutodllWebpackPlugin = require('autodll-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({ // 如果配置了这个插件，dll 动态链接库也会自动被添加到 index.html 中去
            inject: true,
            template: './src/index.html'
        }),
        new AutodllWebpackPlugin({
            inject: true,
            filename: '[name].dll.js',
            entry: {
            	react: ['react', 'react-dom']    
            }
        })
    ]
}
```

## 去除未使用 css

- `purgecss-webpack-plugin`和`mini-css-extract-plugin`，与 `glob`、`glob-all` 配合使用

  ```js
  const glob = require('glob');
  const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  
  module.exports = {
      ...
      module: {
          rules: [
              {
                  test: /\.css$/,
                  include: path.resolve(__dirname, 'src'),
                  exclude: /node_modules/,
                  use: [
                      {
                          loader: MiniCssExtractPlugin.loader
                      },
                      'css-loader'
                  ]
              }
          ]
      },
      plugins:[
          new HtmlWebpackPlugin({
              template: './src/index.html'
          }),
          new MiniCssExtractPlugin({
              filename: '[name].css'
          }),
          new PurgecssWebpackPlugin({
              paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`)
          })
      ]
  }
  ```

## polyfill

- require('babel-polyfill')，官网已不推荐使用

> polyfill-service

- polyfill-service，根据浏览器版本返回 polyfll 垫片代码断

  ```html
  <script src="https://polyfill.io/v3/polyfill.min.js"></script>
  ```

> babel，polyfill，core-js

- babel-loader

- @babel/polyfill，_务开发常用_

  提供了低版本浏览器不支持的 api，**污染全局对象**

  ```js
  // 方法一：
  require('@babel/polyfill');
  // 方法二：
  module.exports = {
      ...
      entry: {
          polyfill: '@babel/polyfill',
          main: './src/index.js'
      },
      ...
  }
  ```

- @babel/runtime，_组件库常用_

  在需要使用的地方手动 require，其下 core-js 定义了各种 api 的兼容代码，**避免了污染全局对象**，但是需要自己一个一个引用

- @babel/plugin-transform-runtime

  babel-loader 的插件，**避免手动引入，并且可以抽离公用方法**
  
  还不能转换 class 语法，需要配合@babel/preset-env 使用
  
  ```js
  
  {
      loader: "babel-loader",
          options: {
              "plugins": [
                  [
                      "@babel/plugin-transform-runtime",
                      {
                          "corejs": 2, // 腻子模块。自动引入 babel-runtime/core-js
                          "helpers": false, // 提出公用方法。移除内联 babel helpers并替换使用babel-runtime/helpers 来替换
                          "regenerator": false // generator 的兼容。true 开启 generator 函数转为成使用 regenerator
                      }
                  ]
              ]
          }
  }
  ```
  
- @babel/preset-env

  通过开启 useBuiltIns 来转化 API 和实例方法。根据特定的环境引入 polyfill

  - ES 语法，如箭头函数
  - ES API，如 Promise
  - ES 实例方法，如 String.prototype.includes

  ```js
  {
      loader: "babel-loader",
          options: {
              "presets": [
                  [
                      "@babel/preset-env",
                      {
                          "useBuiltIns": "usage", // 是否使用腻子模块，false（不使用），usage（按需加载），entry（另外加一个入口文件）
                          "corejs": { version: 2 },
                          "targets": {
                              "node": "current", // 当前版本
                              "chrome": 52, // 谷歌 52 版本
                              "browsers": ["last 2 versions", "safari 7"] // 浏览器列表
                          }
                      }
                  ]
              ]
          }
  }
  ```


## 多线程进行编译

- 多线程处理 loader，thread-loader

  ````js
  {
      loader: 'thread-loader',
      options: [
  		worker: 3
      ]
  }
  ````

## 摇树（tree shaking）

只能生产模式下，只能摇 ES6 Module 的代码，Commonjs 不可以，以下四种情况都会被摇掉：

- 没有被导入使用
- 代码不可达，不会被执行的代码
- 代码的返回值没有被使用
- 那些只写不读的变量

## 代码分割（多入口）

### 入口点分割

- 重复模块同样会被打包
- 不灵活，并不能拆分核心代码

### 动态导入和懒加载

- import 语法
- 比如路由跳转的时候才按需加载

#### 按需加载

- 如何在 react 项目中实现按需加载？
  - React.lazy 懒加载组件
  - Suspense 组件：组件未加载出来之前，可以通过配置 fallback 属性来指定 loading 组件

```jsx | pure
class App extends Component{
    constructor(){
		super();
    }
    render(){
        return (
            <Suspense fallback={<Loading />}>
                <LazyAppTitle />
            </Suspense>
        )
    }
}
```

#### 预先拉取/预先加载

- prefetch

  浏览器空闲时拉取

```js
import(
    './utils.js'
    /* webpackPrefetch: true */
    /* webpackChunkName: 'utils' */
)
```

- preload

  资源优先下载，异步 chunk 和父级 chunk 并行加载。如果父级 chunk 先下载好，页面会先显示，但同时会等待异步 chunk 的下载

```js
import(
    './utils.js'
    /* webpackPreload: true */
    /* webpackChunkName: 'utils' */
)
```

## 提取公共代码

- 第三方模块 vendors

- 公共模块 commons

  ```js
  optimization: {
          splitChunks: {
              chunks: "all",// 默认作用于异步 chunk，值为 all（全应用）/initial（初始/同步模块）/async（import/异步模块）
              minSize: 30000,  // ****最小尺寸，小于这个值则不分割
              minChunks: 1,  // ****最小引用数，小于这个值则不分割
              maxAsyncRequests: 5,  // ****配置按需加载异步模块一次最大请求数量
              maxInitialRequests: 3,  // ****入口模块最大同步一次最大请求数量
              name: true,  // ****打包后的名称，默认是 chunk 的名字通过分隔符（默认是～）分隔开，如 vendor~，
              automaticNameDelimiter: '~',// ****分隔符
              cacheGroups: { //设置缓存组用来抽取满足不同规则的 chunk，下面以生成 common 为例
                  vendors: { // ****第三方模块
                      chunks: "initial",
                      test: /node_modules/, // ****筛选条件
                      priority: -10 /// ****满足多个配置缓存组时，采取优先级数值大的
                  },
                  commons: { // ****自定义模块
                      chunks: "initial",
                      minSize: 0,
                      minChunks: 2,
                      priority: -20,
                      reuseExistingChunk: true// ****设置 true，避免 chunk 已被抽离仍重复打包，优化打包速度
                  }
              }
          },
  }
  ```

## 作用域提升

- 将所有的模块按照引用顺序放在一个函数作用域里，然后适当地重命名一些变量以防止命名冲突
- production 模式下默认开启
- 只有 es 模块，commonJs 模块不支持

## 开启缓存，优化构建速度

- babel-loader，options:{cacheDirectory: true}

- cache-loader，再需要缓存的 loader 前添加

- hard-source-webpack-plugin，插件

- oneOf

  在 rules 属性中配置 oneOf: [...,{},{}]，在遍历规则的时候，只要匹配到一个就会退出