## 抽象语法树 AST

> astexplorer AST可视化工具

### 编译器基本流程

- JavaScript词法分析，语法分析
- 定义访问器，遍历AST，深度优先
- 根据需求，更新语法树（如babel转换低版本语法），在访问器进入或退出的地方处理
- 生成新语法的代码

### JavaScript Parser

- esprima

- acorn

- babel
  - @babel/core，核心包，生成和遍历AST
  - babel-types，判断AST节点类型，babel处理语法转换的核心方法
  - 使用babel-types和@babel/core，处理es6语法，自定义插件
  
  ```js
  const parser = require("@babel/parser");
  const traverse = require("@babel/traverse").default;
  const generator = require("@babel/generator").default;
  const t = require("@babel/types");
  
  function loader(source) {
    console.log("转换前的jsx代码: \r\n%s", source); // <h1 id="title"><span>hello</span>world</h1>
  
    // 获取ast
    const ast = parser.parse(source, { plugins: ["jsx"] });
  
    // 遍历ast
    traverse(ast, {
      JSXElement(nodePath) {
        const next = (node) => {
          if (!node) return t.nullLiteral();
          // JSX 标签节点
          if (t.isJSXElement(node)) {
            // React.createElement函数
            let memberExpression = t.memberExpression(
              t.identifier("React"),
              t.identifier("createElement")
            );
            // 函数参数列表
            let _arguments = [];
            // 标签
            let stringLiteral = t.stringLiteral(node.openingElement.name.name);
            // 属性
            let objectExpression = node.openingElement.attributes.length
              ? t.objectExpression(
                  node.openingElement.attributes.map((attr) =>
                    t.objectProperty(t.identifier(attr.name.name), attr.value)
                  )
                )
              : t.nullLiteral();
            _arguments = [stringLiteral, objectExpression];
            // 递归处理子节点
            _arguments.push(...node.children.map((item) => next(item)));
            return t.callExpression(memberExpression, _arguments);
          } else if (t.isJSXText(node)) {
            // JSX 文本节点
            return t.stringLiteral(node.value);
          }
        };
        let targetNode = next(nodePath.node);
        // console.log("转义后的ast: %s", JSON.stringify(targetNode, null, 2)); 转换后：
        // React.createElement("h1", {
    	  // id: "title"
  	  // },React.createElement("span", null, "hello"), "world");
        nodePath.replaceWith(targetNode);
      },
    });
  
    // 生成代码
    const output = generator(ast, {}, source);
  
    // 返回转换后的代码
    console.log("转换后的js代码: \r\n%s", output.code);
    return output.code;
  }
  
  module.exports = loader;
  ```
  
- astexplorer：在线ast生成器

### 编译器

- **tokenizer**：词法分析器
  - 划分单词
  - 返回一个单词数组

- **parser**：语法分析器
  - 将特定的单词转成特定的节点类型
  - 生成一个ast
- **traverse**：遍历器
  - 遍历ast，先序遍历
  - 可以传入自定义的访问器访问ast节点
- **transformer**：转换器
  - 思路：修改老树，或是重建新树
  - 转换器内部调用traverse遍历旧树处理
  - 如何重建新树？通过在旧树身上挂一个context指向新树的待处理节点上（body，arguments等），这样在遍历处理旧树时，通过修改context，就可以变相修改到新树的节点
- **codeGenerator**：代码生成器
  - 对不同节点按类型写不同的处理逻辑
  - 返回一个新语言的代码

### 有限状态机

> 词法分析阶段
>
> 根据输入的状态返回一个新的状态
>
> 场景：解析四则运算，解析html，解析jsx

### 正则表达式分词

通过reg.exec方法，不断匹配源代码的的字符，生成单词数组

```js
// 词法分析器

// 语法分析器

// 遍历器

// 转换器

// 生成器

```