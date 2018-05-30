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

@Component({
  selector: 'app-examcenter',
  templateUrl: './examcenter.component.html',
  styleUrls: ['./examcenter.component.scss'],
  providers:[httpRequest]
})
export class ExamcenterComponent extends BaseComponent implements OnInit {

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private request:httpRequest) { super() }
  
  @ViewChild('pagination7') pagination7:ElementRef;
  swiper7:object;
  showSpinner:boolean = true;

  examinationData:any;
  examRecordData:any;
  exerciseData:any;
  
  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:[{titleContent:'考试中心'}]})
    this.showExamTabCard();
    firstChoice(this.pagination7.nativeElement)
    this.getData();
  }

  ngAfterViewInit() {
    getMinHeight('#swiper-container7',['.swiper-pagination-bullets']);//实现被调用的元素获取最小高度
  }

  showExamTabCard(){
    var swiper7 = new Swiper('#swiper-container7',{
      autoplay:false,
      on:{
        slideChange: function () {
          firstChoice(this.pagination7.nativeElement);
          this.getData(this.swiper7['activeIndex'])
        }.bind(this)
      },
      pagination: {
        el: '.swiper-pagination7',
        clickable: true,
        renderBullet: function (index, className) {
          var contentList:string[] = ['试题库','考试记录','习题库'];
          var spanStyle:string = 'display:inline-block;width:33.333%;text-align:center;height:2.5rem;line-height:2.5rem;font-size:0.9rem;';
          return `<span style="${spanStyle}" class="${className}">${contentList[index]}</span>`;
        },
      },
    })
    this.swiper7 = swiper7;
  }

  getData(idx?:number){
    
    this.showSpinner = true;//是否需要将以下的数据存放到store里面再获取?
    this.examinationData = [],this.examRecordData = [],this.exerciseData = [];

    let params = 'iscomplete=0';
    if(idx){
      switch(idx){
        case 0:params = 'iscomplete=0';//【试题库】
          break;
        case 1:params = 'iscomplete=1';//【考试记录】
          break;
        case 2:params = 'flag=exercise';//【习题库】
          break;
      }
    } 
    params = params + '&pageno=1&pagesize=15';
    this.protect(this.request.http(710,params).subscribe(js=>{
      
      // console.log('js710=',js)

      this.showSpinner = false;
      if(!js) return;
      switch(idx){
        case 1://【考试记录】
          this.examRecordData = js['service']['item'];
          break;
        case 2://【习题库】
        this.exerciseData = js['service']['item'];
          break;
        default://【试题库】
          this.examinationData = js['service']['item'];
      }
    },e=>{
      this.errorMsg(e);
      this.showSpinner = false;
    }))

  }



}
