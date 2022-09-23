/* eslint-disable require-yield */
import * as types from './actions-types';
import {take, put, takeEvery, call, delay, cps, all, fork, cancel} from 'redux-saga/effects';

function delay2(ms, callback) {
    setTimeout(()=>{
        callback('ok');
    }, ms)
}

function * add(){
    while(true){
        yield take(types.ASYNC_ADD)
        yield cps(delay2, 1000);
        yield put({type: types.ADD});
    }
}

// function delay(ms) {
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve();
//         },ms)
//     })
// }

function * addWatcher() {
    let task = yield fork(add);
    yield take(types.STOP_ADD);
    yield cancel(task);
}

function * logger() {
    console.log('action');
}

function * loggerWatcher() {
    yield takeEvery(types.ADD, logger)
}

// export function * rootSaga(){
//     yield all([addWatcher]);
//     console.log('done');
// }



export function* increment() {
    while(true){
        yield take(types.ASYNC_ADD)
        yield delay(1000);
        yield put({type:types.ADD});
    }
}

export function* incrementWatcher() {
    const task = yield fork(increment);
    yield take(types.STOP_ADD);
    yield cancel(task);
}

export function* rootSaga() {
    yield all([loggerWatcher(), incrementWatcher()]);
    console.log('done');
}