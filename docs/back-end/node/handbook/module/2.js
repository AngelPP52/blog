let _a = require('./a');
// console.log(a);
let fs = require('fs');
let path = require('path');
let vm = require('vm');



function Module(fileName) {
    this.id = fileName;
    this.exports = {};
}

Module._cache = {};

Module._extensions = {
    '.js': (module, fileName) => {
        let content = fs.readFileSync(fileName, 'utf8');
        module._compile(content, fileName);
     },
    '.json': (module, fileName) => {
        let content = fs.readFileSync(fileName, 'utf8');
        module.exports = JSON.parse(content);
     },
    '.node': (module, fileName) => { }
}

Module.wrap = (code) =>{
    // 拼接成可执行函数字符串
    let fnStr = `(function (exports, require, module, __filename, __dirname){${code}})`;
    return fnStr;
}

Module._load = (id) => {
    let cacheModule = Module._cache[id];
    if (cacheModule) {
        return cacheModule.exports;
    }
    // 获取文件绝对路径
    let fileName = path.resolve(__dirname, id);
    let keys = Object.keys(Module._extensions);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (fs.existsSync(fileName + key)) {
            fileName += key;
            break;
        }
    }
    // 创建新的module实例
    let module = new Module(fileName);
    Module._cache[id] = module;
    // 尝试加载module
    tryModuleLoad(module, fileName);

    return module.exports;
}

const tryModuleLoad = (module, fileName) => {
    module.load(fileName);
}

Module.prototype.load = function(fileName) {
    // 获取文件扩展名，根据扩展名获取策略函数
    let extName = path.extname(fileName);
    let extFn = Module._extensions[extName];
    extFn(this, fileName);
}

Module.prototype._compile = function(code, fileName){
    let fnStr = Module.wrap(code);
    let fn = vm.runInThisContext(fnStr); // 使用一个沙箱来执行上面函数
    let exports = this.exports;
    let require = qqRequire;
    let module = this;
    let __filename = fileName;
    let __dirname = path.dirname(fileName);
    fn.call(exports, exports, require, module, __filename, __dirname); // this指向exports
}

/** 这个是我要自定义的require **/
const qqRequire = Module.prototype.require = function(id) {
    return Module._load(id)
}

// let a = qqRequire('./a.json');
let a = qqRequire('./a');
console.log(a);