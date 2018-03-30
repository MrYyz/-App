import { Action, ActionReducer, combineReducers, Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
// import { environment } from '../environments/environment';
import { User } from './user.service'

export interface AppState {
    cattop: any[];
    list_cache: {};
    course: {};
    user: User;
    userMessage: {};
    mycenter: any[];
}

export const UPDATE_CATERGORYS: string = 'UPDATE_CATERGORYS';
const cattop: ActionReducer<any[]> = (state:any[] = [],action:Action) => {
    switch (action.type) {
        case UPDATE_CATERGORYS:
            return action.payload;
        default:
            return state;
    }
}

export const UPDATE_MYCENTER: string = 'UPDATE_MYCENTER';
const mycenter: ActionReducer<any[]> = (state:any[] = [],action:Action) => {
    switch (action.type) {
        case UPDATE_MYCENTER:
            return action.payload;
        default:
            return state;
    }
}

export class CurrentState {
    constructor(flag: string, cat: string, ord:string, list:any,){
        if(!(flag in this)) { this[flag] = {}; }
        if(!(cat in this[flag])) { this[flag][cat] = {}; }
        if(!(ord in this[flag][cat])) { this[flag][cat][ord] = list; }
    }
}

// 目前保存所有得list缓存。基于复杂度和web缓存大小
export const UPDATE_CURRENT_LIST: string = 'UPDATE_CURRENT_LIST';
export const APPEND_CURRENT_LIST: string = 'APPEND_CURRENT_LIST';
export const DELETE_CURRENT_LIST: string = 'DELETE_CURRENT_LIST';
export const DELETE_ALL_CURRENT_LIST:string = 'DELETE_ALL_CURRENT_LIST';
export const ET_CURRENT_MODULE:string = ' SET_CURRENT_MODULE';
export const SET_CURRENT_CATEGRORY:string = 'SET_CURRENT_CATEGRORY';
export const SET_CURRENT_ORD:string = 'SET_CURRENT_ORD';
const list_cache:ActionReducer<{}> = (state:any = {},action: Action) => {
    switch(action.type){
        case UPDATE_CURRENT_LIST: {
            for(const a of Object.keys(action.payload)){
                if(!(a in state)) { state[a] = {}; }
                for(const b of Object.keys(action.payload[a])){
                    if(!(b in state[a])) { state[a][b] = {}; };
                    for(const c of Object.keys(action.payload[a][b])) {
                        if(!(c in state[a][b])) { state[a][b][c] = {} }
                        state[a][b][c] = action.payload[a][b][c];
                    }
                }
            }
            return state;
        }
        case APPEND_CURRENT_LIST: {
            for(const a of Object.keys(action.payload)){
                if(!(a in state)) { state[a] = {} }
                for(const b of Object.keys(action.payload[a])){
                    if(!(b in state[a])) { state[a][b] = {} }
                    for(const c of Object.keys(action.payload[a][b])) {
                        if(!(c in state[a][b])) { state[a][b][c] = [] }
                        state[a][b][c] = state[a][b][c].concat(action.payload[a][b][c]);
                    }
                }
            }
            return state;
        }
        case DELETE_CURRENT_LIST: {
            for(const a of Object.keys(action.payload)){
                if(!(a in state)) { state[a] = {} }
                for(const b of Object.keys(action.payload[a])){
                    if(!(b in state[a])) { state[a][b] = {} }
                    for(const c of Object.keys(action.payload[a][b])) {
                        if(!(c in state[a][b])) { state[a][b][c] = [] }
                        state[a][b][c] = state[a][b][c].filter((val) => {
                            for(const item of action.payload[a][b][c]){
                                if( val === item ){ return false }
                            }
                            return true;
                        })
                    }
                }
            }
            return state;
        }
        case DELETE_ALL_CURRENT_LIST: {
            state = {};
            return state;
        }
        case ET_CURRENT_MODULE: {
            state['mod$'] = action.payload;
            return state;
        }
        case SET_CURRENT_CATEGRORY: {
            if(!(action.payload[0] in state)){ state[action.payload[0]] = {} }
            return state;
        }
        case SET_CURRENT_ORD: {
            if(!(action.payload[0] in state)){ state[action.payload[0]] = {} }
            if(!(action.payload[1] in state[action.payload[0]])) { state[action.payload[0]][action.payload[1]] = {} }
            state[action.payload[0]][action.payload[1]]['ord$'] = action.payload[2];
            return state;
        }
        default:
        return state;
    }
};

export const COURSE_DETAIL: string = 'COURSE_DETAIL';
const course: ActionReducer<{}> = (state:any = [],action:Action) => {
    switch (action.type){
        case COURSE_DETAIL: {
            if(!(action.payload[0] in state)){
                state[action.payload[0]] = {}
            }
            state[action.payload[0]] = action.payload[1];
        }
    }
    return state;
}

export const USER_MESSAGE: string = 'USER_MESSAGE';
const userMessage: ActionReducer<{}> = (state:any = [],action:Action) => {
    switch (action.type){
        case USER_MESSAGE: {
            if(!(action.payload[0] in state)){
                state[action.payload[0]] = {}
            }
            state[action.payload[0]] = action.payload[1];
        }
    }
    return state;
}

export const USER_LOGIN: string = 'USER_LOGIN';
export const USER_LOGOUT: string = 'USER_LOGOUT';
const user: ActionReducer<{}> = (state:any = [],action:Action) => {
    switch (action.type){
        case USER_LOGIN: 
            return action.payload;
        case USER_LOGOUT: 
            state.sid = '';
            return state;
        default:
         return state;
    }
}

export function getState(store: Store<AppState>):AppState {
    let state: AppState;
    store.take(1).subscribe( (s) => state = s );
    return state;
}
const reducerInner: ActionReducer<any> = combineReducers({ cattop,list_cache,course,user,userMessage,mycenter});
export function reducer(state:any,action:any){ return reducerInner(state,action) }

/**
 *  如何调用? 以(新增)'UPDATE_CURRENT_LIST'为例：
 * this._store.dispatch({type:UPDATE_CURRENT_LIST, payload: new CurrentState('msg','msg','num',2)})
 */
