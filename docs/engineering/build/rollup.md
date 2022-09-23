# what

> 官网：Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

# resolve 插件

解决 rollup 无法正常解析第三方模块打包的的报错。

安装
```bash
npm i -D @rollup/plugin-node-resolve
```

配置：
```js
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/bundle.js",
  },
  plugins: [resolve()],
};
```

# external、globals 属性

> 引自 github 回答：https://github.com/rollup/rollup/issues/1169#issuecomment-268815735

大致意思是：

external 属性，告诉 rollup 将这个模块当成外部模块来导入，如 `external: [ 'jquery' ]`。

globals 属性，配置输出产物（cjs/esm 等）时，解析“别名”模块 ID 时如何对应真实模块 ID，如 `globals: { jquery: '$' }`

# commonjs 插件

rollup 本身默认支持 esm 的模块（import/export），而 commonjs 插件就是为了解析某些 cjs 模块。

安装：
```bash
npm i -D @rollup/plugin-commonjs
```

配置：
```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/bundle.js",
  },
  plugins: [resolve(), commonjs()],
};
```

# babel 插件

与多数打包工具一样，如果需要转换低级语法，如箭头函数转换，则需要配置 babel 插件。

安装：
```bash
npm i -D @rollup/plugin-babel
npm i -D @babel/core
```

配置：
```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/esBundle.js",
  },
  plugins: [resolve(), commonjs(), babel()],
};
```

# json 插件

为了在 js 文件中导入 json 文件，rollup 默认不支持，需要引用插件处理。

安装：
```bash
npm i -D @rollup/plugin-json
```

配置：
```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/esBundle.js",
  },
  plugins: [resolve(), commonjs(), babel(), json()],
};
```

# tree shaking

// TODO