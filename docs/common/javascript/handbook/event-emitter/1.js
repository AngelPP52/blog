let EventEmitter = require('events');

let event = new EventEmitter();

event.on('newListener', (type) => {
    console.log('订阅了：', type);
    event.emit(type, `我是newListener的${type}`)
})

// 不能使用箭头函数
const aCB = function (e) {
    console.log('a', e);
}

const bCB = function (e) {
    console.log('b', e);
}

event.on('a', aCB)
event.on('a', aCB)

// event.off('a', aCB);

event.once('b', bCB)

// event.emit('a', '我是a');
// event.emit('a', '我是a2');
// event.emit('b', '我是b');
// event.emit('b', '我是b2');