import { Home } from './models/home';

export interface Title {
    isShowTitle?: boolean;
    isShowBack?: boolean;
    titleContent: string;
    isShowQrCode?: boolean;
    isShowSearch?: boolean;
    isShowPosition?: boolean;
}

export interface AppState {
    homeState: HomeState;
    titleState: TitleState;
    
}
export interface HomeState {
    homes:Home[];
}
export interface TitleState {
    title:Title[];
}
