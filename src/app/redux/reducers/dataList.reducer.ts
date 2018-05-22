import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Action } from '@ngrx/store';

export function reducer(state = {}, action:Action): {} {
    switch(action.type) {
        case 'CREATE_DATA': {
            for(const a of Object.keys(action.payload)){
                if(!(a in state)) { state[a] = action.payload[a]; }
            }
            break;
            // 调用方式：this.store.dispatch({type:'CREATE_DATA',payload:{'xx':{...}}})
        }
        case 'DELETE_DATA': {
            if(action.payload in state) { delete state[action.payload] }
            break;
            // 调用方式：this.store.dispatch({type:'DELETE_DATA',payload:'xx'})
        }
        case 'UPDATE_DATA': {
            for(const a of Object.keys(action.payload)){
                if(a in state) { state[a] = action.payload[a]; }
            }
            break;
            // 调用方式：this.store.dispatch({type:'UPDATE_DATA',payload:{'xx':{...}}})
        }
        case 'UPDATE_ALL_DATA': {
            state = {};
            break;
            // 调用方式：this.store.dispatch({type:'UPDATE_ALL_DATA',payload:''}}
        }
    }
    return state;
}
export const getDataListState = createFeatureSelector<{}>('dataListState');
export const getDataList = createSelector(
    getDataListState, (state: {any}) => state
)