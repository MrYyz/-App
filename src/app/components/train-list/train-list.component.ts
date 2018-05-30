import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title,getState,AppState } from '../../redux/app.states';
import { Store, State } from '@ngrx/store';
import {Router,ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/observable';
import { httpRequest,BaseComponent } from '../../utils/http';
import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';
import { firstChoice,getMinHeight } from '../../utils/util'
import { api_2120,api_2100 } from '../../simulatedData';

declare var require:any;

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss'],
  providers:[httpRequest]
})
export class TrainListComponent extends BaseComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private store:Store<AppState>,private request:httpRequest) { 
    super()
  }

  completeImg:string = require('../../../assets/images/finishclasses.png');

  // header参数
  traincourseTitle:[{}] = [{
    titleContent:'培训班',
  }]
  // 获取pagination5节点
  @ViewChild('pagination5') pagination5:ElementRef;
  // 当前swiper5对象
  swiper5:object;
  // 是否显示spinner
  showSpinner:boolean = true;

  // 未报名数据
  // notApplyData:[{}] = [api_2100['service'].item];
  notApplyData:object[];

  // classInfo:[{}] = api_2120['service'].item;
  classInfo:[{}];
  // 已开班数据
  classRunning:object[] = [];
  // 已结束数据
  classOver:object[] = [];

  ngOnInit() {
    this.store.dispatch({type:'setTitle', payload:this.traincourseTitle});
    this.showTrainCourseTabCard();
    firstChoice(this.pagination5.nativeElement);//实现swiper标题分类首选样式
    this.getNotApplyData();// 获取[未报名]信息
    
    // 若store有数据，就先在里面取，没有再请求
    let trainlist2120 = getState(this.store)['dataListState']['trainlist2120'];
    if(trainlist2120){
      this.classInfo = trainlist2120;
      this.haveAndOver();//处理 [已开班] && [已结束]
    }else{
      this.getClassInfo();// 获取[未开班]&[已结束]信息
    }
  } 
  
  ngAfterViewInit(){
    getMinHeight('#swiper-container5',['.swiper-pagination-bullets']);
  }
  /**
   * 设置选项卡 [未报名]&[已开班]&[已结束]
   * @memberof TrainCourseComponent
   */
  showTrainCourseTabCard(){
    let swiper5 = new Swiper('#swiper-container5',{
      autoplay:false,
      on:{
        slideChange:function(){
          console.log(swiper5['activeIndex'])
          firstChoice(this.pagination5.nativeElement)
        }.bind(this)
      },
      pagination:{
        el:'.swiper-pagination5',
        clickable:true,
        renderBullet:function(index,className){
          let list:string[] = ['未报名','已开班','已结束'];
          let _style:string = 'display:inline-block;width:33.333%;text-align:center;height:2.5rem;line-height:2.5rem;';
          return`<span style="${_style}" class="${className}">${list[index]}</span>`
        }
      }
    })
    this.swiper5 = swiper5;
  }
  /**
   * 获取 [未报名] 的信息
   * @memberof TrainCourseComponent
   */
  getNotApplyData(){
    this.protect(this.request.http(2100,'flag=noapply&pageno=1&pagesize=15').subscribe(js=>{
      // console.log('js=',JSON.parse(JSON.stringify(js)))
      this.showSpinner = false;
      if(!js) return;
      let _res = js['service'].item;
      if(Object.prototype.toString.apply(_res) == '[object Object]'){
        _res = [_res];
      }
      this.notApplyData = _res;
      // console.log(this.notApplyData)
    },e=>{
        this.errorMsg(e);
        this.showSpinner = false;
      }))
  }
  /**
   * 获取 [已开班] && [已结束] 的信息（若store中有数据，留意计算用户请求到第几页了）
   * @memberof TrainCourseComponent
   */
  getClassInfo(){
    this.protect(this.request.http(2120,'flag=&pageno=1&pagesize=15').subscribe(res=>{
      // console.log('res=',JSON.stringify(res))
      this.showSpinner = false;
      if(!res) return ;
      let result = res['service'].item;
      if(Object.prototype.toString.apply(result) == '[object Object]'){
        result = [result];
      }
      this.classInfo = result
      
      this.haveAndOver();//处理 [已开班] && [已结束]

      // 存储培训班数据 -- 如若用户点选之后可以直接获取培训班信息 而不用在发送请求
      let dataList = getState(this.store)['dataListState'];
      if(dataList && dataList['trainlist2120']){
        // 更新
        this.store.dispatch({type:'UPDATE_DATA',payload:{'trainlist2120':result}})
      }else{
        // 新建
        this.store.dispatch({type:'CREATE_DATA',payload:{'trainlist2120':result}})
      }
      // console.log(getState(this.store)['dataListState'])
    },e=>{
        this.errorMsg(e);
        this.showSpinner = false;
      }))
  }
  /**
   * 根据getClassInfo()得到的数据处理出 [已开班] && [已结束] 的信息
   * @memberof TrainCourseComponent
   */
  haveAndOver(){
    this.classInfo.forEach((item,index)=>{
      if(item['_state'] == '2'){
        this.classOver.push(item)
      }else if(item['_state'] == '0' || item['_state'] == '1'){
        this.classRunning.push(item)
      }
    })
    // console.info('正在进行=',this.classRunning,'已结束=',this.classOver)
  }
/**
 * 实现培训班列表页内的 培训班路由跳转
 * @param {object} item 点选的培训班信息
 * @param {number} idx 列表序号
 * @memberof TrainCourseComponent
 */
routeLink(item:object,idx:number){
    // console.log('item=',item)
    switch(idx){
      case 0:
        this.router.navigate(['/applytrain/'+item['_id']]);
        break;
      default:
        this.router.navigate(['/trainclass/'+item['_id']+'/'+item['_title']]);
    }
  }
}

