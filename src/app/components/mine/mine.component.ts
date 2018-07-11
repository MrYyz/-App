import { Component, OnInit } from '@angular/core';

import {Store} from "@ngrx/store"
import { AppState, Title, UserInfo, getState } from '../../redux/app.states';
import * as TitleReducer from '../../redux/reducers/title.reducer';
import * as UserInfoReducer from '../../redux/reducers/userInfo.reducer';
import { Observable } from 'rxjs/Observable';

import {Router} from '@angular/router';

import { httpRequest,BaseComponent } from '../../utils/http';

declare var require : any;

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss'],
  providers:[httpRequest]
})
export class MineComponent extends BaseComponent implements OnInit {

  title:Observable<Title[]>;
  user:Observable<UserInfo[]>;
  
  constructor(private store:Store<AppState>,private router:Router,private request:httpRequest) { 
    super();
    this.title = store.select(TitleReducer.getTitle);
    this.user = store.select(UserInfoReducer.getUserInfo);
  }

  // 头部参数
  mineTitle: [{}] =[ {
    isShowTitle:true,
    isShowBack: false,
    titleContent: '我',
    isShowQrCode: false,
    isShowSearch: false,
  }];
  // 【用户信息】：模拟数据
  userInfo:any = {
    _fullname:'姓名',
    _department:'总行广州分行',
    _position:'总经理',
    _title:'小学生',
    _integral:'150',
    _nextvalue:'800',
    _winpercent:"45%",
    portrait:''
  }

  // ul自定义数据
  dataset:object[] = [
    {
      url:'1',
      txt:'设置',
      showIcon:true,
      route:'setting',
      rightTxt:'暂未开发'
    },{
      url:'2',
      txt:'意见反馈',
      showIcon:true,
      route:'feedback',
      rightTxt:'暂未开发'
    }
  ]
  // 当前用户打败同级伙伴的txt
  defeatPeerText:string = '打败本部门0%的小伙伴';

  // 默认头像
  defaultPortrait:string = require('../../../assets/images/mine/wangzi.png');

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.mineTitle});
    this.getUserInformation();
  }
  ngAfterContentInit(){
  }
  /**
   * 获取当前用户信息
   * @memberof MineComponent
   */
  getUserInformation(){
    let userInfoInState = getState(this.store)['userInfoState'];
    let _user = userInfoInState.userInfo;

    // console.log('userState=',_user)
    if(userInfoInState && _user.length>0 && _user[0]._fullname){
      this.userInfo = _user[0];
      this.defeatPeer(this.userInfo);//打败了多少小伙伴
      this.calculateWidth();//动态显示用户经验值
    }else{
      this.protect(this.request.http(600,'').subscribe(js=>{
        if(!js) return;
        let userData:[object] = [js.service.item];
        // console.log('userData=',userData)
        this.store.dispatch({type:'setUserInfo',payload:userData})
        this.defeatPeer(js);//打败了多少小伙伴
        this.calculateWidth();//动态显示用户经验值
      },e=>this.errorMsg(e)))
    }
  }
  /**
   * 动态显示用户经验值
   * @memberof MineComponent
   */
  calculateWidth(){
    var a = this.userInfo['_integral'];
    var b = this.userInfo['_nextvalue'];
    var end = a / b * 100 + '%';
    var res = 0;
    var speed = 0.08;
    var experience = document.getElementsByClassName('experience')[0];
    var p = experience.children[0];
    var span = p.children[0];

    var timer = setInterval(function(){
      if(res<(a/b - 0.02)){
        speed = Number((speed*0.95).toFixed(3));
        res = res + speed;
        span['style']['width'] = res * 100 + '%';
      }else{
        clearInterval(timer);
        span['style']['width'] = end;
      }
    },16)
  }
  /**
   * 获取到用户信息后，处理当前用户打败了多少小伙伴
   * @param {any} _js 当前用户信息
   * @memberof MineComponent
   */
  defeatPeer(_js){
    let userData:object = _js.service? _js.service.item : _js;
    let scope:string,result:string;
    if(userData['_winpercent']){
      switch(userData['_leveltype']){
        case 'MiddleLevel':
          scope = '本单位';
        break;
        case 'HighLevel':
          scope = '全行';
        break;
        default:
          scope = '本部门';
          this.defeatPeerText = '打败' + scope + userData['_winpercent'] + '同层级的小伙伴';
      }
    }else{
      this.defeatPeerText = '打败' + scope + '0%' + '同层级的小伙伴';
    }
    this.userInfo = userData;
  }
  /**
   * 退出app，调101协议 并 清空localStorage，重新返回登录页面
   * @memberof MineComponent
   */
  toExitApp(){
    this.protect(this.request.http(101,'').subscribe(js=>{
      window.localStorage.clear();
      this.store.dispatch({type:'setUserInfo',payload:[{}]})
      this.store.dispatch({type:'DELETE_DATA',payload:''})
      this.router.navigate(['/login']);
    },e=>this.errorMsg(e)))
  }
  /**
   * 路由跳转至积分规则页面
   * @memberof MineComponent
   */
  jumpToRules(){
    this.router.navigate(['/rules']);
  }
  /**
   * 路由跳转至个人信息详细页面
   * @memberof MineComponent
   */
  jumpToUserInfo(){
    this.router.navigate(['/userinfo']);
  }

}
