import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, Title, getState } from '../../../redux/app.states';
import * as titleReducer from '../../../redux/reducers/title.reducer'

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { httpRequest,BaseComponent } from '../../../utils/http';

@Component({
  selector: 'appHeader',
  templateUrl:'./head.component.html',
  styleUrls: ['./head.component.scss'],
  providers:[httpRequest]
})
export class HeadComponent extends BaseComponent implements OnInit {

  title:Observable<Title[]>;

  constructor(private store:Store<AppState>,private route: ActivatedRoute, private router: Router, private request:httpRequest) { 
    super()
    this.title = store.select(titleReducer.getTitle);
  }

  // isSearch:boolean = false;
  searchText:string = '';
  isCollect:string = getState(this.store)['dataListState']['curCourse215']?getState(this.store)['dataListState']['curCourse215']['_isfavorited']:'0';

  ngOnInit() {
    // this.getLocation();
    // this.isSearchComponent();
  }
  AfterViewInit() { }
  
  // 刷新当前搜索页面仍显示搜索框
  isSearchComponent(){
    // this.route.params.subscribe((params) => {
    //   console.log('路由参数：',params)
    // });
    // if(window.location.pathname.indexOf('search')>=0){
    //   this.isSearch = true;
    // } 
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
        this.search();
        break;
      // 执行收藏功能 --> 目前对课程开放收藏功能(故只在head里面发请求)
      case 'iconfont icon-favorite'://未收藏
      case 'iconfont icon-favoritesfilling'://已收藏
      this.hateAndLike(e);
      break;
      default:
        // console.log(e.target.className)
    }
  }
  
  routeBack(){
    // this.isSearch = false;
    // this.searchText = '';
    if(getState(this.store)['dataListState']['SearchText']){ // 存在就删掉store里面的数据
      this.store.dispatch({type:'UPDATE_DATA',payload:{courseSearchData223:undefined}})
      this.store.dispatch({type:'UPDATE_DATA',payload:{SearchText:''}})
    }
    history.back();
  }

  openSearch(){
    // this.isSearch = true;
    this.router.navigate(['/search'])
  }

  cleanSearchText(){
    this.searchText = '';
    this.store.dispatch({type:'UPDATE_DATA',payload:{courseSearchData223:''}})//清空内容
    this.store.dispatch({type:'UPDATE_DATA',payload:{SearchText:''}})//清空内容
  }

  hateAndLike(e){
    e= e || window.event;
    
    switch(e.target.className){
      case 'iconfont icon-favorite':
      var _isCollect = '0';
      break;
      case 'iconfont icon-favoritesfilling':
      var _isCollect = '1';
      break;
    }
    
    let _id = getState(this.store)['dataListState']['curCourse215']['_id'];
    let _titleContent = getState(this.store)['titleState']['title'][0]['titleContent']//其实这里也只能是‘课程详情’（T_T ，不知道自己为什么兜这么打个圈?）
    console.log(_titleContent)
    this.protect(this.request.http(260,'isfavorited='+_isCollect+'&id='+_id).subscribe(js=>{
      if(!js)return;
      // 最好弹窗提示收藏成功还是取消收藏
      this.store.dispatch({type:'setTitle',payload:[{
        titleContent:_titleContent,
        isShowCollect: true,
        isCollected:_isCollect == '0'?true:false
      }]})
    },e=>this.errorMsg(e)))
  }

  search(){
    if(this.searchText == ''){
      alert('搜索内容不能为空！');
      return;
    }else{
      var txt;
      txt = this.searchText.replace(/(^\s+)|(\s+$)/g,"");
      txt = txt.replace(/\s/g,"");
    }

    this.protect(this.request.http(223,'flag=course&pageno=1&pagesize=15&key='+txt).subscribe(js=>{
      // console.log(JSON.stringify(js['service']['item']))
      if(!js) return;
      var dataList = getState(this.store)['dataListState'];
      if(dataList && dataList['courseSearchData223']){
        var _type = 'UPDATE_DATA';
      }else{
        var _type = 'CREATE_DATA';
      }
      this.store.dispatch({type:_type,payload:{courseSearchData223:js['service']['item']}})
      this.store.dispatch({type:_type,payload:{SearchText:this.searchText}})
      this.searchText = '';
    },e=>{this.errorMsg(e)}))

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
