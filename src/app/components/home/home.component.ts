import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as homeReducer from '../../redux/reducers/home.reducer'
import * as fromHomeActions from '../../redux/actions/home.actions'
import { Home, FAVORITE_ARTICLES } from '../../redux/models/home'
import { AppState, Title } from '../../redux/app.states'
import * as titleReducer from '../../redux/reducers/title.reducer'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homes:Observable<Home[]>;
  title:Observable<Title[]>;

  constructor(private store:Store<AppState>) {
    this.homes = store.select(homeReducer.getHomes);
    this.title = store.select(titleReducer.getTitle);
  }
  showJavaArticles(){ 
    this.store.dispatch(new fromHomeActions.JavaArticleAction())
    this.store.dispatch({type:'setTitle',payload:[{titleContent:'title1'}]})
  }
  showAngularArticles(){ 
    this.store.dispatch(new fromHomeActions.AngularArticleAction())
    this.store.dispatch({type:'setTitle',payload:[{titleContent:'title2'}]})
  }
  showFavoriteArticles(){ 
    this.store.dispatch(new fromHomeActions.FavoriteArticleAction(FAVORITE_ARTICLES))
    this.store.dispatch({type:'setTitle',payload:[{titleContent:'title3'}]})
  }

  // 头部参数
  homeTitle: [{}] =[ {
    isShowTitle:true,
    isShowBack: true,
    titleContent: 'Home',
    isShowQrCode: false,
    isShowSearch: true,
    // isShowPosition?: boolean;
  }];
  // 喜爱的文章--测试
  article = [ {id:1,title:'test article 1',category:'java'}];
  // navTexts:string[] = ['未完成课程','收藏的课程','考试中心','培训班'];
  navTexts:string[] = ['123131','123133','aweqeq','qsfasd'];

  ngOnInit() {
    this.store.dispatch(new fromHomeActions.FavoriteArticleAction(this.article))
    this.store.dispatch({type:'setTitle',payload: this.homeTitle})
  }

}
