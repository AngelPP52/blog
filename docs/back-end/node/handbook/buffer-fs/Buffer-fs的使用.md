# Buffer-fs模块的使用

[^日期]: 2020-06-06 11:52:00
[^作者]: Angel屁屁

## 一.Buffer模块

### 申请内存

- Buffer.alloc(size[, fill[, encoding]])，申请一段内存
  - `size`表示申请空间的长度
  - `fill`表示预填充值，默认是0
  - `encoding`表示如果`fill`是一个字符串，则可以选择一个编码格式，默认是`utf-8`

### 合并Buffer

- Buffer.concat(list[, totalLength])，合并Buffer或者Unit8Array数组
  - `list`表示待合并的数组
  - `totalLength`表示合并后返回的Buffer实例的总长度

### 判断对象是否为Buffer

- Buffer.isBuffer(obj)，判断obj是否为一个Buffer

### 拷贝buffer实例

- buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])，实例上的方法，拷贝一段Buffer
  - `target`表示待拷贝的Buffer或Unit8Array
  - `targetStart`表示要从target的第几个字节开始拷贝，默认是0
  - `sourceStart`表示buf中开始拷贝的偏移量，默认是0
  - `sourceEnd`表示buf中结束拷贝的偏移量，默认是buf.length

### 裁剪buffer实例

- buf.slice([start[, end]])，实力上的方法，裁剪一段Buffer，**返回的新Buffer与原始Buffer共用相同内存**

### 创建新的Buffer

- Buffer.from(array)，根据一个字节数组来分配一个新的Buffer
- Buffer.from(arrayBuffer[, byteOffset[, length]])，创建`ArrayBuffer`的视图
  - `arrayBuffer`表示一个`ArrayBuffer`或`SharedArrayBuffer`
  - `byteOffset`表示开始拷贝的索引
  - `length`表示拷贝的字节数
  - 注意：当传入 `TypedArray`的 `.buffer` 属性的引用时，**新建的 `Buffer` 会与 `TypedArray`共享同一内存**。
- Buffer.from(buffer)
- Buffer.from(object[, offsetOrEncoding[, length]])
- Buffer.from(string[, encoding])

## 二.Blob类型

### 使用场景

- 下载服务器的文件
- 文件预览

### 构造函数

- Blob( array, options )
  - `array`表示`ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString`等对象构成的 `Array`
  - `option`表示一个可选的字典，可以指定为type:MINE类型，endings:ENUM类型

### 生成有效的URL

- URL.createObjectURL(blob)

## 三.fs模块

### 打开文件

- fs.open(path[, flags[, mode]], callback)
  - `path`， <String> | <Buffer> | <URL>
  - `flags`，打开模式。 **默认值:** `'r'`。
  - `mode` ，读写模式。**默认值:** `0o666`（可读写）。
  - `callback` 
    - `err` 
    - `fd` ，文件描述符

### 读取文件

- fs.read(fd, buffer, offset, length, position, callback)
  - `fd`，文件描述符
  - `options`
    - `buffer`，**默认值:** `Buffer.alloc(16384)`
    - `offset`，**默认值:** `0`
    - `length`，**默认值:** `buffer.length`
    - `position`，**默认值:** `null`
  - `callback`
    - `err`
    - `bytesRead`，已读出字节数
    - `buffer`

### 写入文件

- fs.write(fd, buffer[, offset[, length[, position]]], callback)
- - `fd`，文件描述符
  - `buffer`，待写入buffer
  - `offset`，从buffer的第几位开始写
  - `length`，写入的字节长度
  - `position`，写入文件的偏移量
  - `callback`
    - `err`
    - `bytesWritten`，已写入字节数
    - `buffer`

### 一个读写文件的案例

> ````javascript
> // fs模块的使用，先读3字节，再写3字节，循环读取
> // 这种方式通常不是最优的，代码耦合极其不好维护，主要是为了引出下面文件流的使用
> var fs = require('fs');
> var path = require('path');
> fs.open(path.resolve(__dirname, 'r.txt'), 'r', 0o666, (err, fd) => {
>     if (err) { console.log(err); return; };
>     fs.open(path.resolve(__dirname, 'w.txt'), 'w', 0o666, (err, wfd) => {
>         if (err) { console.log(err); return; };
>         let bytesHaveRead = 0; // 已经读取字节数
>         let howmuchRead = 3; // 每次读写3个
>         let buffer = Buffer.alloc(howmuchRead);
>         // 递归读取
>         const next = () => {
>             // 读取
>             fs.read(fd, buffer, 0, howmuchRead, bytesHaveRead, (err, bytesRead) => {
>                 if (err) { console.log(err); return; };
>                 bytesHaveRead += bytesRead;
>                 if (bytesRead === 0) {
>                     console.log('读完了');
>                 } else {
>                     console.log('读取了几个字节：', bytesRead);
>                     // console.log(buffer.slice(0, bytesRead).toString());
>                     // 写入
>                     fs.write(wfd, buffer.slice(0, bytesRead), (err, bytesWritten, buf) => {
>                         if (err) { console.log(err); return; };
>                         console.log('写入了几个字节：', bytesWritten);
>                         next(); // 读和写都完成后，才进行下一次递归
>                     })
>                 }
>             })
>         }
>         next();
>     });
> })
> ````

### 文件流

- fs.createReadStream(path[, options])，读取文件流
  - `path`
  - `options`
    - `flags`，文件打开模式，**默认值**:`'r'`
    - `encoding`，编码格式，**默认值**:`null`
    - `fd`，文件描述符，**默认值**:`null`
    - `mode`，读写模式，**默认值**:`0o666`
    - `autoClose`，是否自动关闭文件，**默认值**:`true`
    - `emitClass`，**默认值**:`false`
    - `start`，读取范围起始位置
    - `end`，读取范围结束位置，**默认值**:`Infinity`
    - `highWaterMark`，文件流一次的大小，**默认值**:`64*1024`
  - 自己实现一个读取文件流
  
  > ````javascript
  > var EventEmitter = require('events');
  > var fs = require('fs');
  > var path = require('path');
  > 
  > class MyReadStream extends EventEmitter {
  >     constructor(path, options) {
  >         super();
  >         this.path = path;
  >         this.flags = options.flags || 'r';
  >         this.encoding = options.encoding || null;
  >         this.fd = options.fd || null;
  >         this.mode = options.mode || 0o666;
  >         this.autoClose = options.autoClose || true;
  >         this.emitClass = options.emitClose || false;
  >         this.start = options.start || 0;
  >         this.end = options.end || null;
  >         this.highWaterMark = options.highWaterMark || 64 * 1024;
  >         this.fs = options.fs || null;
  >         this.flowing = false;
  >         this.position = 0;
  >         if (typeof this.fd !== "number") {
  >             this.open(); // 打开文件
  >         }
  >         this.on('newListener', (type) => {
  >             if (type === 'data' && this.fd) {
  >                 this.flowing = true;
  >                 this.read();
  >             }
  >         });
  >     }
  > 
  >     open() {
  >         fs.open(this.path, this.flags, this.mode, (err, fd) => {
  >             if (err) {
  >                 this.emit('error', err);
  >             }
  >             this.fd = fd;
  >             this.emit('open', fd);
  >             if (this.flowing) {
  >                 this.once('data', () => { })
  >             }
  >         });
  >     }
  > 
  >     read() {
  >         const next = () => {
  >             let howMuchRead = this.end ? Math.min(this.end - this.position + 1, this.highWaterMark) : this.highWaterMark;
  >             let buffer = Buffer.alloc(howMuchRead);
  >             if (this.flowing) {
  >                 fs.read(this.fd, buffer, 0, howMuchRead, this.position, (err, bytesRead) => {
  >                     this.position += bytesRead;
  >                     if (bytesRead === 0) {
  >                         this.emit('end');
  >                         fs.close(this.fd, () => { });
  >                         this.emit('close');
  >                     } else {
  >                         this.emit('data', buffer.slice(0, bytesRead));
  >                         next();
  >                     }
  >                 });
  >             }
  >         };
  >         next();
  >     }
  > 
  >     pause() {
  >         this.flowing = false;
  >     }
  > 
  >     resume() {
  >         this.flowing = true;
  >         this.read();
  >     }
  > }
  > 
  > module.exports = MyReadStream;
  > ````
  >
  > 
  
- fs.createWriteStream(path[,options])，写入文件流

  - `path`
  - `options` 
    - `flags`，文件打开模式，**默认值:** `'w'`。
    - `encoding`，编码格式 **默认值:** `'utf8'`。
    - `fd`，文件描述符，默认值:** `null`。
    - `mode`，可读写模式，**默认值:** `0o666`。
    - `autoClose`，是否自动关闭文件，默认值:** `true`。
    - `emitClose`，默认值:** `false`。
    - `start`，写入的起始位置
    - `highWaterMark`，文件流一次的大小，**默认值:** `16*1024`。

