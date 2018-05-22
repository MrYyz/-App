import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TitleState } from '../app.states';

import { Action } from '@ngrx/store';
import { Title } from '../app.states';

/*-----------------------action + reducer 合并 - 省去 类home.ts操作-----------------------*/ 

// action部分
export class SetTitleAction implements Action {
    readonly type = 'setTitle';
    constructor(public payload: Title[]){}
}

// reducer部分
export const initialState: TitleState = { title: []};
export function reducer(state = initialState, action:SetTitleAction): TitleState {
    switch(action.type) {
        case 'setTitle': { 
            var obj = {
                isShowTitle: true,
                isShowBack: true,
                titleContent: 'test专用',
                isShowQrCode: false,
                isShowSearch: false,
                isShowPosition: false,
                isShowCollect: false,
            }
            var lastPayload:object = action.payload[0];
            action.payload = [];
            action.payload.push(Object.assign(obj,lastPayload));
            return {title: action.payload} 
        }
        default: { return state }
    }
}
export const getTitleState = createFeatureSelector<TitleState>('titleState');
export const getTitle = createSelector(
    getTitleState, (state: TitleState) => state.title
)