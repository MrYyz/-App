import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, Title } from '../../redux/app.states';
import * as titleReducer from '../../redux/reducers/title.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  title:Observable<Title[]>;
  // baseUrl:string = '../../../../assets/images/';

  // 头部参数
  cartTitle: [{}] =[ {
    isShowTitle:true,
    isShowBack: false,
    titleContent: '应用',
    isShowQrCode: false,
    isShowSearch: true,
  }];
  dataset1:object[] = [
    {
      url:'1',
      txt:'考试中心',
      showIcon:true,
      route:'examcenter'
    },{
      url:'2',
      txt:'培训班',
      showIcon:true,
      route:'trainlist'
    },{
      url:'3',
      txt:'在线调研',
      showIcon:true,
      route:'survey',
      rightTxt:'暂未开发'
    }
  ];
  dataset2:object[] = [
    {
      url:'1',
      txt:'我的收藏',
      showIcon:true,
      route:'collection'
    },{
      url:'2',
      txt:'下载的课程',
      showIcon:true,
      route:'downloadcourse',
      rightTxt:'暂未开发'
    },{
      url:'3',
      txt:'学习记录',
      showIcon:true,
      route:'studyrecord',
    }
  ];
  dataset3:object[] = [
    {
      url:'4',
      txt:'摇一摇',
      showIcon:true,
      route:'wobble',
      rightTxt:'暂未开发'
    },{
      url:'5',
      txt:'WE微课工具',
      showIcon:true,
      route:'wetool',
      rightTxt:'暂未开发'
    }
  ]

  constructor(private store:Store<AppState>) { 
    this.title = store.select(titleReducer.getTitle);
  }

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload: this.cartTitle})
  }

}
