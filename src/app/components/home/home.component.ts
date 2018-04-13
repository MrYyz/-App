import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromHomeActions from '../../redux/actions/home.actions'
import { AppState, Title } from '../../redux/app.states'
import * as titleReducer from '../../redux/reducers/title.reducer'

import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // homes:Observable<Home[]>;
  title:Observable<Title[]>;
  
  // 喜爱的文章--测试
  // article = [ {id:1,title:'test article 1',category:'java'}];
  // 导航内容
  navTexts:string[] = ['未完成课程','收藏的课程','考试中心','培训班'];
  navContent:object[] = [
    {txt:'未完成课程',route:'notlearned'},
    {txt:'收藏的课程',route:'collectcourse'},
    {txt:'考试中心',route:'testcenter'},
    {txt:'培训班',route:'trainingclass'},
  ];
  // 头部参数
  homeTitle: [{}] =[ {
    isShowTitle:true,
    isShowBack: true,
    titleContent: '主页',
    isShowQrCode: true,
    isShowSearch: true,
  }];
  showFirstTabCard:boolean = true;
  t:any;

  // 【新课抢先看】模拟数据
  courseList:object[] = [
    {
      author:'梁馨灵',
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
      author:'梁馨灵',
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
      author:'梁馨灵',
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
      author:'梁馨灵',
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
  // 【最近开班】模拟数据
  classesList:object[] = [
    {
      trainid:'20180403asd213297430sdf4524',
      applyid:'abc123',
      title:'跟IT互联网大牛一齐学技术',
      appliednum:'0',
      plannum:'0',
      address:'佛山南海区海八路广发金融中心信息中心16档案室',
      iscompletion:'0',
      state:'1',
      tablist:'签到，课程|sign,course',
      validtime:'0',
      flag:'applytrain',
      image:'',
      principal:'张晓萍',
      traintime:'2018-04-20 14:30~2018-04-24 17:30'
    },
    {
      trainid:'20180403asd213297430sdf4524',
      applyid:'abc123',
      title:'跟IT互联网大牛一齐学技术',
      appliednum:'0',
      plannum:'0',
      address:'佛山南海区海八路广发金融中心信息中心16档案室',
      iscompletion:'0',
      state:'1',
      tablist:'签到，课程|sign,course',
      validtime:'0',
      flag:'applytrain',
      image:'',
      principal:'张晓萍',
      traintime:'2018-04-20 14:30~2018-04-24 17:30'
    }
  ];

  @ViewChild('pagination1') pagination1: ElementRef;
  
  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router) {
    // this.homes = store.select(homeReducer.getHomes);
    this.title = store.select(titleReducer.getTitle);
  }

  ngOnInit() {
    // this.store.dispatch(new fromHomeActions.FavoriteArticleAction(this.article));
    this.store.dispatch({type:'setTitle',payload: this.homeTitle});
    this.showHomeTabCard();
    this.firstChoice();
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
          console.log(this.showFirstTabCard);
          this.firstChoice();
        }.bind(this),
      },
      pagination: {
          el: '.swiper-pagination1',
          clickable: true,
          renderBullet: function (index, className) {
            var contentList:string[] = ['新课抢先看','最近开班'];
            var spanStyle:string = 'display:inline-block;width:50%;text-align:center;height:2.5rem;line-height:2.5rem;';
              return '<span class="' + className + '" style="'+spanStyle+'">' + contentList[index] + '</span>';//这操作，scss无法获取到(失效)
          },
      },
    });
  }
  /**
   * 功能简介：默认选中[新课抢先看]
   * @memberof HomeComponent
   */
  firstChoice(){// T_T?为什么会变成操纵dome节点?
    var pagination = this.pagination1.nativeElement;
    var spans = pagination.children;
    for(let i=0;i<spans.length;i++){
        spans[i].style['border-bottom'] = 'none';
    }
    for(let i=0;i<spans.length;i++){
      if(spans[i].className == 'swiper-pagination-bullet swiper-pagination-bullet-active'){
        spans[i].style['border-bottom'] = '0.15rem solid #E52425';
      }
    }
  }
  /**
   * 功能简介：为选中的【新课抢先看】or【最近开班】增加border-bottom
   * @memberof HomeComponent
   */
  choose(){// T_T?为什么会变成操纵dome节点?
    var e = e || window.event;
    var parent = e.target.parentNode;
    var spans = parent.children;
    for(var i=0;i<spans.length;i++){
      spans[i].style['border-bottom'] = 'none';
    }
    e.target.style['border-bottom'] = '0.15rem solid #E52425';
  }
  linkTo(_route:string){
    console.log(_route)
    this.router.navigate([_route]);
  }
}
