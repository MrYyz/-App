import { Home } from './models/home'; //方式(一)
import { Action,ActionReducer,combineReducers,Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

export interface Title {              //方式(二)
    isShowTitle?: boolean;
    isShowBack?: boolean;
    titleContent: string;
    isShowQrCode?: boolean;
    isShowSearch?: boolean;
    isShowSearchDiv?:boolean;
    isShowPosition?: boolean;
    isShowCollect?: boolean;
    isCollected?: boolean;//若ture表示已收藏课程
}
export interface UserInfo {
    _fullname:string,
    _department:string,
    _position:string,
    _title:string,
    _integral:string,
    _nextvalue:string,
    _winpercent:string,
    portrait?:string
}
export interface HomeState {
    homes:Home[];
}
export interface TitleState {       //方式(二)
    title:Title[];
}
export interface UserInfoState {
    userInfo:UserInfo[];
}

export interface AppState {
    homeState: HomeState;
    titleState: TitleState;
    userInfoState: UserInfoState;
    dataListState:{};               //方式(三) -- 建议采用
}

/**
 * @export 获取所有state,可通过getState(this.store)['titleState']方式调用
 * @param {Store<AppState>} store 当前app中的store
 * @returns {AppState} 
 */
export function getState(store:Store<AppState>):AppState {
    let state:AppState;
    store.take(1).subscribe(s => state = s)
    return state;
}


