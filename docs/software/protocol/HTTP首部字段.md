## 通用首部字段

| 首部字段名        | 说明·                      |
| ----------------- | -------------------------- |
| **Cache-Control** | 控制缓存行为               |
| **Connection**    | 长连接                     |
| Date              | 报文日期                   |
| Pragma            | 报文指令                   |
| Trailer           | 报文尾部的首部             |
| Trasfer-Encoding  | 指定报文主体的传输编码方式 |
| Upgrade           | 升级为其他协议             |
| Via               | 代理服务器信息             |
| Warning           | 错误通知                   |

## 请求首部字段

| 首部字段名            | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| Accept                | 用户代理可处理的媒体类型                                     |
| Accept-CharSet        | 优先的字符集                                                 |
| **Accept-Encoding**   | 优先的编码，例如`gzip`                                       |
| Accept-Language       | 优先的语言                                                   |
| **Authorization**     | 认证信息，例如`token`信息                                    |
| Expect                | 期待服务器的特定行为                                         |
| From                  | 用户的电子邮箱地址                                           |
| Host                  | 请求资源所在的服务器                                         |
| **if-Match**          | 告诉服务器`ETag`的值，仅在请求的资源`满足此值`时才会返回资源（或上传资源） |
| **if-Modified-Since** | 告诉服务器`Last-Modified`的值，不一致才发`304`               |
| **if-None-Match**     | 告诉服务器`ETag`的值，`没有任何资源满足此值时`才返回。优先级高于`if-Modified-Since` |
| **if-Range**          | 当字段值中的条件得到满足时，`Range`字段才起作用              |
| if-Unmodified-Since   | 比较资源的更新时间（和if-Modified-Since相反）                |
| Max-Forwards          | 最大传输跳数                                                 |
| Proxy-Authorization   | 代理服务器需要客户端认证                                     |
| **Range**             | 需要服务器返回文件的那一部分，可以一次性请求多个部分         |
| **Referer**           | 请求中的URI的原始请求方，与`Origin`类似，但Origin不包含路径信息 |
| TE                    | 传输编码的优先级                                             |
| **User-Agent**        | HTTP客户端程序的信息                                         |
| **Origin**            | 客户端源，服务器根据这个字段可以判断是否允许跨域             |

## 响应首部字段

| 首部字段名                       | 说明                                                       |
| -------------------------------- | ---------------------------------------------------------- |
| Accept-Range                     | 是否接收字节范围                                           |
| Age                              | 资源的创建时间                                             |
| **ETag**                         | 资源的匹配信息，例如一个hash值。与if-None-Match对应        |
| Location                         | 客户端重定向至指定的URI                                    |
| Proxy-Authenticate               | 代理服务器对客户端的认证信息                               |
| Retry-After                      | 再次发送请求的时机                                         |
| Server                           | 服务器的信息                                               |
| Vary                             | 代理服务器缓存的管理信息                                   |
| www-Authenticate                 | 服务器对客户端的认证                                       |
| **Access-Control-Allow-Origin**  | 该响应的资源是否被允许与给定的origin共享                   |
| **Access-Control-Allow-Headers** | 预检请求响应体中，可支持的请求首部名字                     |
| **Access-Control-Allow-Methods** | 预检请求响应体中，明确了所要访问的资源允许使用的方法[列表] |
| **Access-Control-Max-Age**       | 预检请求响应体中，即上面两个字段的信息可以被缓存多久       |
| **Last-Modified**                | 最后修改时间，与if-Modified-Since对应                      |

## 实体首部字段

| 首部字段名           | 说明                               |
| -------------------- | ---------------------------------- |
| **Allow**            | 资源可支持的HTTP方法               |
| **Content-Encoding** | 实体的编码方式，例如`gzip`         |
| Content-Language     | 实体的自然语言                     |
| Content-Length       | 实体的内容大小（字节为单位）       |
| Content-Location     | 代替对应资源的URI                  |
| Content-MD5          | 实体的报文摘要                     |
| **Content-Range**    | 一个数据片段在某个文件中的位置范围 |
| **Content-Type**     | 实体主体的媒体类型                 |
| **Expires**          | 实体的过期时间                     |
| **Last-Modified**    | 资源的最后修改时间                 |

> **XMLHttpRequest.responseType**属性用来设置响应数据的类型，当然我们要事先知道服务器返回的类型，和我们设置的返回值类型需要兼容，否则就会发现服务器返回的数据变成了null，即使服务器已经返回了数据

## 参考

- [mdn文档](https://developer.mozilla.org/zh-CN/docs)