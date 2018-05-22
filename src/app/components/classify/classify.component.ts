import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from "rxjs/observable";
import { AppState, Title } from '../../redux/app.states';
import * as titleReducer from '../../redux/reducers/title.reducer';

import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';

import { firstChoice } from '../../utils/util';
declare var require: any;

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss']
})
export class ClassifyComponent implements OnInit {

  title:Observable<Title[]>
  // 头部参数
  classifyTitle:[{}] = [ {
    isShowBack: false,
    titleContent: '课程',
  }];
  // 分类信息
  classes:string[] = [
    '小编推荐',
    '未学完',
    '已学完',
    '通用管理',
    '营销服务',
    '人力行政',
    '职业职场',
    '大师讲堂',
    '婚姻家庭',
    '生活休闲',
    '问鼎培训',
    '领导力',
    '新员工课程',
    '信贷风险',
    '综合类',
    '办公技能',
    '金融知识',
    '信息科技',
    '财务管理',
  ]
  // 显示/隐藏 -- 更多分类信息
  isShowMore:boolean = false;
  // 获取#pagination2节点
  @ViewChild('pagination2') pagination2: ElementRef;
  // 默认 对第一个选项卡 -- 标红 -- 是否用了?
  showFirstTabCard:boolean = true;
  // 【最新发布】 模拟数据
  lastistRelease:object[] = [
    {
      author:'郭燕雪',
      category:'管理能力',
      commentcount:'5',
      commontstar:'0',
      courselevel:'',
      coursetype:'管理能力',
      courseversion:'',
      coursewarecount:'1',
      credit:'10.0',
      description:'小灵提示您，本信息为测试专用',
      developtime:'',
      enablecomment:'1',
      enabledownload:'0',
      enablerating:'1',
      enableshare:'0',
      finishnum:'1',
      flag:'course',
      id:'20180404swafo831k25lj19ufas98efy1241k4hk1',
      image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1011752784,1088584800&fm=27&gp=0.jpg',
      isfavorited:'0',
      israted:'0',
      issteponed:'0',
      language:'',
      largeimage:'',
      laststudydate:'0',
      markcontent:['选修','重点','测试','好好练习'],
      // markcontent:['选修','重点'],
      markid:'20171q23nl19a0sq1n2p129311l8795',
      model:'0',
      mycompany:'1',
      mystar:'0',
      pubdate:'18小时前',
      pv:'5',
      sc:'0',
      shareurl:'http:',
      soecialtopic:'',
      starcount:'0',
      studyduration:'0',
      stydyprogress:'0',
      tag:'',
      thumbs:'http:',
      title:'测试专用标题',
      type:'',
      url:'',
      vc:'94',
    },{
      author:'郭燕雪',
      category:'管理能力',
      commentcount:'5',
      commontstar:'0',
      courselevel:'',
      coursetype:'管理能力',
      courseversion:'',
      coursewarecount:'1',
      credit:'10.0',
      description:'小灵提示您，本信息为测试专用',
      developtime:'',
      enablecomment:'1',
      enabledownload:'0',
      enablerating:'1',
      enableshare:'0',
      finishnum:'1',
      flag:'course',
      id:'20180404swafo831k25lj19ufas98efy1241k4hk1',
      image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1011752784,1088584800&fm=27&gp=0.jpg',
      isfavorited:'0',
      israted:'0',
      issteponed:'0',
      language:'',
      largeimage:'',
      laststudydate:'0',
      markcontent:['选修','重点','测试','好好练习'],
      // markcontent:['选修','重点'],
      markid:'20171q23nl19a0sq1n2p129311l8795',
      model:'0',
      mycompany:'1',
      mystar:'0',
      pubdate:'18小时前',
      pv:'5',
      sc:'0',
      shareurl:'http:',
      soecialtopic:'',
      starcount:'0',
      studyduration:'0',
      stydyprogress:'0',
      tag:'',
      thumbs:'http:',
      title:'测试专用标题',
      type:'',
      url:'',
      vc:'94',
    },{
      author:'郭燕雪',
      category:'管理能力',
      commentcount:'5',
      commontstar:'0',
      courselevel:'',
      coursetype:'管理能力',
      courseversion:'',
      coursewarecount:'1',
      credit:'10.0',
      description:'小灵提示您，本信息为测试专用',
      developtime:'',
      enablecomment:'1',
      enabledownload:'0',
      enablerating:'1',
      enableshare:'0',
      finishnum:'1',
      flag:'course',
      id:'20180404swafo831k25lj19ufas98efy1241k4hk1',
      image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1011752784,1088584800&fm=27&gp=0.jpg',
      isfavorited:'0',
      israted:'0',
      issteponed:'0',
      language:'',
      largeimage:'',
      laststudydate:'0',
      markcontent:['选修','重点','测试','好好练习'],
      // markcontent:['选修','重点'],
      markid:'20171q23nl19a0sq1n2p129311l8795',
      model:'0',
      mycompany:'1',
      mystar:'0',
      pubdate:'18小时前',
      pv:'5',
      sc:'0',
      shareurl:'http:',
      soecialtopic:'',
      starcount:'0',
      studyduration:'0',
      stydyprogress:'0',
      tag:'',
      thumbs:'http:',
      title:'测试专用标题',
      type:'',
      url:'',
      vc:'94',
    },{
      author:'郭燕雪',
      category:'管理能力',
      commentcount:'5',
      commontstar:'0',
      courselevel:'',
      coursetype:'管理能力',
      courseversion:'',
      coursewarecount:'1',
      credit:'10.0',
      description:'小灵提示您，本信息为测试专用',
      developtime:'',
      enablecomment:'1',
      enabledownload:'0',
      enablerating:'1',
      enableshare:'0',
      finishnum:'1',
      flag:'course',
      id:'20180404swafo831k25lj19ufas98efy1241k4hk1',
      image:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1011752784,1088584800&fm=27&gp=0.jpg',
      isfavorited:'0',
      israted:'0',
      issteponed:'0',
      language:'',
      largeimage:'',
      laststudydate:'0',
      markcontent:['选修','重点','测试','好好练习'],
      // markcontent:['选修','重点'],
      markid:'20171q23nl19a0sq1n2p129311l8795',
      model:'0',
      mycompany:'1',
      mystar:'0',
      pubdate:'18小时前',
      pv:'5',
      sc:'0',
      shareurl:'http:',
      soecialtopic:'',
      starcount:'0',
      studyduration:'0',
      stydyprogress:'0',
      tag:'',
      thumbs:'http:',
      title:'测试专用标题',
      type:'',
      url:'',
      vc:'94',
    }
  ];
  // 【最多浏览】模拟数据
  mostBrowse:object[] = this.lastistRelease;
  // 【最多点赞】模拟数据
  mostLike:object[];
  // 无数据，选项卡图片路径
  emptyImg:string = require('../../../assets/images/empty.png');
  // 当前选项卡对应的index
  curTabCardIdx:number = 0;

  constructor(private store:Store<AppState>) { 
    this.title = store.select(titleReducer.getTitle);
  }

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.classifyTitle});
    this.showClassifyTabCard();
    firstChoice(this.pagination2.nativeElement);
    this.setEmptyHeight();
  }
  /**
   * 功能简介：为选项卡增加['最新发布','最多浏览','最多点赞']
   * @memberof HomeComponent
   */
  showClassifyTabCard(){
    var swiper2 = new Swiper('#swiper-container2',{
      autoplay:false,
      on:{
        slideChange: function () {
          this.curTabCardIdx = swiper2['activeIndex'];
          console.log('curTabCardIdx=',this.curTabCardIdx)
          // this.showFirstTabCard = !this.showFirstTabCard;
          // console.log(this.showFirstTabCard);
          firstChoice(this.pagination2.nativeElement);
        }.bind(this),
      },
      pagination:{
        el:".swiper-pagination2",
        clickable:true,
        renderBullet:function(index,className){
          let contentList:string[] = ['最新发布','最多浏览','最多点赞'];
          let spanStyle:string = 'display:inline-block;width:33.333%;text-align:center;height:3rem;line-height:3rem;';
          return '<span class="'+className+'" style="'+spanStyle+'">'+contentList[index]+'</span>';
        }
      }
    })
  }
  /**
   * 显示/隐藏 -- 更多分类信息
   * @param {any} e 事件源对象
   * @memberof ClassifyComponent
   */
  hideShowMore(e){
    e = e || window.event;
    var target = e.target;
    if(target.className.indexOf('watchMore')<0){
      if(this.isShowMore) this.isShowMore = false;
    }
  }

  /**
   * 无数据时，设置选项卡显示效果
   * @memberof ClassifyComponent
   */
  setEmptyHeight(){
    var empty = document.getElementsByClassName('empty');
    var main = document.getElementById('main');
    var classesBox = document.getElementsByClassName('classesBox')[0];
    var slice = document.getElementsByClassName('classifytabcard')[0];
  }
}
