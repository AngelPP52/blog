let fs = require('fs');
let path = require('path');
let WriteStream = require('./myWriteStream');

let rs = fs.createReadStream(path.resolve('./write.txt'), {
    highWaterMark: 4
});
// new WriteStream
let ws = new WriteStream(path.resolve('./copy.txt'), {
    highWaterMark: 4
});

// rs.pipe(ws);
// rs.on('data', (chunk) => {
//     console.log('读取到数据', chunk)
// })
ws.on('drain', () => {
    console.log('达到预期了！');
})

ws.write('1234321', (err) => {
    console.log(err);
})
ws.write('5678765', (err) => {
    console.log(err);
})
ws.write('9999999', (err) => {
    console.log(err);
})