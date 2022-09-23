## saga
 - take - 只监听一次指定的actionType
 - takeEvery - while循环监听指定的actionType
 - put - 派发一个action
 - call - 调用一个返回promise的方法，第二个参数是传的参数数组
 - apply - 调用一个返回promise的方法，第一个参数是context，第三个参数是传的参数数组
 - fork - 开启一个子进程进行其他的任务
 - cancel - 取消一个任务（fork开启的任务）
 - cps - 调用node风格进行回调的函数`(data, err) => {}`