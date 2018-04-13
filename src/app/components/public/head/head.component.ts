import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, Title } from '../../../redux/app.states';
import * as titleReducer from '../../../redux/reducers/title.reducer'

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'appHeader',
  templateUrl:'./head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  title:Observable<Title[]>;

  constructor(private store:Store<AppState>,private route: ActivatedRoute, private router: Router) { 
    this.title = store.select(titleReducer.getTitle);
  }

  isSearch:boolean = false;
  searchText:string;

  ngOnInit() {
    // this.getLocation();
    this.isSearchComponent();
  }
  AfterViewInit() { }
  
  // 刷新当前搜索页面仍显示搜索框
  isSearchComponent(){
    // this.route.params.subscribe((params) => {
    //   console.log('路由参数：',params)
    // });
    if(window.location.pathname.indexOf('search')>=0){
      this.isSearch = true;
    } 
  }

  onClickHeader(e){
    e = e || window.event;
    switch(e.target.className){
      // 返回键
      case 'iconfont icon-back':
        this.routeBack();
        break;
      // 搜索键
      case 'iconfont icon-search':
        this.openSearch();
        break;
      // 定位键
      case 'iconfont icon-compass':
        
        break;
      // 清空搜索内容
      case 'iconfont icon-close':
        this.cleanSearchText();
        break;
      // 执行搜索功能
      case 'btnSearch':
        
        break;
      default:
        console.log(e.target.className)
    }
  }
  
  routeBack(){
    this.isSearch = false;
    this.searchText = '';
    history.back();
  }

  openSearch(){console.log('running openSearch')
    this.isSearch = true;
    this.router.navigate(['/search'])
  }

  cleanSearchText(){
    this.searchText = '';
  }



  // 获取设备当前所在的地理位置
  getLocation(){   
    console.info('navigator=',navigator.geolocation)
    if (navigator.geolocation){   
        navigator.geolocation.getCurrentPosition(showPosition,showError);   
    }else{
      alert("浏览器不支持地理定位。");
    }
    // 错误信息提示内容
    function showError(error){console.error(error)
      switch(error.code) {   
          case error.PERMISSION_DENIED:   
              alert("定位失败,用户拒绝请求地理定位");   
              break;   
          case error.POSITION_UNAVAILABLE:   
              alert("定位失败,位置信息是不可用");   
              break;   
          case error.TIMEOUT:   
              alert("定位失败,请求获取用户位置超时");   
              break;   
          case error.UNKNOWN_ERROR:   
              alert("定位失败,定位系统失效");   
              break;   
      }   
    }
    // 通过坐标获取详细地址
    function showPosition(position){   
      var lat = position.coords.latitude; //纬度   
      var lag = position.coords.longitude; //经度   
      // console.log('纬度:'+lat+',经度:'+lag);
      var latlon = lat+','+lag;   

      //google   谷歌地图接口交互 -- 要翻墙先可以用 -- 可能翻墙原因测了很多次都不准
      var url = 'http://maps.google.cn/maps/api/geocode/json?latlng='+latlon+'&language=CN';
      console.log(url)
      // http://maps.google.cn/maps/api/geocode/json?latlng=23.0576151,113.16096870000001&language=CN

      //baidu   百度地图接口交互 -- 要设置Access-Control-Allow-Origin，建议依靠php实现
      // -- 未完成
      // var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0";  
      // http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=1.3553794,103.86774439999999&output=json&pois=0  
      // 创建请求对象，返回一个异步请求对象
      var xhr = null;
      try{// XMLHttpRequest的兼容性（了解）
        xhr = new XMLHttpRequest();
      }catch(err){
        // // ie低版本浏览器有多种异步请求的实现
        // try{
        //   xhr = new ActiveXObject("Msxml2.XMLHTTP");
        // }catch(err){
        //   try{
        //     xhr = new ActiveXObject("Microsoft.XMLHTTP");
        //   }catch(err){
        //     alert('这个世界已经不适合您所使用的浏览器，换一个吧')
        //   }
        // }
      }
      // 处理服务器返回的数据
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            let res = JSON.parse(xhr.responseText);
              console.info('positionInfo=',res);
              // console.log(res.results[0]['address_components'][1]['long_name'])
              // console.log(res.results[0]['address_components'][2]['long_name'])
          }
      }
      // 设置请求参数，建立与服务器连接
      xhr.open('get',url,true);
      // xhr.setRequestHeader("Access-Control-Allow-Origin","*");
      // 向服务器发送请求
      xhr.send(null);
    }  
  }



}
