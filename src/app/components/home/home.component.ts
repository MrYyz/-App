import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromHomeActions from '../../redux/actions/home.actions'
import { AppState, Title, getState } from '../../redux/app.states'
import * as titleReducer from '../../redux/reducers/title.reducer'

import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { firstChoice,getMinHeight } from '../../utils/util'
import { httpRequest,BaseComponent } from '../../utils/http'

declare var require:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[httpRequest]
})
export class HomeComponent extends BaseComponent implements OnInit {

  title:Observable<Title[]>;

  @ViewChild('pagination1') pagination1: ElementRef;
  
  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private request:httpRequest) {
    super()
    this.title = store.select(titleReducer.getTitle);
  }

  // 轮播图数据
  carouselData:[{}] = [{}];
  // 导航内容
  navContent:object[] = [
    {_title:'未完成课程',route:'unfinishedcourse',_flag: 'unfinished_course'},
    {_title:'收藏的课程',route:'collection',_flag: 'collect'},
    {_title:'考试中心',route:'examcenter',_flag: 'exam'},
    {_title:'培训班',route:'trainlist',_flag: 'train'},
  ];
  // 头部参数
  homeTitle: [{}] =[ {
    isShowTitle:true,
    isShowBack: false,
    titleContent: '主页',
    isShowQrCode: true,
    isShowSearch: true,
  }];
  // 是否需要显示第一张tabcard
  showFirstTabCard:boolean = true;

  // 【新课抢先看】模拟数据
  courseList:object[];
  // 【最近开班】模拟数据
  classesList:object[];
  // 是否需要加载中
  showSpinner:boolean=true;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload: this.homeTitle});
    this.showHomeTabCard();
    firstChoice(this.pagination1.nativeElement);
    this.getHomeData();
  }
  ngAfterViewInit() {
    // getMinHeight('.swiper-container',['.carousel','.nav','.swiper-pagination1']);//实现被调用的元素获取最小高度
    // console.log('11111=',document.getElementsByClassName('swiper-slide'))

  }
  AfterContentInit(){
    // getMinHeight('.swiper-container',['.carousel','.nav','.swiper-pagination1']);//实现被调用的元素获取最小高度
    
  }
  /**
   * 功能简介：为选项卡增加[新课抢先看]and[最近开班]
   * @memberof HomeComponent
   */
  showHomeTabCard(){
    var swiper = new Swiper('#swiper-container1',{
      autoplay:false,
      on: {
        slideChange: function () {
          
          this.showFirstTabCard = !this.showFirstTabCard;
          firstChoice(this.pagination1.nativeElement);
          document.getElementById('swiper-container1')['style']['min-height'] = document.getElementsByClassName('main')[0]['offsetHeight'] - 318 + 'px';
          console.log(document.getElementById('swiper-container1')['style']['height'])
        }.bind(this)
        
      },
      pagination: {
        el: '.swiper-pagination1',
        clickable: true,
        renderBullet: function (index, className) {
          var contentList:string[] = ['新课抢先看','培训班动态'];
          var spanStyle:string = 'display:inline-block;width:50%;text-align:center;height:2.5rem;line-height:2.5rem;';
            return '<span class="' + className + '" style="'+spanStyle+'">' + contentList[index] + '</span>';//这操作，scss无法获取到(失效)
        },
      },

    });
  }

  /**
   * 功能简介：Home页面数据处理
   * @memberof HomeComponent
   */
  getHomeData(){
    let homeData = getState(this.store)['dataListState']['homePage2010'];
    console.log('homeData=',homeData)
    if(!homeData){
      this.protect(this.request.http(2010,'').subscribe(js=>{
        if(!js) return;
        this.showSpinner = false;
        this.store.dispatch({type:'CREATE_DATA',payload:{homePage2010:js['service']}})
        this.updatedHomeDate(js['service']);
      },e=>{
        this.showSpinner = false;
        this.errorMsg(e);
      }))
    }else{
      this.showSpinner = false;
      this.updatedHomeDate(homeData);
    }
  }
  /**
   * 同步：首页中 轮播图、导航内容、【新课抢先看】、【最近开班】 数据
   * @param {object} _data 需要同步过来的数据
   * @memberof HomeComponent
   */
  updatedHomeDate(_data:object){
    // 同步：导航内容
    let curnavContent = _data['category'][1]['category']
    for(let i=0;i<curnavContent.length;i++){
      for(let j=0;j<this.navContent.length;j++){
        if(this.navContent[j]['_flag'] == curnavContent[i]['_flag']){
          let title = curnavContent[i]['_title'];
          curnavContent[i] = Object.assign(curnavContent[i],this.navContent[j]);
          curnavContent[i]['_title'] = title;//尽量还原最新请求的内容
        }
      }
    }
    this.navContent = curnavContent;
  
    // 同步：【轮播图】数据
    this.carouselData = _data['category'][0]['item'];
    // 同步：【新课抢先看】数据
    this.courseList = _data['category'][2]['item'];
    // 同步：【最近开班】数据 --处理数据?如果条数据是传{}过来的
    this.classesList = _data['category'][3]['item'];

  }
  
  /**
   * 根据 参数 跳转路由
   * @param {object} itemObj 参数
   * @memberof HomeComponent
   */
  linkTo(itemObj:object){
    // 实现 导航栏-['未完成课程','收藏的课程','考试中心','培训班'] 路由跳转
    switch(itemObj['_flag']){
      case "unfinished_course":
        this.router.navigate(['/'+itemObj['route']]);//unfinishedcourse
        break;
      case "collect":
        this.router.navigate(['/'+itemObj['route']]);//collectcourse
        break;
      case "exam":
        this.router.navigate(['/'+itemObj['route']]);//examcenter
        break;
      case "train":
        this.router.navigate(['/'+itemObj['route']]);//traincourse
        break;
      case "course":
        // this.router.navigate(['/'+itemObj['route']]);
        this.router.navigate(['/coursedetail/'+itemObj['_id']+'/'+itemObj['_title']])
        break;
      case "noapplytrain":
        this.router.navigate(['/applytrain/'+itemObj['_applyid']]);//请求2101
        break;
      case "applytrain":
      case "noisPower":
        this.router.navigate(['/applytrain/'+itemObj['_applyid']]);//请求2101
        // this.router.navigate(['/'+itemObj['route']]);
        break;
    }
  }

}
