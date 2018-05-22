import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfoState } from '../app.states';

import { Action } from '@ngrx/store';
import { UserInfo } from '../app.states';

/*-----------------------action + reducer 合并 - 省去 类home.ts操作-----------------------*/ 

// action部分
export class SetUserInfoAction implements Action {
    readonly type = 'setUserInfo';
    constructor(public payload: UserInfo[]){}
}

// reducer部分
export const initialState: UserInfoState = { userInfo: []};
export function reducer(state = initialState, action:SetUserInfoAction): UserInfoState {
    switch(action.type) {
        case 'setUserInfo': { 
            // var obj = {
            //     _fullname:'姓名',
            //     _department:'总行广州分行',
            //     _position:'总经理',
            //     _title:'小学生',
            //     _integral:'150',
            //     _nextvalue:'800',
            //     _winpercent:'',
            //     portrait:''
            // }
            var lastPayload:object = action.payload[0];
            // action.payload = [];
            // action.payload.push(Object.assign(obj,lastPayload));
            return {userInfo: action.payload} 
        }
        default: { return state }
    }
}
export const getUserInfoState = createFeatureSelector<UserInfoState>('userInfoState');
export const getUserInfo = createSelector(
    getUserInfoState, (state: UserInfoState) => state.userInfo
)