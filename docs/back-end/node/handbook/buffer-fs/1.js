// fs模块的使用
var fs = require('fs');
var path = require('path');
fs.open(path.resolve(__dirname, 'r.txt'), 'r', 0o666, (err, fd) => {
    if (err) { console.log(err); return; };
    fs.open(path.resolve(__dirname, 'w.txt'), 'w', 0o666, (err, wfd) => {
        if (err) { console.log(err); return; };
        let bytesHaveRead = 0; // 已经读取字节数
        let howmuchRead = 3; // 每次读写3个
        let buffer = Buffer.alloc(howmuchRead);
        // 递归读取
        const next = () => {
            // 读取
            fs.read(fd, buffer, 0, howmuchRead, bytesHaveRead, (err, bytesRead) => {
                if(err){this.emit('error',err)}
                if (err) { console.log(err); return; };
                bytesHaveRead += bytesRead;
                if (bytesRead === 0) {
                    console.log('读完了');
                } else {
                    console.log('读取了几个字节：', bytesRead);
                    // console.log(buffer.slice(0, bytesRead).toString());
                    // 写入
                    fs.write(wfd, buffer.slice(0, bytesRead), (err, bytesWritten, buf) => {
                        if (err) { console.log(err); return; };
                        console.log('写入了几个字节：', bytesWritten);
                        next(); // 读和写都完成后，才进行下一次递归
                    })
                }
            })
        }
        next();
    });
})