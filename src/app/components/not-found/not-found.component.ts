import { Component, OnInit, Input, } from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {AppState,Title} from '../../redux/app.states';
import * as TitleReducer from '../../redux/reducers/title.reducer'

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  title:Observable<Title[]>;

  constructor(private store:Store<AppState> ) {
    this.title = store.select(TitleReducer.getTitle);
   }

  name: String = '';
  
  // 头部参数
  notFoundTitle:[{}] = [{
    isShowTitle:true,
    isShowBack:true,
    titleContent:'404,NotFound!',
  }]
  
  ngOnInit() {
    this.setBgSize()
    this.store.dispatch({type:'setTitle',payload:this.notFoundTitle})
  }
  
  setBgSize(){
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var body = document.getElementsByTagName('body');
    var notfound = document.getElementById('notfound');
    var head = document.getElementById('header');

    notfound.style.width = w + 'px';
    if(head){
      var hh = head.offsetHeight;
      notfound.style.height = (h-hh) + 'px';
    }else{
      notfound.style.height = h + 'px';
    }
  }

}
