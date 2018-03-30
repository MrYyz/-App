import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getState, CurrentState, USER_LOGIN, USER_LOGOUT, DELETE_ALL_CURRENT_LIST, UPDATE_CURRENT_LIST } from './app.state';
// import { g_Setting } from './setting';

// User 类变成接口，以方便静态化，传递数据
export interface User {
    eid: string;
    name: string;
    id?: string;
    sid?: string;
    changepwd?: string;
}

export function json2User(str: string): User {
    const json = JSON.parse(str)
    return { 
        eid: json['eid'],
        name: json['name'],
        id: json['id'],
        sid: json['sid'],
        changepwd: json['eid']
    };
}
export function isLogin(user: User): boolean {
    return user.sid ? true : false;
}

@Injectable()
export class UserService {//上面@injectable后不能＋任何字符 比如';'
    constructor(private _store: Store<AppState>) {}
    public get user() {
        let user = getState(this._store).user;
        if (!user || user.name.length == 0) {
            try {
                const userstr = window.localStorage.getItem('user');
                if(userstr) {
                    user = json2User(userstr);
                    // g_Setting.server_in = localStorage.getItem('server');
                    this._store.dispatch({ type:USER_LOGIN, payload: user });
                    return user;
                }
            }catch(error) {
                console.error('(get user)错误信息：'+error)
            }
        }
        return user;
    }
    isLogin() { return isLogin(this.user) };
    logout() {
        try{
            window.localStorage.clear();
            this._store.dispatch({ type: DELETE_ALL_CURRENT_LIST    });
        }catch(error) {
            console.error('(logout)错误信息：'+error)
        }
    }
    changePwdState() {
        // 获取本地存储对象
        const user = getState(this._store).user;
        user.changepwd = '0';
        // 存储
        try{
            localStorage.setItem('user',JSON.stringify(user))
        }catch(error) {
            console.error('(changePwdState)错误信息：'+error)
        }
        this._store.dispatch({type:USER_LOGIN, payload:user})
    }
}