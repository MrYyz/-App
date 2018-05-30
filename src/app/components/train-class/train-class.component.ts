import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState,Title,getState } from '../../redux/app.states';
import * as titleReducer from '../../redux/reducers/title.reducer';

import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { firstChoice,getMinHeight } from '../../utils/util';
//解决Angular6 绑定html内容 警告处理
import { DomSanitizer } from '@angular/platform-browser';

import { httpRequest,BaseComponent } from '../../utils/http';

import {api_2120} from '../../simulatedData'

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
  programa:string[] = ["info", "sign", "course", "exercise", "exam", "survey", "evaluation", "comment", "homework"];
  programa_en:string[] = ["info", "sign", "course", "exercise", "exam", "survey", "evaluation", "comment", "homework"];
  programa_cn:string[] = ["公告", "签到", "课程", "练习", "考试", "调研", "评估", "评论", "作业"];

  swiper6:object;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.trainclassTitle});
    this.getClassInfo();//获取当前培训班 -- 基础信息
    this.get222();
    this.getPrograma();
  }

  ngAfterViewInit(){
    // this.showTrainClassTabCard();
  }

  get222(){
    // 这个222请求不知道是干嘛用的，没有实质数据返回前台
      this.protect(this.request.http(222,'flag=trainfriends').subscribe(js=>{
        // console.log('data222=',js)
      }))
  }

  getClassInfo(){
    this.curTrainInfo = api_2120['service']['item'][2];
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
      // console.log('curTrainInfo1=',this.curTrainInfo)
    }else{
      // store 中没有 该培训班数据
      this.protect(this.request.http(2121,'id='+trainID).subscribe(js=>{
        // console.log("js=",js)
        if(!js)return;
        this.curTrainInfo = js['service']['item'];
        this.getPrograma()
        // console.log('curTrainInfo2=',this.curTrainInfo);
      },e=>{this.errorMsg(e)}))
    }
  }
  
  getPrograma(){
    // 处理栏目数据
    let tablist0:string = this.curTrainInfo['_tablist'];
    let tablist1:string[] = tablist0.slice(0,tablist0.indexOf('|')).split(',');
    let tablist2:string[] = tablist0.slice(tablist0.indexOf('|')+1).split(',');
    tablist1.forEach((item,idx) => {
      let _key:string = tablist2[idx], obj:any = {};
      obj[_key] = item;
      this.programa.push(obj)
    });
    this.programa = tablist2;
    // console.log('programa=',this.programa)

    // this.programa_cn = tablist1;
    // this.programa_en = tablist2;
    // console.log(this.programa_en)
    // this.showTrainClassTabCard();
    setTimeout(this.showTrainClassTabCard(),2000)
  }

  showTrainClassTabCard(){
    let swiper6 = new Swiper('#swiper-container6',{
      autoplay:true,
      on:{
        slideChange:function(){
          // console.log(swiper6['activeIndex'])
          // firstChoice(this.pagination6.nativeElement);
        }.bind(this),
      },
      pagination:{
        el:'.swiper-pagination6',
        clickable:true,
        renderBullet:function(index,className){
          let list = this.programa;

          let _width = (100/list.length).toPrecision(5);
          let _style:string = 'display:inline-block;width:'+_width+'%;text-align:center;height:2.5rem;line-height:2.5rem;';
          
          let EnglishNames = [],ChineseNames = [];

          list.forEach((item,idex)=>{
            var key = Object.keys(item)[0];
            EnglishNames.push(key);
            ChineseNames.push(list[idex][key]);
          })
          // console.log(className)

          return `
            <span 
              class="${className}" 
              style="${_style}" 
              data-id="${Object.keys(list[index])}">
              ${ChineseNames[index]}
            <span>`;

          // return '<span class="'+className+'" style="'+_style+'" data-id="'+Object.keys(list[index])+'">'+ChineseNames[index]+'</span>'
        }.bind(this)
      },
    })
    this.swiper6 = swiper6;
  }

}
