import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';//这个跟下面getData()可以不要了
import 'rxjs/add/operator/toPromise';//这个跟下面getData()可以不要了
import * as X2JS from '../../../assets/js/xml2json.js';
import * as CryptoJS from 'crypto-js';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/observable';
import { AppState,Title } from '../../redux/app.states';
import * as titleReducer from '../../redux/reducers/title.reducer';
import { httpRequest,BaseComponent } from '../../utils/http';
// import { errorMsg } from '../../utils/util';

declare var require:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[httpRequest]
})
export class LoginComponent extends BaseComponent implements OnInit {
  // 可观察对对象
  title:Observable<Title[]>;

  constructor(private $http:Http,private route:ActivatedRoute,private router:Router, private store:Store<AppState>, private request:httpRequest) { 
    super()
    this.title = store.select(titleReducer.getTitle);
  }
  // 头部参数
  loginTitle:[{}] = [{
    isShowTitle:false
  }]

  // logo图标绝对路径 -- 主要想用用require
  logoUrl:string = require('../../../assets/images/login/login_phone.png');
  // 当前用户名
  user:string = '73026';
  // 当前密码
  psw:string = 'qwe123123';//未做非空判断
  // 是否显示spinner
  showSpinner:boolean = false;
  // 登陆定时器
  loginTimer:any;

  api:string = 'http://218.13.4.182:28002/mlp/api/api.do?no=100&ver=484&os=50&wh=480X800&eid=&';
  params:string = '&accept=text/html,text/vnd.wap.wml,video/3mv,audio/3ma,audio/aac&timestamp=1523622948909';

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.loginTitle});
    // this.getData()
  }
  // 登录操作
  toLogin(){
    if(this.loginTimer){clearTimeout(this.loginTimer)}
    // let regxPsw =/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
    let regx =/^[0-9a-zA-Z]{5,20}$/;
    if(this.user && this.psw){//未加首尾去空?判断
      if(this.user.match(regx)==null || this.psw.match(regx)==null){
        alert("用户名或密码格式不正确");
        return;
      }else{
        this.loginTimer = setTimeout(()=>{
          this.showSpinner = false;
          alert('请求超时，请稍后再登陆')
          this.psw = '123456';
        },5000)
      }
    }else{
      alert('账号或密码不能为空')
      return;
    }
    this.showSpinner = true;

    let pwd = CryptoJS.MD5(this.psw).toString().toUpperCase().substr(1,30);
    this.protect(this.request.http(100,"loginname="+this.user+"&pwd="+pwd).subscribe(js=>{
      // console.log('js100',js)
      clearTimeout(this.loginTimer);
      if(!js){//以下的操作均基于正常请求回数据
        this.showSpinner = false;
        this.psw = '123456';
        return;
      };
      let res = js.service;
      let storageObj = {eid:'',name:'',id:'',sid:'',changepwd:''};
      // console.log(res)
      // if(res._errno >= 0){
        storageObj.eid = res._eid || '';
        storageObj.name = res._username || '';
        storageObj.id = res._id || '';
        storageObj.sid = res._sid || '';
        storageObj.changepwd = res._changepwd || '';
        
        clearTimeout(this.loginTimer)
        window.localStorage.setItem('user',JSON.stringify(storageObj))
        window.localStorage.setItem('server',res.server['_url'])
        this.store.dispatch({type:'setUserInfo',payload:js['service']})
        this.router.navigate(['/advertising']);

        this.showSpinner = false;
    },e=>{
      this.errorMsg(e)
      this.showSpinner = false;
      clearTimeout(this.loginTimer);
    }))
  }

  getData(){
  //   // 获取footer内容 以及 获取这4个页面的标题内容
  //   var api2001 = 'http://218.13.4.182:28002/mlp/api/api.do?no=2001&sid=30303D4AA16F18D2098ECFE9315FCADD&ver=484';
  //   // ???
  //   var api140 = 'http://218.13.4.182:28002/mlp/api/api.do?no=140&sid=30303D4AA16F18D2098ECFE9315FCADD&ver=484&flag=home'
  //   // 首页整体内容
  //   var api2010 = 'http://218.13.4.182:28002/mlp/api/api.do?no=2010&sid=F444FA99C31FD4E7249B52DEA135AA42&ver=484&flag=home';
  //   // 课程中 课件+简介
  //   var api215 = 'http://218.13.4.182:28002/mlp/api/api.do?no=215&sid=094F9EFB530908C793FD308DEBCBF27E&ver=484&id=2018032315335504914cafab5d0b1646855b'
  //   // 课程里面的评论内容
  //   var api240 = 'http://218.13.4.182:28002/mlp/api/api.do?no=240&sid=A713B3BA89DBBF3AD74E36E3A7203098&ver=484&flag=course&id=20180330140352af10274069b172f393ba83&pageno=1&pagesize=15'
  //   // 未学完课程
  //   var api210 = 'http://218.13.4.182:28002/mlp/api/api.do?no=210&sid=094F9EFB530908C793FD308DEBCBF27E&ver=484&flag=course&categoryid=nofinish&order=new&pageno=1&pagesize=15'
  //   // 个人信息
  //   var api600 = 'http://218.13.4.182:28002/mlp/api/api.do?no=600&&sid=F0F7494F6FF1E39F0B7DBBC0324944AA&ver=484'

    this.$http.get('http://218.13.4.182:28002/mlp/api/api.do?no=215&id=20180510104210a934329b19e872e0bcc42c&sid=E2C2FB01E99E2ABCEECF55EB34A5C7B0&ver=484&timestamp=1526887850181').toPromise().then(response=>{
      var res = new X2JS().xml_str2json(response['_body']).Service;
      console.log(res)
      console.log(JSON.stringify(res))
    }).catch(error=>{
      return Promise.reject(error)
    })
  }
};