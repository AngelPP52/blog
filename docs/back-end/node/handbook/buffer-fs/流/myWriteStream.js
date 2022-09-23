// 实现NodeJs可写流的源码
// by LGH

let fs = require('fs');
let path = require('path');
let EventEmitter = require('events');
FileReaderS

class WriteStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.mode = options.mode || 0o666;
        this.encoding = options.encoding || null;
        this.fd = options.fd || null;
        this.autoClose = options.autoClose || false;
        this.emitClose = options.emitClose || false;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16 * 1024;

        // 维护可写流的流程的变量
        this.writing = false; // 是否正在写入，正在写入时，其他字节应该放到内存（Quece）中
        this.needDrain = false; // 是否已经达到预期，每轮均仅输出一次
        this.offset = this.start; // 记录写入位置
        this.len = 0; // 记录写入chunk的总长度
        this.cache = Array(); // 这里暂时使用数组代替链表结构

        this.open();
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit('error', err);
            }
            this.fd = fd;
            this.emit('open', this.fd);
        })
    }

    write(chunk, cb) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        this.needDrain = this.len >= this.highWaterMark;
        if (typeof this.fd === 'number') {
            if (this.writing) {
                this.cache.push({
                    chunk: chunk,
                    cb: cb
                });
            } else {
                this._write(chunk, () => {
                    cb();
                    this._clearBuffer();
                });
            }
        } else {
            this.once('open', () => this.write(chunk, cb));
        }
        return !this.needDrain;
    }

    _write(chunk, cb) {
        this.writing = true;
        let index = 0;
        const write = () => {
            // 一个字节一个字节写入
            // @todo 整个chunk写入，不需要维护这个index
            fs.write(this.fd, chunk.slice(index, ++index).toString('utf-8'), (err, written, buf) => {
                this.offset += written;
                if (index >= chunk.length) {
                    this.writing = false;
                    return cb();
                }
                write();
            })
        }
        write();
    }

    _clearBuffer() {
        if (this.needDrain) {
            this.needDrain = false;
            this.emit('drain');
        }
        let o = this.cache.shift();
        if (o) {
            this.write(o.chunk, o.cb);
        } else {
            if (this.autoClose) {
                fs.close(this.fd);
                this.emit('close'); // 关闭文件
            }
            this.emit('end'); // 结束
            return;
        }
    }
}

module.exports = WriteStream;