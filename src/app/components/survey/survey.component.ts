import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Store} from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { AppState, Title, getState } from '../../redux/app.states'
import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';

import { firstChoice,getMinHeight } from '../../utils/util'
import { httpRequest,BaseComponent } from '../../utils/http'

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  providers:[httpRequest]
})
export class SurveyComponent extends BaseComponent implements OnInit {

  @ViewChild('pagination10') pagination10:ElementRef;

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private request:httpRequest) {
    super()
   }

  surveyTitle:[{}] = [{
    titleContent:'在线调研'
  }];

  completeData:any;
  notCompleteData:any;

  showLoading:boolean = false;

  swiper10:any;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.surveyTitle})
    this.showSurveyTabCard()
    firstChoice(this.pagination10.nativeElement);
    this.getSurveyData()
  }

  ngAfterViewInit(){
    getMinHeight('#swiper-container10',['.swiper-pagination-bullets'])
  }

  showSurveyTabCard(){
    let swiper = new Swiper('#swiper-container10',{
      autoplay:false,
      on:{
        slideChange:function(){
          firstChoice(this.pagination10.nativeElement);
          console.log(this.activeIndex)
          this.getSurveyData(this.swiper10['activeIndex'])
        }.bind(this)
      },
      pagination:{
        el:'.swiper-pagination10',
        clickable:true,
        renderBullet:function(index,className){
          let tablist:string[] = ['未完成','已完成'];
          let spanStyle:string = 'display:inline-block;width:50%;text-align:center;height:2.5rem;line-height:2.5rem;';
          return '<span class="' + className + '" style="'+spanStyle+'">' + tablist[index] + '</span>';
        }
      }
    })
    this.swiper10 = swiper;
  }

  getSurveyData(idx?){
    let index = idx? idx : 0;
    let params = 'iscomplete=' + index;
    this.showLoading = true;
    this.protect(this.request.http(300,params).subscribe(js=>{
      if(!js.service){
        this.showLoading = false;
        return;
      }
      // console.log('数据：',js.service.item)
      if(index == 0) {
        this.notCompleteData = js.service.item;
      }else{
        this.completeData = js.service.item;
      }
      this.showLoading = false;
    },e=>{
      this.showLoading = false;
      this.errorMsg(e);
    }))
  }

  clickFunc(){
    alert('点击成功')
  }
}
