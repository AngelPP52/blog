import EventEmitter from 'events';

export default function createSagaMiddleware() {
    let event = new EventEmitter();
    function times(cb, total) { // 
        let count = 0;
        return function next() {
            if (++count === total) {
                cb();
            }
        }
    }
    function sagaMiddleware({ getState, dispatch }) {
        function run(generator, callback) {
            let it = typeof generator === 'function' ? generator() : generator; // 如果是生成器（函数），得到它的返回值。否则就已经是一个迭代器
            function next(action) { // saga的next，异步迭代所有的迭代器
                let { value: effect, done } = it.next(action); // 这个action给了saga yield返回值
                if (!done) { // it结束了
                    if (typeof effect[Symbol.iterator] === 'function') { // 这里支持yield的一个迭代器
                        run(effect); // 重新run这个新的迭代器
                        next(); // 下一个yield
                    } else if (effect.then) { // 这里支持yield的一个promise，redux-promise
                        effect.then(next);
                    } else {
                        switch (effect.type) {
                            case 'TAKE':
                                event.once(effect.actionType, next); // 下一个yield，如yield put(...)
                                break;
                            case 'PUT':
                                dispatch(effect.action);
                                next(); // 下一个yield
                                break;
                            case 'FORK':
                                let newTask = effect.task();
                                run(newTask); // 开启一个子进程处理task（生成器）
                                next(newTask); // 下一个yield，传递newTask是用于支持取消任务时获得具体的任务
                                break;
                            case 'CALL': // call的fn参数是一个返回promise的函数
                                effect.fn(...effect.args).then(next);
                                break;
                            case 'CPS':
                                effect.fn(...effect.args, next); // cps的fn参数是一个node回调风格的函数
                                break;
                            case 'ALL':
                                let fns = effect.fns;
                                let done = times(next, fns.length); // 返回一个done方法（统计所有的已经完成的中间件），当所有中间件都调用done的时候，才会调用next
                                for (let i = 0; i < fns.length; i++) {
                                    const fn = fns[i];
                                    run(fn, done); // 一个中间件（fn）完成后，调用一次done
                                }
                                break;
                            case 'CANCEL':
                                effect.task.return('over'); // 当任务被中断后，当前的迭代器就相当于作废了
                                break;
                            default: break;
                        }
                    }
                } else {
                    callback && callback();
                }
            }
            next();
        }
        sagaMiddleware.run = run;
        return function (next) {
            return function (action) { // 强壮后的dispatch
                event.emit(action.type, action);
                return next(action); // middleware的next，异步迭代所有的中间件强壮后的dispatch
            }
        }
    }
    return sagaMiddleware;
}