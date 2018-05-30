import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState,Title,getState } from '../../../redux/app.states';
import * as titleReducer from '../../../redux/reducers/title.reducer';

import { httpRequest,BaseComponent } from '../../../utils/http';

declare var require:string;
@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss'],
  providers:[httpRequest]
})
export class AdvertisingComponent extends BaseComponent implements OnInit {
  
  title:Observable<Title[]>;//可观察的对象
  advertisingUrl:string = '../../../../assets/images/loading/loading2.png';
  gfLogoUrl:string = '../../../../assets/images/loading/loading1.png';
  Countdown:number = 1;//广告时间()

  constructor(private router:Router,private store:Store<AppState>,private request:httpRequest) {
    super();
    this.title = store.select(titleReducer.getTitle);
   }

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:[{isShowTitle:false}]})
    this.setCountdown()
    this.jumpToHomePage()
    this.getHomePageData()
    this.getSkeletonData()
    this.getUserData()
  }

    /**
   * 获取广告页面 指定的图片
   * @memberof AdvertisingComponent
   */
  jumpToHomePage(){
    this.protect(this.request.http(130,'').subscribe(js=>{
      if(!js) return;
      this.advertisingUrl = js.service.item._image;
    },e=>this.errorMsg(e)))
  }

  /**
   * 请求app项目骨架信息
   * @memberof AdvertisingComponent
   */
  getSkeletonData(){
    this.protect(this.request.http(2001,'').subscribe(js=>{
      if(!js) return; 
      this.store.dispatch({type:'CREATE_DATA',payload:{'skeleton2001':js.service}})
    },e=>this.errorMsg(e)))
  }

  /**
   * 请求app首页数据
   * @memberof AdvertisingComponent
   */
  getHomePageData(){
    this.protect(this.request.http(2010,'').subscribe(js=>{
      if(!js) return; 
      this.store.dispatch({type:'CREATE_DATA',payload:{'homePage2010':js.service}})
    },e=>this.errorMsg(e)))
  }

  /**
   * 获取用户信息，存到store里
   * @memberof AdvertisingComponent
   */
  getUserData(){
    this.protect(this.request.http(600,'').subscribe(js=>{
      if(!js) return; 
      this.store.dispatch({type:'setUserInfo',payload:[js['service']['item']]})
    },e=>this.errorMsg(e)))
  }

  /**
   * 广告页倒计时,结束自动跳转至home页
   * @memberof AdvertisingComponent
   */
  setCountdown(){
    let timer = setInterval(()=>{
      this.Countdown--;
      if(this.Countdown<0) {
        clearInterval(timer)
        this.router.navigate(['/home']);
      };
    },1000)
  }
}
