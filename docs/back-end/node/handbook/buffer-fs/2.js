// fs中流的使用
var fs = require('fs');
// var path = require('path');
// var MyReadStream = require('./myReadStream');
// // new MyReadStream fs.createReadStream
// let fStream = new MyReadStream(path.resolve(__dirname, 'r.txt'), {
//     flags: 'r',
//     encoding: null,
//     fd: null,
//     mode: 0o666,
//     autoClose: true,
//     emitClose: false,
//     start: 0,
//     end: 6,
//     highWaterMark: 3,
//     fs: null
// })

// fStream.on('open', (fd) => {
//     console.log('打开文件，描述符：', fd);
// })


// // fStream.on('data', (chunk) => {
// //     fStream.pause();
// //     setTimeout(()=>{
// //         fStream.resume();
// //     },1000);
// //     console.log(chunk);
// // })

// fStream.on('end', () => {
//     console.log('读完了');
// })

// fStream.on('error', (err) => {
//     console.log('出错了', err)
// })

// fStream.on('close', () => {
//     console.log('关闭文件')
// })

let ws = fs.createWriteStream('ws.txt',{
    flags: 'w',
    autoClose: true,
    highWaterMark: 1
});

ws.write('1',(err)=>{
    if(err){
        console.log('写入出错',err);
    }
});
ws.write('1',(err)=>{
    console.log('写入出错',err);
});
ws.write('1',(err)=>{
    console.log('写入出错',err);
});
ws.write('1',(err)=>{
    console.log('写入出错',err);
});
ws.on('drain',()=>{
    console.log('满足highWaterMark的限制');
})