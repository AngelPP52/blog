import * as types from './actions-types';

export function reducer(state = {number: 0}, action){
    switch(action.type){
        case types.ADD:return {number: state.number + 1};
        default: return state;  
    }
}