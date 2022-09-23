# npm的使用

[^日期]: 2020-06-03 00:39:00
[^作者]: Angel屁屁

### node管理器

- nrm：node中源管理工具

- nvm：node中的版本管理工具，切换版本

- npm：包管理工具

  ````bash
  npm install nrm -g
  ````

> E:\develop\nodejs\node_global\nrm -> E:\develop\nodejs\node_global\node_modules\nrm\cli.js
>
> 将当前安装的模块放到npm`目录`下（快捷方式），当执行`nrm`的时候，会自动执行`nrm/cli.js`

### 自定义全局包

- 创建bin配置
- #! /usr/bin/env node 以node的环境来运行
- `npm link`把自定义包放到npm全局中

### 安装包

- `--save-dev || -D`表示生产环境中使用
- `--save`表示项目依赖，`--save-dev`表示开发依赖，同版本依赖，可选依赖，打包依赖

### 包版本管理

- major：破坏性更新，大版本
- minjor：增加功能，小版本更新，修订
- patch：补丁版本，小bug
- 常用符号：^ ~ >= <=，^表示限制大版本(^2.0.0，不能小于2和大于3)，~表示限制中间版本(~2.3.0，不能小于3和大于4)
- alpha预览版（内部测试），beta公测版，rc最终测试版

### npm run

- npm run传参方式：加--
- 跑npm run的时候，会将项目包的node_modules的bin目录放到全局下，所以npm run可以使用node_modules/bin下的所有命令
- npm run 等于 npx，但npx还可以以下载临时包的形式运行脚本，运行完后自动删除临时包

对peerDependencies的理解：规定某个包或项目只对指定版本的包兼容，当安装其他版本的时候，就会抛出一些警告信息！