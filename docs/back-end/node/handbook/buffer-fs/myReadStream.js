var EventEmitter = require('events');
var fs = require('fs');
var path = require('path');

class MyReadStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.fd = options.fd || null;
        this.mode = options.mode || 0o666;
        this.autoClose = options.autoClose || true;
        this.emitClass = options.emitClose || false;
        this.start = options.start || 0;
        this.end = options.end || null;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.fs = options.fs || null;
        this.flowing = false;
        this.position = 0;
        if (typeof this.fd !== "number") {
            this.open(); // 打开文件
        }
        this.on('newListener', (type) => {
            if (type === 'data' && this.fd) {
                this.flowing = true;
                this.read();
            }
        });
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit('error', err);
            }
            this.fd = fd;
            this.emit('open', fd);
            if (this.flowing) {
                this.once('data', () => { })
            }
        });
    }

    read() {
        const next = () => {
            let howMuchRead = this.end ? Math.min(this.end - this.position + 1, this.highWaterMark) : this.highWaterMark;
            let buffer = Buffer.alloc(howMuchRead);
            if (this.flowing) {
                fs.read(this.fd, buffer, 0, howMuchRead, this.position, (err, bytesRead) => {
                    this.position += bytesRead;
                    if (bytesRead === 0) {
                        this.emit('end');
                        fs.close(this.fd, () => { });
                        this.emit('close');
                    } else {
                        this.emit('data', buffer.slice(0, bytesRead));
                        next();
                    }
                });
            }
        };
        next();
    }

    pause() {
        this.flowing = false;
    }

    resume() {
        this.flowing = true;
        this.read();
    }
}

module.exports = MyReadStream;