import * as types from './actions-types';

export default {
    async_add(){
        return {type: types.ASYNC_ADD}
    },
    stop_add(){
        return {type: types.STOP_ADD}
    }
}