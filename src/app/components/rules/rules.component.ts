import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {Store} from '@ngrx/store';
import {AppState,Title,getState} from '../../redux/app.states';
import {Observable} from 'rxjs/observable';
import * as TitleReducer from '../../redux/reducers/title.reducer'
import { firstChoice,getMinHeight } from '../../utils/util';
import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
//解决Angular4 绑定html内容 警告处理
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  
  title:Observable<Title[]>;
  
  // 头部参数
  rulestitle:[{}] = [{
    isShowBack:true,
    titleContent:'我的头衔'
  }]
  // 当前用户信息
  curUserInfo:{};
  // 获取#pagination4节点
  // @ViewChild('pagination4') pagination4:ElementRef;
  // swiper
  swiper4:any;

  integralUrl:any;
  rankUrl:any;

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private sanitizer:DomSanitizer) {
    this.title = store.select(TitleReducer.getTitle);
  }
  
  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.rulestitle});
    this.curUserInfo = getState(this.store)['userInfoState']['userInfo'][0];
    // console.log(this.curUserInfo)
    this.integralUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.curUserInfo['_integralurl']); 
    this.rankUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.curUserInfo['_detailurl']); 
    // console.log('curUserInfo=>',this.curUserInfo)
    // 功能简介：为选项卡增加['我的头衔','我的积分']
    this.showRulesTabCard();  
    //实现swiper标题分类首选样式
    // firstChoice(this.pagination4.nativeElement);  
  }
  
  ngAfterViewInit() {
    //实现被调用的元素获取最小高度
    // getMinHeight('#swiper-container4',['.swiper-pagination-bullets']);
    getMinHeight('#swiper-container4',[]);
  }

  /**
   * 功能简介：为选项卡增加['我的头衔','我的积分']
   * @memberof RulesComponent
   */
  showRulesTabCard(){
    let swiper4 = new Swiper('#swiper-container4',{
      autoplay:false,
      // on:{
      //   slideChange:function(){
      //     firstChoice(this.pagination4.nativeElement);
      //   }.bind(this)
      // },
      // pagination:{
      //   el:'.swiper-pagination4',
      //   clickable:true,
      //   renderBullet:function(index,className){
      //     let contentList:string[] = ['我的头衔','我的积分'];
      //     let spanStyle:string = 'display:inline-block;width:50%;text-align:center;height:2.5rem;line-height:2.5rem;';
      //     return '<span class="'+className+'" style="'+spanStyle+'">'+contentList[index]+'</span>';
      //   }
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
    this.swiper4 = swiper4;
  }
  tabTitle(this){
    let curTitle = getState(this.store)['titleState'].title[0].titleContent;
    let content:string;
    if(curTitle == '我的头衔'){
      content = '我的积分';
    }else{
      content = '我的头衔';
    }
    this.store.dispatch({type:'setTitle',payload:[{titleContent:content}]})
  }
}
