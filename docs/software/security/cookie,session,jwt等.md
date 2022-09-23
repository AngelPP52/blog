### Cookie

由服务器派发，**保存在客户端中**（安全性不高，可能会被篡改），下一次请求时自定携带Cookie发送到服务器

不可跨域，每个Cookie都会绑定过到单个域名中，一级和二级域名之间允许共享使用

需要设置withCredentials为true，解决Cookie不同域下无法携带的问题。另外，这样请求获得的第三方Cookie，将会一九享受同源策略

Cookie的字段：

1. Cookie由服务器通过设置`Set-Cookie`字段进行派发
2. 每次请求，浏览器会自动给`header`添加Cookie字段
3. Cookie的一些属性：
   1. `name=value` - 键值对
   2. `Domain` - 域名（只派发到这些域名）
   3. `maxAge` - 失效时间
   4. `secure` - 只允许https
   5. `Path` - 路径（只派发到这些路径）
   6. `Expires` - 过期时间
   7. `httpOnly` - 只能通过http读取Cookie，防止xss攻击

缺点：

1. 大小受限。每个域名下最多只能由20条`cookie`
2. 安全性，`cookie`暴露出去了，别人就可以拿着你登陆过的`session`信息去做一些敏感操作
3. 有些状态不可能保存在客户端

### Session

由服务器派发，**保存在服务器中**，安全性相对Cookie好很多，结合了Cookie

认证流程：

1. 服务器根据用户信息创建Session
2. 将Session唯一标识SessionID返回给客户端
3. 客户端将SessionID存入Cookie，并且记录SessionID的域名
4. 下次请求时，判断此域名下是否存在Cookie信息，并将Cookie中的发送给服务器，服务器获取Cookie中的SessionID，根据SessionID查找Session信息，来验证呀哦那个胡是否已经登录或者登录失效

### Cookie与Session区别

- Session比Cookie安全
- Cookie只能存字符串类型，任何类型的数据都会先转成字符串；Session可以存任意数据类型
- Cookie可以设置长时间保持；Session是会话级别的，一般客户端关闭或者Session超时就会失效
- Cookie只有4kb的大小，Session则可以很大
- Seesion依靠Cookie，把SessionID存到客户端中

### Token

简单的token组成：uid（用户身份标识），time（时间戳），sign（签名）

### Token与Session的区别

- Session是会话级别的状态，使服务端有状态化。而Token是令牌，**使服务端无状态化**，不存储会话信息

- 相对来说，Token安全性比Session好，因为使用Token每一个请求都有签名可以防止监听以及重放攻击，而Session必须依赖链路层来保障安全

- Session认证只是简单把User存储到Session，只要拥有SessionID，就认为有此User的全部权利。而Token，提供的使 认证 和 授权，认证是针对用户，授权是针对App。其目的是让某App有权利访问某用户的信息。

  简单来说，如果你的用户数据需要和第三方共享，或者允许第三方调用API接口，用Token。如果只是自己的网站，自己的App，用啥都无所谓~

### JWT

Json Web Token，目前最流行的跨域认证解决方案（分布式），是一种认证授权机制

可以使用HMAC算法或者是RSA的公钥/私钥对JWT进行签名，**数字签名**保证了传递的信息是可靠的

认证流程：

1. 用户登录，服务器认证成功后，给客户端返回一个JWT
2. 客户端保存这个token
3. 下次请求时，设置请求头：`Authorization: Bear <token>`
4. 服务器验证JWT合法性，再允许用户行为
5. JWT可以包含一些会话信息，**减少数据库查询**
6. JWT不使用Cookie，所以不需要担心跨域资源问题
7. JWT使服务器无状态化

使用方式：

1. 设置请求头：`Authorization: Bear <token>`
2. 跨域时，JWT放到POST请求体里
3. url中，如`localhost:8080/user?token=xxx`

### Token与JWT的区别

- Token：在接收客户端发过来的Token时，需要查询数据库获取用户信息，再验证是否有效
- JWT：服务端使用密钥解密进行校验即可，而且JWT自包含了用户信息和加密的数据