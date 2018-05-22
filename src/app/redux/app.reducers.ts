import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from './app.states';

import * as homeReducer from './reducers/home.reducer';
import * as titleReducer from './reducers/title.reducer';
import * as userInfoReducer from './reducers/userInfo.reducer';
import * as dataListReducer from './reducers/dataList.reducer';

import { environment } from '../../environments/environment';

export const reducers: ActionReducerMap<AppState> = {
    homeState: homeReducer.reducer,
    titleState: titleReducer.reducer,
    userInfoState: userInfoReducer.reducer,
    dataListState: dataListReducer.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action:any): AppState {
        // console.log('state',state)
        // console.log('action',action)
        return reducer(state,action)
    };
};

export const metaReducers:MetaReducer<AppState>[] = !environment.production? [logger]: [];