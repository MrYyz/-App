import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, Title } from '../../redux/app.states';
import * as titleReducer from '../../redux/reducers/title.reducer';

import {httpRequest,BaseComponent} from '../../utils/http'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers:[httpRequest]
})
export class CartComponent extends BaseComponent implements OnInit {

  title:Observable<Title[]>;
  // baseUrl:string = '../../../../assets/images/';
  
  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private request:httpRequest) { 
    super()
    this.title = store.select(titleReducer.getTitle);
  }
  
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
      route:'examcenter',
      count:0
    },{
      url:'2',
      txt:'培训班',
      showIcon:true,
      route:'trainlist',
      count:0
    },{
      url:'3',
      txt:'在线调研',
      showIcon:true,
      route:'survey',
      // rightTxt:'暂未开发',
      count:0
    }
  ];
  dataset2:object[] = [
    {
      url:'1',
      txt:'我的收藏',
      showIcon:true,
      route:'collection',
      count:0
    },{
      url:'2',
      txt:'下载的课程',
      showIcon:true,
      route:'downloadcourse',
      rightTxt:'暂未开发',
      count:0
    },{
      url:'3',
      txt:'学习记录',
      showIcon:true,
      route:'studyrecord',
      count:0
    }
  ];
  dataset3:object[] = [
    {
      url:'4',
      txt:'摇一摇',
      showIcon:true,
      route:'wobble',
      rightTxt:'暂未开发',
      count:0
    },{
      url:'5',
      txt:'WE微课工具',
      showIcon:true,
      route:'wetool',
      rightTxt:'暂未开发',
      count:0
    }
  ]
  
  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload: this.cartTitle});
    this.getMsg();
  }

  getMsg(){
    this.protect(this.request.http(2000,'').subscribe(js=>{
      // console.log('消息：',js.service.item)
      if(!js.service) return;
      let data = js.service.item;
      data.forEach(ele => {
        switch(ele._type){
          case 'exam':
            this.dataset1[0]['count'] = ele._itemcount;
          break;
          case 'survey':
            this.dataset1[2]['count'] = ele._itemcount;
          break;
          case 'positioncoursecount':
          break;
          case 'collect':
            this.dataset2[0]['count'] = ele._itemcount;
          break;
          case 'train_signin':
          break;
          case 'train_apply':
          break;
        }
      });
    },e=>{
      this.errorMsg(e)
    }))
  }

}
