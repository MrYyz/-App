import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState,Title,getState } from '../../redux/app.states';
import * as titleReducer from '../../redux/reducers/title.reducer';

import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { api_215, api_240, } from '../../simulatedData';
import { firstChoice,getMinHeight } from '../../utils/util';
//解决Angular4 绑定html内容 警告处理
import { DomSanitizer } from '@angular/platform-browser';

import { httpRequest,BaseComponent } from '../../utils/http';

declare var require:any;

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  providers:[httpRequest]
})


export class CourseDetailComponent extends BaseComponent implements OnInit {
  // 可观察的对象
  title:Observable<Title[]>;

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private sanitizer: DomSanitizer,private request:httpRequest) {
    super()
    this.title = store.select(titleReducer.getTitle)
  }
  // 头部参数
  coursewareTitle:[{}] = [{
    isShowBack: true,
    titleContent: '课程详情',
    isShowCollect: true,
  }]
  // 路由参数
  routeParams:object;
  // 获取#pagination3节点
  @ViewChild('pagination3') pagination3:ElementRef;
  // 无数据，选项卡图片路径
  emptyImg:string = require('../../../assets/images/empty.png');
  // 课程介绍 -- 头部(目录)
  coursewareList:object[];
  // 课程介绍 -- 头部(简介)
  courseHeaderData:object;
  // 课程介绍 -- 头部(评论)
  courseComment:object;
  // 【简介】中【标签】的html格式
  tallyToHtml:string = '暂无';
  // 是否显示加载中
  showSpinner:boolean = true;
  // 当前用户输入的评论信息
  commentMsg:string;
  // 回复某条评论
  replyComments:string = '';
  // 指定回复的评论
  specifyTheReply:object;

  swiper3:any;
  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.coursewareTitle});
    this.getUrlParams();//获取路由传过来的参数
    this.needSimulatedData();//首次加载依赖模拟数据
    this.showCourseDetailTabCard();// 功能简介：为选项卡增加['目录','简介','评论']
    firstChoice(this.pagination3.nativeElement);//实现swiper标题分类首选样式
    this.getData();
  }

  ngAfterViewInit() {
    getMinHeight('#swiper-container3',['.courseHeader','.swiper-pagination-bullets']);//实现被调用的元素获取最小高度
  }

  // 获取路由传过来的参数
  getUrlParams(){
    // 路由参数 -- 转换成对象
    this.route.params.subscribe((params)=>{
      console.log(params)
      this.routeParams = params;
    })
    // 路由参数 -- 单个接收
    var a = this.route.snapshot.paramMap.get('id');
  }
  // 请求数据，获取对应课程信息
  getData(){
    let courseID = this.routeParams['id'];
    this.protect(this.request.http(215,'id='+courseID).subscribe(js=>{
      if(!js) return;
      this.protect(this.request.http(240,'flag=course&pageno=1&pagesize=15&id='+courseID).subscribe(res=>{
        this.showSpinner = false;
        if(!res) return ;
        this.needSimulatedData(js.service,res.service)
      },e=>{this.errorMsg(e);this.showSpinner = false;}))
    },e=>{this.errorMsg(e);this.showSpinner = false;}))
  }

  // 数据处理
  needSimulatedData(_data215?:any,_data240?:any){
    if(!_data215){
      var data_0 = api_215['item'];
    }else{
      var data_0 = _data215['item'];
    }
    var data_1 = Object.assign({},data_0);
    delete data_1.item;
    this.coursewareList = data_0['item'];//获得 课件内容
    this.courseHeaderData = data_1;//获得 课程简介
    this.changeTallyToHtml(this.courseHeaderData['_markcontent'])
    if(!_data240){
      this.courseComment = api_240;
    }else{
      this.courseComment = _data240;
    }
  }
  // 实现点赞和踩的动态效果 -- 未在此方法内添加请求 将数据传回后端
  hateAndLike(e){
    // israted 0/1 是否已喜欢
    // _isStepOned 0/1 是否已踩
    e = e || window.event;
    var tar = e.target;
    var params = 'id='+this.routeParams['id'];
    // 只允许赞一次
    if(tar.tagName == 'SPAN'&&tar.children[0].className == 'iconfont icon-good' || tar.className == 'iconfont icon-good'){
      if(this.courseHeaderData['_israted'] == '0'){
        this.protect(this.request.http(250,params).subscribe(js=>{
          this.courseHeaderData['_israted'] = '1'
          this.courseHeaderData['_pv']++;
          // 赞+1
          if(tar.tagName == 'SPAN') var parent = tar;
          if(tar.tagName == 'I') var parent = tar.parentNode;
          var em = parent.getElementsByClassName('addMe')[0];
          em.innerHTML = '赞+1';
          var op = 1,top = -1;
          var timer = setInterval(function(){
            if(op<=0){
              clearInterval(timer);
              parent.removeChild(em);
            }
            op = op - 0.05;
            top = top - 0.06;
            em.style.opacity = op;
            em.style.top = top+'rem';
          },16)
        },e=>this.errorMsg(e)))

      }
    // 只允许踩一次
    }else if(tar.tagName == 'SPAN'&&tar.children[0].className == 'iconfont icon-bad' || tar.className == 'iconfont icon-bad'){
      if(this.courseHeaderData['_isStepOned'] == '0'){
        this.protect(this.request.http(253,params).subscribe(js=>{
          this.courseHeaderData['_isStepOned'] = '1'
          this.courseHeaderData['_sc']++;
          // 踩+1
          if(tar.tagName == 'SPAN') var parent = tar;
          if(tar.tagName == 'I') var parent = tar.parentNode;
          var em = parent.getElementsByClassName('addMe')[0];
          em.innerHTML = '踩+1';
          var op = 1,top = -1;
          var timer = setInterval(function(){
            if(op<=0){
              clearInterval(timer);
              parent.removeChild(em);
            }
            op = op - 0.05;
            top = top - 0.05;
            em.style.opacity = op;
            em.style.top = top+'rem';
          },16)
        },e=>this.errorMsg(e)))
      }
    }
  }
  // 功能简介：为选项卡增加['目录','简介','评论']
  showCourseDetailTabCard(){
    var swiper3 = new Swiper('#swiper-container3',{
      autoplay:false,
      on:{
        slideChange:function(){
          console.log('activeIndex=',this.swiper3.activeIndex);

          firstChoice(this.pagination3.nativeElement);
        }.bind(this)
      },
      pagination:{
        el:'.swiper-pagination3',
        clickable:true,
        renderBullet:function(index,className){
          let contentList:string[] = ['目录','简介','评论'];
          let spanStyle:string = 'display:inline-block;width:33.333%;text-align:center;height:2.5rem;line-height:2.5rem;';
          return '<span class="'+className+'" style="'+spanStyle+'">'+contentList[index]+'</span>';
        }
      },
    })
    this.swiper3 = swiper3;
  }
  // 处理【简介】中【标签】的html格式
  changeTallyToHtml(_str){
     if(_str){
       var res = '';
       var _style = 'padding:0 0.25rem;border:0.0625rem solid #ccc;border-radius:0.9375rem;margin-right:0.25rem;font-size:0.9rem;';
       if(_str.indexOf('|')>0){
          _str.split('|').forEach(item => {
            res += '<span style="'+_style+'">'+item+'</span>';
        });
       }else{
         res = '<span style="'+_style+'">'+_str+'</span>';
       }
     }else{
       res = '暂无'
     }
     this.tallyToHtml = res;
  }
  // 当前用户评价等级
  yourStars(index:string,starNo:string){
    console.log('starNo=',starNo)
    console.log('starNo2=',this.courseHeaderData)
    if(Number(starNo)>0) return ;
    // 此时应有提示框
    this.protect(this.request.http(252,'id='+this.routeParams['id']+'&mystar='+(index+1)).subscribe(js=>{
      if(!js) return;
      this.courseHeaderData['_mystar'] = String(index+1);
      this.courseHeaderData['_starcount'] = String(Number(this.courseHeaderData['_starcount'])+1);
    },e=>this.errorMsg(e)))

  }
  // 用户评论
  submitTheComment(commentItem?:object){
    var data = new FormData();
    data.append('content',this.commentMsg)
    if(commentItem){//选择了指定回复的评论 -- 【处理数据】
      this.specifyTheReply = commentItem;
      this.replyComments = commentItem['_fullname'];
    }else{
      if(this.commentMsg && this.replyComments){//选择了指定回复的评论
        // console.log('specifyTheReply=',this.specifyTheReply)
        const params = 'id='+this.specifyTheReply['_id']+'&flag=course&replyid='+this.routeParams['id'];
        this.protect(this.request.http(242,params,1,data).subscribe(js=>{
          this.commentMsg = '';
          this.replyComments = '';//清空指定评论
          this.refreshComments();//刷新评论信息
        },e=>this.errorMsg(e)))

      }else if(this.commentMsg && !this.replyComments){//评论本课程
        const params = 'id='+this.routeParams['id']+'&flag=course';
        this.protect(this.request.http(241,params,1,data).subscribe(js=>{
          this.commentMsg = '';
          alert('评论成功！')
          this.refreshComments()//刷新评论信息
        },e=>this.errorMsg(e)))
      }else if(!this.commentMsg && !commentItem){//既没指定评论，又没有内容可提交
        alert('亲,评论不能为空哦!')
      }
    }
  }
  // 给某条评论点个赞 -- 暂未实现，请求地址存在问题
  likeThisComment(isLike:string,curMsg:any){
    let userInfo = getState(this.store)['userInfoState'];
    // console.log('curMsg=',curMsg)
    // console.log('用户信息：',userInfo)
    // console.log('用户信息：',userInfo['userInfo'])
    // console.log('用户信息：',userInfo['userInfo']['_xmppid'])
    if(isLike == '1'){
      alert('您已点过赞了!')
      return;
    }else if(!userInfo.userInfo['_xmppid']){
      alert('请登陆后再操作!')
      this.router.navigate(['/login']);
    }else if(userInfo && isLike == '0'){
      let params = 'flag=course&id='+curMsg['_id']+'&replyid='+userInfo['userInfo']['_xmppid'];
      // console.log('params=',params)
      this.protect(this.request.http(243,params).subscribe(js=>{
        if(!js)return;
        console.info('点赞成功!');
        this.refreshComments();//刷新评论信息
      },e=>this.errorMsg(e)))
    }
  }

  // 刷新当前课程评论信息
  refreshComments(){
    this.protect(this.request.http(240,'flag=course&pageno=1&pagesize=15&id='+this.routeParams['id']).subscribe(js=>{
      if(!js) return;
      this.courseComment = js.service;//刷新评论信息
    },e=>this.errorMsg(e)))
  }
}



