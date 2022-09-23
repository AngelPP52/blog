## http 基本概念

> 状态码（statusCode）

- 1xx 开头的
  - **101**：websocket，切换协议

- 2xx 开头的
  - **200**：成功态
    
  - **204**：成功了，但未返回内容
    
  - **206**：断点续传，返回部分内容

- 3xx 开头的
  - **301**：永久重定向
    
  - **302**：临时重定向，使用原来的 url
    
  - **304**：服务器缓存
    
  - **307**：临时重定向，使用 GET 方法进行重定向

- 4xx 开头的
  - **400**：客户端参数不正确
    
  - **401**：没有权限，也没有登录
    
  - **403**：没有权限，但是已经登录
    
  - **404**：找不到 url
    
  - **405**：服务器不支持此请求方法

- 5xx 开头的
  - **500**：服务器问题
    
  - **502**：负载均衡出现问题
  - **503**：服务器报错

> 请求（request）

- 请求行 --> 请求方法 请求路径

- 请求头 --> 传递数据 自定义header

- 请求体 --> 传输数据（二进制）

> 响应（response）

- 响应行 --> http version 状态码 响应数据

- 响应头 --> 自定义响应数据

- 响应体 --> 返回给浏览器的数据

> 模拟请求工具

- curl
- postman

> 模版引擎

- ejs


> 内容类型（Content-Type）

告诉客户端返回的**内容类型**和**内容编码**，常见的有如下：`text/html;charset=utf-8`、`application/json`、`application/octet-stream`、`application/x-www-form-urlencoded`

| Content-Type                      | 含义                       |
| --------------------------------- | ------------------------  |
| text/html                         | html格式                   |
| text/plain                        | 纯文本格式                  |
| text/xml                          | xml格式                    |
| image/png                         | png图片格式                 |
| application/json                  | json格式                   |
| application/octet-stream          | 二进制下载流数据             |
| application/x-www-form-urlencoded | 表单默认的提交数据的格式 		 |
| multipart/form-data               | 表单中进行多文件上传          |

> 压缩（gzip），客户端支持gzip（Accept-Encoding），服务器响应头（Content-Encoding）

- 服务端压缩，zlib
  - 读流 --> 转化流 --> 写流，`fs.createStream(path).pepe(zlib.createGzip()).pipe(res)`
- 客户端是否支持gzip，请求头`Accept-Encoding: gzip`
  - 设置响应头`Content-Encoding: gzip`，告诉客户端返回的内容是gzip格式的，否则就变成了下载流的格式
- 前端压缩，webpack

> 客户端表单（enctype = "application/x-www-form-urlencoded"）

- 表单数据，**不存在跨域问题**。
- 安全隐患：后端会接收任何请求。解决方案：表单隐藏域，设置input:value唯一值，后端校验
- 使用queryString模块，转化表单数据：Buffer --> 字符串形式 --> 对象形式

> 响应数据中对象的处理（responseType）

- 服务器设置响应头Content-Type（application/json），实际返回的是json字符串
- 客户端设置responseType，浏览器自动将响应结果（json字符串）转成相应的数据类型（json对象）

> 跨域，浏览器同源策略（Access-Control-Allow-Origin，Access-Control-Allow-Headers）

- 服务器允许客户端源（Origin）访问：Access-Control-Allow-Origin
- 服务器允许客户端自定义头访问：Access-Control-Allow-Headers

> 允许访问方法（Access-Control-Allow-Methods）

- 默认只支持GET和POST方法

> OPTIONS最大存活时间（Access-Control-Max-Age）

- 以秒为单位
- 一定时间内，不会再发OPTIONS预检请求，0表示一定会发
- 如果默认请求自定义了请求头，预检请求头会自动带上：Access-Control-Request-Headers，Access-Control-Request-Method

> 服务器配置缓存

- 强制缓存，以后的请求都不会访问服务器
- 协商缓存，304，缓存时限+内容对比
- 首页（直接访问的页面）永远不会被缓存，一般指缓存一些静态引用资源
- 常用缓存会放到内存，不常用缓存会放到硬盘中（浏览器行为）
- **Expires**：绝对时间，具体某一个时间
- **Cache-Control**：相对时间，例如：`no-cache`，`no-store`，`max-age=10`
- **no-store**：不缓存
- **no-cache**：缓存，但还是会发请求
- **max-age**：设置缓存最大存活时间，秒为单位

> 如何做协商缓存

- **最后修改时间**：对比文件修改时间
  - 服务器：`Last-Modified`，赋值文件修改时间
  - 客户端：`If-Modified-Since`，第二次请求之后，客户端会回这样的头
  - 如果`Last-Modified`和`If-Modified-Since`相等，返回304
- **内容唯一标识**：
  - 获取文件摘要：`md5`，核心摸块crypto，crypto.createHash('md5').update('123444').digest('base64')
  - 服务器：`ETag`，设置唯一标识
  - 客户端：`If-None-Match`，第二次请求之后，客户端会返回这样的头
  - 如果`ETag`和`If-None-Match`相等，返回304
  - 优化：取文件开头结尾一部分+文件的总大小来作为hash戳

> 强制缓存结合协商缓存一起使用

- 强制缓存：`Cache-Control：max-age=10`，10秒过期
- 协商缓存：`Last-Modified`，`Etag`