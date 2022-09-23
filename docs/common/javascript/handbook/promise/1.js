const fs = require('fs');
const path = require('path');
// let p1 = fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf-8');
// let p2 = fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf-8');




/**判断是否为promise**/
// const isPromise = (value) => typeof value.then === 'function';
// /**all**/
// Promise.all = (promises) => {
//     return new Promise((resolve, reject) => {
//         let result = [];
//         let count = 0;
//         const setResult = (index, value) => {
//             result[index] = value;
//             if (++count === promises.length) {
//                 resolve(result);
//             }
//         }
//         for (let i = 0; i < promises.length; i++) {
//             let p = promises[i];
//             if (isPromise(p)) {
//                 p.then(data => {
//                     setResult(i, data);
//                 }, err => {
//                     reject(err);
//                 })
//             } else {
//                 setResult(i, p);
//             }
//         }
//     })
// }

// Promise.race = (promises) => {
//     return new Promise((resolve,reject)=>{
//         for (let i = 0; i < promises.length; i++) {
//             const p = promises[i];
//             if (isPromise(p)) {
//                 p.then(resolve, reject);
//             } else {
//                 resolve(p);
//             }
//         }
//     })
// }

// Promise.race([p1,p2,1]).then(data => {
//     console.log(data);
// }, err => {
//     console.log(err);
// })

// Promise.all([p1, p2, 1]).then(data => {
//     console.log(data);
// }, err => {
//     console.log(err);
// })

// let p3 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(10000);
//     },10000)
// });

// const wrap = (p) => {
//     let abort;
//     let newP = new Promise((resolve,reject)=>{
//         abort = reject;
//     });
//     let raceP = Promise.race([p,newP]);
//     raceP.abort = abort;
//     return raceP;
// }

// let p = wrap(p3);

// p.then(data=>{
//     console.log(data);
// },err=>{
//     console.log(err);
// })

// setTimeout(()=>{
//     p.abort('超时啦');
// },2000)

// Promise.resolve(100).then().then(()=>{
// 	return new Promise((resolve,reject)=>{});
// }).then(data=>console.log(data));

// function* read() {
// 	let name = yield fs.readFile('name.txt', 'utf-8');
// 	let age = yield fs.readFile(name, 'utf-8');
// 	return age;
// }

// let it = read();

// let { value, done } = it.next();
// value.then(age => {
// 	let { value, done } = it.next(age);
// 	value.then(age => {
// 		console.log(age);
// 	}, err => {
// 		console.log(err);
// 	})
// }, err => {
// 	console.log(err);
// })

// const co = it => {
// 	return new Promise((resolve, reject) => {
// 		let next = (data) => {
// 			let { value, done } = it.next(data);
// 			if (!done) {
// 				Promise.resolve(value).then(next, reject);
// 			} else {
// 				resolve(value);
// 			}
// 		}
// 		next();
// 	});
// }

// co(it).then(data => {
// 	console.log(data);
// })


// fs.readFile('name.txt','utf-8',(err,data)=>{
// 	// while(true){}
// 	console.log(data);
// })

// console.log('1111');

const promisify = (fn) =>
    (...args) => new Promise((resolve, reject) => {
        fn(...args, function (err, data) {
            if(err)reject(err);
            resolve(data);
        });
    });

module.exports = 1;