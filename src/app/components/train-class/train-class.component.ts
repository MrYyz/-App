import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState,Title,getState } from '../../redux/app.states';

import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { firstChoice,getMinHeight } from '../../utils/util';
//解决Angular6 绑定html内容 警告处理
import { DomSanitizer } from '@angular/platform-browser';

import { httpRequest,BaseComponent } from '../../utils/http';

// declare var require:any;

@Component({
  selector: 'app-train-class',
  templateUrl: './train-class.component.html',
  styleUrls: ['./train-class.component.scss'],
  providers:[httpRequest]
})
export class TrainClassComponent extends BaseComponent implements OnInit {

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private sanitizer: DomSanitizer,private request:httpRequest) {
    super()
  }

  // header数据
  trainclassTitle:[{}] = [{titleContent:this.route.snapshot.paramMap.get('title')}];
  // 获取pagination6节点
  @ViewChild('pagination6') pagination6:ElementRef;
  // 当前:培训班 -- 基础信息
  curTrainInfo:object;
  // 栏目信息
  programa:any[] = [];
  programa_en:string[] = ["info", "sign", "course", "exercise", "exam", "survey", "evaluation", "comment", "homework"];
  programa_cn:string[] = [];

  info_data:any;//公告信息
  sign_data:any;//签到信息
  course_data:any;//课程信息
  exercise_data:any;//练习信息
  exam_data:any;//考试信息
  survey_data:any;//调研信息
  evaluation_data:any;//评估信息
  comment_data:any;//评论信息
  homework_data:any;//作业信息

  // 评论区默认头像
  default_buddha:string = require('../../../assets/images/user.png');

  swiper6:object;

  showSpinner:boolean = false;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.trainclassTitle});
    this.getClassInfo();//获取当前培训班 -- 基础信息
    this.get222();
  }

  ngAfterViewInit(){
    getMinHeight('#swiper-container6',['.swiper-pagination-bullets']);
  }

  get222(){
    // 这个222请求不知道是干嘛用的，没有实质数据返回前台
      this.protect(this.request.http(222,'flag=trainfriends').subscribe(js=>{
        // console.log('data222=',js)
      }))
  }

  getClassInfo(){
    let trainID = this.route.snapshot.paramMap.get('id');
    let trainList = getState(this.store)['dataListState']['trainlist2120']; // 要保留的,未判断是否为对象
    // store 中有 该培训班数据
    if(trainList){
      trainList.forEach((item,index) => {
        if(trainID == item['_id']){
          this.curTrainInfo = item;
          this.getPrograma()
          return;
        }
      });
    }else{
      // store 中没有 该培训班数据
      this.protect(this.request.http(2121,'id='+trainID).subscribe(js=>{
        console.log('数据：',js)
        if(!js)return;
        this.curTrainInfo = js['service']['item'];
        this.getPrograma();
      },e=>{this.errorMsg(e)}))
    }
  }
  
  getPrograma(){
    // 处理栏目数据
    let tablist0:string = this.curTrainInfo['_tablist'];
    let tablist1:string[] = tablist0.slice(0,tablist0.indexOf('|')).split(',');//中文
    let tablist2:string[] = tablist0.slice(tablist0.indexOf('|')+1).split(',');//英文
    this.programa_cn = tablist1
    this.programa_en = tablist2
    // console.log('tablist0=',tablist0)

    this.programa = [];
    tablist1.forEach((item,idx) => {
      let _key:string = tablist2[idx];
      let obj:object = {};
      obj[_key] = item;
      this.programa.push(obj);
    });
    this.showTrainClassTabCard()
    // setTimeout(this.showTrainClassTabCard(),300)
    
  }

  showTrainClassTabCard(){ // 选项卡
    let swiper6 = new Swiper('#swiper-container6',{
      autoplay:false,
      observer:true, // 数据更新，初始化swiper
      grabCursor: true, // 数据更新，初始化swiper
      on:{
        slideChange:function(){
          // console.log(swiper6['activeIndex'])
          firstChoice(this.pagination6.nativeElement);
          this.discriminationAnalysis(this.programa_en[swiper6['activeIndex']])
        }.bind(this),
      },
      pagination:{
        el:'.swiper-pagination6',
        clickable:true,
        renderBullet:function(index,className){
          let list:[object] = this.programa;
          let _width = (100/list.length).toPrecision(5);
          let EnglishNames = [],ChineseNames = [];

          let _style:string = 'display:inline-block;width:'+_width+'%;text-align:center;height:2.5rem;line-height:2.5rem;';

          list.forEach((item,idex)=>{
            var key = Object.keys(item)[0];
            EnglishNames.push(key);
            ChineseNames.push(list[idex][key]);
          })
          return '<span class="'+className+'" style="'+_style+'" data-id="'+Object.keys(list[index])+'">'+ChineseNames[index]+'</span>';
          // 严正声明：这里return绝对不能用字符串模板
        }.bind(this)
      },
    })
    this.swiper6 = swiper6;
    
    setTimeout(()=>{
      let el = this.pagination6.nativeElement;
      firstChoice(el);
      this.discriminationAnalysis(this.programa_en[0]);
    },100)
  }

  discriminationAnalysis(_type:string){ // 区别分析
    this.showSpinner = true;
    switch(_type){
      case 'info':
        if(this.info_data) { this.showSpinner = false; return};
        this.protect(this.request.http(2122,'flag=news&id='+this.curTrainInfo['_id']).subscribe(js=>{
          this.info_data = js.service.item;
          console.log('公告信息：',this.info_data)
          this.showSpinner = false;
        },e=>{
          this.showSpinner = false;
          this.errorMsg(e);
        }))
      break;
      case 'sign':
        if(this.sign_data) { this.showSpinner = false; return};
        this.protect(this.request.http(2110,'trainid='+this.curTrainInfo['_id']).subscribe(js=>{
          this.sign_data = js.service.item;
          console.log('签到信息：',this.sign_data)
          this.showSpinner = false;
        },e=>{
          this.showSpinner = false;
          this.errorMsg(e);
        }))
      break;
      case 'course':
        if(this.sign_data) { this.showSpinner = false; return};
        this.protect(this.request.http(2122,'flag=course&id='+this.curTrainInfo['_id']).subscribe(js=>{
          this.course_data = js.service.item;
          console.log('课程信息：',this.course_data)
          this.showSpinner = false;
        },e=>{
          this.showSpinner = false;
          this.errorMsg(e);
        }))
      break;
      case 'exercise':
        if(this.exercise_data) { this.showSpinner = false; return};
        this.protect(this.request.http(2124,'id='+this.curTrainInfo['_id']).subscribe(js=>{
          this.exercise_data = js.service.item;
          console.log('练习信息：',this.exercise_data)
          this.showSpinner = false;
        },e=>{
          this.showSpinner = false;
          this.errorMsg(e);
        }))
      break;
      case 'exam':
        if(this.exam_data) { this.showSpinner = false; return};
        this.protect(this.request.http(2123,'id='+this.curTrainInfo['_id']).subscribe(js=>{
          this.exam_data = js.service.item;
          console.log('考试信息：',this.exam_data)
          this.showSpinner = false;
        },e=>{
          this.showSpinner = false;
          this.errorMsg(e);
        }))
      break;
      case 'survey':
        if(this.survey_data) { this.showSpinner = false; return};
        this.protect(this.request.http(2126,'flag=survey&id='+this.curTrainInfo['_id']).subscribe(js=>{
          this.survey_data = js.service.item;
          console.log('调研信息：',this.survey_data)
          this.showSpinner = false;
        },e=>{
          this.showSpinner = false;
          this.errorMsg(e);
        }))
      break;
      case 'evaluation':
        if(this.evaluation_data) { this.showSpinner = false; return};
        this.protect(this.request.http(2126,'flag=evaluation&id='+this.curTrainInfo['_id']).subscribe(js=>{
          this.evaluation_data = js.service.item;
          console.log('评估信息：',this.evaluation_data)
          this.showSpinner = false;
        },e=>{
          this.showSpinner = false;
          this.errorMsg(e);
        }))
      break;
      case 'comment':
        if(this.comment_data) { this.showSpinner = false; return};
        this.protect(this.request.http(240,'flag=train&id='+this.curTrainInfo['_id']).subscribe(js=>{
          this.comment_data = js.service.item;
          console.log('评论信息：',this.comment_data)
          this.showSpinner = false;
        },e=>{
          this.showSpinner = false;
          this.errorMsg(e);
        }))
      break;
      case 'homework':
        this.showSpinner = false;
      break;
      default:
        this.showSpinner = false;
    }
  }

}
