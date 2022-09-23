

# Express原理

> 基于ES5语法，内部使用回调处理
>
> 内置了中间件，路由，application核心应用，扩展reques/response，view模板引擎
>
> 箭头函数没有原型，"没有this"，不能用new
>
> 强制刷新，热更新（更新某个包）
>
> 回调函数的执行顺序 --> 洋葱模型
>
> 外层Layer匹配路径，里层Route匹配方法
>
> 路由的懒加载lazy_route
>
> 快速匹配，method映射表（对象）
>
> next函数传了参数，则表示发生了错误
>
> 二级路由，通过注册中间的方式，使用express.Router类去new

