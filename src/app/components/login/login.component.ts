import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var require:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private $http:Http,) { }

  // logo图标绝对路径 -- 主要想用用require
  logoUrl:string = require('../../../assets/images/login/login_phone.png');
  // 当前用户名
  user:string = '14599';
  // 当前密码
  psw:string = 'FCCE2C58242E15DD92FE270BBED7D0';
  // 是否显示spinner
  showSpinner:boolean = false;

  api2:string = 'http://218.13.4.182:28002/mlp/api/api.do?no=2001&sid=69F4AEAC8A56E6E5D6D1B787A4BC7474&ver=484';
  api3:string = 'http://218.13.4.182:28002/mlp/api/api.do?no=100&ver=484&os=50&wh=480X800&eid=&loginname=14599&pwd=FCCE2C58242E15DD92FE270BBED7D0&accept=text/html,text/vnd.wap.wml,video/3mv,audio/3ma,audio/aac&timestamp=1523622948909'
  ngOnInit() {
    this.$http.get(this.api2).subscribe((res)=>{
      // 留意sid是否动态生成?
      // console.log(res['_body']);//返回xml格式数据，需借助x2js转换成json格式
    })
  }
  // 登录操作
  toLogin(){

    this.showSpinner = true;

    this.$http.get(this.api3).toPromise().then(response=>{
      // console.log(response.json())
      console.log(response)
      this.showSpinner = false;
    }).catch(error=>{
      console.error(error)
      this.showSpinner = false;
      return Promise.reject(error)
    })
  }
}
