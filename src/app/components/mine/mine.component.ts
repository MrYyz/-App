import { Component, OnInit } from '@angular/core';

import {Store} from "@ngrx/store"
import { AppState, Title } from '../../redux/app.states';
import * as titleReducer from '../../redux/reducers/title.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {

  title:Observable<Title[]>;

  // 头部参数
  mineTitle: [{}] =[ {
    isShowTitle:true,
    isShowBack: false,
    titleContent: '我',
    isShowQrCode: false,
    isShowSearch: false,
  }];

  userInfo:object = {
    userName:'姓名',
    workPlace:'总行广州分行',
    zhicheng:'总经理',
    rank:'小学生',
    currentRich:'700',
    totalRich:'800',
    surpass:"45%",
    portrait:''
  }

  curWidth:string;
  dataset:object[] = [
    {
      url:'1',
      txt:'设置',
      showIcon:true,
      route:'setting'
    },{
      url:'2',
      txt:'意见反馈',
      showIcon:true,
      route:'idea'
    }
  ]
  constructor(private store:Store<AppState>) { 
    this.title = store.select(titleReducer.getTitle);
  }

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.mineTitle})
    this.calculateWidth()
  }

  calculateWidth(){
    var a = this.userInfo['currentRich'];
    var b = this.userInfo['totalRich'];
    var end = a / b * 100 + '%';
    var res = 0;
    // var timer = setInterval(function(){
    //   if(res<(a/b)){
    //     res = res + 0.08;
    //     // return res * 100 + '%';
    //     this.curWidth = res * 100 + '%';
    //   }else{
    //     clearInterval(timer);
    //     this.curWidth = end;
    //     // return end;
    //   }
    //   console.log(this.curWidth)
    // },100)
    return end;
    
  }
}
