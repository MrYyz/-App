import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as homeActions from '../actions/home.actions';
import { JAVA_ARTICLES, ANGULAR_ARTICLES } from '../models/home';
import { HomeState } from '../app.states';

export const initialState: HomeState = { homes: []};

export function reducer(state = initialState, action:homeActions.All): HomeState {
    switch(action.type) {
        case homeActions.JAVA: { return {homes: JAVA_ARTICLES} }
        case homeActions.ANGULAR: { return {homes: ANGULAR_ARTICLES} }
        case homeActions.MY_ARTICLES: { return {homes: action.payload} }
        default: { return state }
    }
}
export const getHomeState = createFeatureSelector<HomeState>('homeState');
export const getHomes = createSelector(
    getHomeState, (state: HomeState) => state.homes
)