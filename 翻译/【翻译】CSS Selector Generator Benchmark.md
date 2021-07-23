# 【翻译】CSS 生成器方案对比

# 背景

由于最近团队需要建设一个可视化埋点的系统，在标记`DOM`元素唯一标识的问题上做了大量调研。其中，我查到一篇比较有意思的 blog，于是打算翻译一下。

# 正文

这是一次对众多支持生成 CSS 选择器的 JS 库进行对比的尝试，灵感来自@dandv's [question](https://github.com/fczbkk/css-selector-generator/issues/2).

## Demo

```bash
> git clone https://github.com/fczbkk/css-selector-generator-benchmark.git
> npm install
> npm test
```

## 总结

### @antonmedv [finder](https://github.com/antonmedv/finder)

- NPM 包，使用 TS 语法写的库。
- 没有其他依赖。
- 具备完整测试用例。
- 具备完整文档说明。
- 使用 MIT 证书。
- 速度慢于其他库（但是已经足够正常使用）。
- 使用 ID、class、tags、子选择器等参数创建高效和稳健的选择器。
  - 似乎不支持 attribute 创建。
- 所有测试库中**生成选择器最短**的一个。

输出结果: 

```
.block:nth-child(3) li:nth-child(2) > .icon-eye-open
```

### @autarc [optimal-select](https://github.com/autarc/optimal-select)

- 支持 UMD（浏览器 & Node 环境均可使用）。
- 没有其他依赖。
- 没有测试用例。
- 使用 MIT 证书。
- 支持一次处理一个或多个元素。
- separate handling of selection and optimization (export ES2015 Modules)
- 使用 ID、class、attributes、tags、子选择器等参数创建高效和稳健的选择器。

输出结果: 

```
.clearfix:nth-of-type(3) li:nth-of-type(2) .icon-eye-open
```

### @bimech [ellocate.js](https://github.com/bimech/ellocate.js)

- 支持浏览器环境。
- 依赖其他库：Jquery。
- 具备完整测试用例。
- 具备完整文档说明。
- 没有证书。
- 转化速度适中。
- 使用 ID、class、tags、子选择器等参数创建选择器。
- **警告**：由于未使用 `nth-child` 来选择元素，所以会生成很多不唯一的选择器结果。 

输出结果: 

```
html > body > div > div#wrap > div#main > div.container > div.main-content > div.row > div.span12 > div.row > div.span4.sidebar > div.block.clearfix > div.block-header.clearfix > div.block-action > a.btn.btn-success.btn-small > i.icon-plus.icon-white
```

### Chromium's [DOMPresentationUtils](https://chromium.googlesource.com/chromium/blink/+/master/Source/devtools/front_end/components/DOMPresentationUtils.js)

提示：如果想要支持浏览器，请使用这个版本：[version on NPM](https://www.npmjs.com/package/cssman) 

- NPM 包。
- 没有其他依赖。
- 没有测试用例。
- 具备完整文档说明。
- 其他证书。
- 转化速度居中。
- 使用 ID、class、tags、attribute（对于输入类型）、子选择器（ nth-child）等参数创建选择器。
- **警告**：无论是优化或未优化的版本，都测试出**很多不唯一的选择器结果**。

不唯一的输出结果: 

```
div#main > div > div > div > div > div > div.span4.sidebar > div.block.clearfix > div.block-content > ul > li.show-all > a

[
  <a href="/organizations">Show all</a>,
  <a href="/topics">Show all</a>,
  <a href="/topics?scope=starred">Show all</a>,
  <a href="/topics?scope=public">Show all</a>
]
```

输出结果: 

```
div#main > div > div > div > div > div > div.span4.sidebar > div.block.clearfix > div.block-content > ul > li:nth-child(1) > a
```

### @desmondw [snowflake](https://github.com/desmondw/snowflake)

这是一个谷歌插件，而非一个独立包。

- 转化速度居中。average speed
- 使用 tag、class、`nth-child`等参数的结合创建选择器。

输出结果: 

```
div.span12 > div:nth-of-type(1) > div:nth-of-type(1) > ul:nth-of-type(1) > li:nth-of-type(10) > div:nth-of-type(1) > div:nth-of-type(2) > span:nth-of-type(1)
```

### @fczbkk [css-selector-generator](https://github.com/fczbkk/css-selector-generator)

- 支持 Bower 和 NPM。
- 没有其他依赖。
- 具备完整测试用例。
- 具备完整文档说明。
- 未授权证书。
- 尝试使用优化的ID、class、tag、子选择器等参数或它们的组合创建选择器，`nth-child` 作为需要区分唯一时的后备。

输出结果: 

```
.span12 > :nth-child(1) > .span8 > ul > :nth-child(1) > :nth-child(1)
```

### @jhartikainen [dompath](https://github.com/jhartikainen/dompath)

- 不支持 Bower 和 NPM。
- 没有其他依赖。
- 具备完整测试用例。
- 具备完整文档说明。
- 没有证书。
- 转化非常快速。very fast
- 使用 ID、tag 以及 后代选择器（`nth-child`）等参数创建选择器，因此生成的结果非常的长。

输出结果: 

```
#main > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(10) > div:nth-child(2) > div:nth-child(2) > span:nth-child(4)
```

### @martinsbalodis [css-selector](https://github.com/martinsbalodis/css-selector)

很遗憾，我并没有顺利跑通这个包。

### @ngs [jquery-selectorator](https://github.com/ngs/jquery-selectorator)

- 支持 Bower 和 NPM。
- 依赖其他库：Jquery。
- 具备完整测试用例。
- 具备完整文档说明。
- MIT 证书。
- **转化速度非常慢**。
- 由于是借助于Jquery's `:eq()` 选择器函数创建的，所以大部分结果都不是有效的 CSS 选择器，也就只能在 Jquery 环境下使用。

输出结果: n/a

### @olivierrr [selector-query](https://github.com/olivierrr/selector-query)

- 仅支持 NPM。
- 没有其他依赖。
- 没有测试用例。
- 具备完整测试用例。
- MIT证书。
- 比较快。uite fast
- 为每个元素（ID、class、tag、`nth-child`）生成最复杂的后代选择器（ [原因可看这里](https://github.com/olivierrr/selector-query/issues/1#issuecomment-133116659)），因此这也是生成结果最长的一个库。
- **警告**：由于是使用后代选择器代替子选择器，所以**有时会创建一些不唯一的选择器**。

输出结果: 

```
#main div.container:nth-child(1) div.main-content:nth-child(1) div.row:nth-child(1) div.span12:nth-child(1) div.row:nth-child(1) div.span4.sidebar:nth-child(2) div.block.clearfix:nth-child(2) div.block-header.clearfix:nth-child(1) div.block-action:nth-child(2) a.btn.btn-success.btn-small:nth-child(1) i.icon-plus.icon-white:nth-child(1)
```

### @rishihahs [domtalk](https://github.com/rishihahs/domtalk)

- 仅支持 NPM。
- 没有其他依赖。
- 具备完整测试用例。
- 具备完整文档说明。
- MIT证书。
- 非常快。very fast
- 使用ID、nth-child 后代选择器等参数创建选择器，生成结果长度适中。
- **警告**：由于是使用后代选择器代替子选择器，**所以有时会创建一些不唯一的选择器**。

输出结果: Longest selector:

```
#wrap *:nth-child(1) *:nth-child(1) *:nth-child(1) *:nth-child(3) *:nth-child(1) *:nth-child(1) *:nth-child(1) *:nth-child(3) *:nth-child(11) *:nth-child(1) *:nth-child(1)
```

### @stevoland [CSSelector.js](https://github.com/stevoland/CSSelector.js)

- 支持 NPM、AMD、Bower（未找到同名的包）
- 没有其他依赖。
- 没有测试用例。
- 具备完整文档说明。
- MIT证书。
- 非常快。very fast
- 使用ID、tag + `nth-child` 后代选择器等参数创建选择器，生成结果较长。

输出结果: 

```
#main > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(1) > DIV:nth-child(1) > UL:nth-child(2) > LI:nth-child(10) > DIV:nth-child(2) > DIV:nth-child(2) > SPAN:nth-child(4)
```

### @thomaspeklak [get-query-selector](https://github.com/thomaspeklak/get-query-selector)

- 仅支持 NPM。
- 没有其他依赖。
- 没有测试用例。
- 具备完整文档说明。
- 貌似使用 BSD 证书。
- 非常快。very fast
- 使用ID、`nth-child` 后代选择器等参数创建选择器，生成结果适中。

输出结果: 

```
#wrap>:nth-child(1)>:nth-child(1)>:nth-child(1)>:nth-child(3)>:nth-child(1)>:nth-child(1)>:nth-child(1)>:nth-child(3)>:nth-child(11)>:nth-child(1)>:nth-child(1)
```

### @tildeio [selector-generator](https://github.com/tildeio/selector-generator)

- 不支持 NPM、Bower。no NPM or Bower
- 依赖 RequireJS。
- 具备完整测试用例。
- 没有文档说明。
- 貌似使用 MIT 证书。
- 非常快。very fast
- 使用tag、tag + `nth-child` 后代选择器等参数创建选择器。
- **警告：会生成非常多的不唯一选择器。**

输出结果: 

```
html > body > div > div > div > div > div > div > div > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > ul > li:nth-of-type(2) > a
```

