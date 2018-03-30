import { Action } from '@ngrx/store';
import { Home } from '../models/home';

export const JAVA = 'Java';
export const ANGULAR = 'Angular';
export const MY_ARTICLES = 'Favorite_Article';

export class JavaArticleAction implements Action {
    readonly type = JAVA;
}
export class AngularArticleAction implements Action {
    readonly type = ANGULAR;
}
export class FavoriteArticleAction implements Action {
    readonly type = MY_ARTICLES;

    constructor(public payload: Home[]){}
}

export type All = JavaArticleAction | AngularArticleAction | FavoriteArticleAction;
