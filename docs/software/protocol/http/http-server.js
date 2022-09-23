const http = require("http");
const EventEmitter = require("events");
const url = require("url");
const path = require("path");
const fs = require("fs");
// const debug = require('debug')('server');
// const mine = require('mine');
// const chalk = require('chalk');
const zlib = require('zlib');

class Server {
    constructor() {
        this.server = http.createServer(this.handleRequst.bind(this));
    }
    handleRequst(req, res) {
        const { query, pathname, path } = url.parse(req.url, true); // true将query转成对象
        const headers = req.headers; // 请求头
        const method = req.method; // 请求方法
        const httpVersion = req.httpVersion; // http版本号
        const data = []
        console.log(method);
        // req.on('data',(chunk)=>{
        //     data.push(chunk);
        // })
        // req.on('end', ()=>{
        //     const buf = Buffer.concat(data).toString();
        // })
        res.end('ddd');
    }
    listen(...args) {
        this.server.listen(...args);
    }
}

const server = new Server();
server.listen(3000, () => {
    console.log("server start on http://127.0.0.1:3000");
});
