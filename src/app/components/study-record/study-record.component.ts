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
  selector: 'app-study-record',
  templateUrl: './study-record.component.html',
  styleUrls: ['./study-record.component.scss'],
  providers:[httpRequest]
})
export class StudyRecordComponent extends BaseComponent implements OnInit {

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private request:httpRequest) { super() }

  @ViewChild('pagination8') pagination8:ElementRef;
  swiper7:object;
  showSpinner:boolean = true;

  courseRecordData:any;//课程记录 -- object[]
  trainRecordData:any;//培训班记录 -- object[]

  swiper8:object;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:[{titleContent:'学习记录'}]});
    this.showStudyRecordTabCard()
    firstChoice(this.pagination8.nativeElement);
    this.getData();
  }

  showStudyRecordTabCard(){
    let swiper8 = new Swiper('#swiper-container8',{
      on:{
        slideChange:function(){
          firstChoice(this.pagination8.nativeElement);
          this.getData(this.swiper8['activeIndex'])
        }.bind(this)
      },
      pagination: {
        el: '.swiper-pagination8',
        clickable: true,
        renderBullet: function (index, className) {
          var contentList:string[] = ['课程','培训班'];
          var spanStyle:string = 'display:inline-block;width:50%;text-align:center;height:2.5rem;line-height:2.5rem;font-size:0.9rem;';
          return `<span style="${spanStyle}" class="${className}">${contentList[index]}</span>`;
        }
      },

    })
    this.swiper8 = swiper8
  }

  getData(idx?:number){
    
    this.showSpinner = true;
    // &flag=course&pageno=1&pagesize=15
    let params = 'flag=course';
    if(idx){
      switch(idx){
        case 0:params = 'flag=course';//【课程记录】
          break;
        case 1:params = 'flag=train';//【培训班记录】
          break;
      }
    }else{idx = 0;}
    params = params + '&pageno=1&pagesize=15';
    this.protect(this.request.http(231,params).subscribe(js=>{
      
      // console.log('js231=',js['service']['item'])

      this.showSpinner = false;
      if(!js) return;
      switch(idx){
        case 0://【课程记录】
          this.courseRecordData = js['service']['item'];
          break;
        case 1://【培训班】
        this.trainRecordData = js['service']['item'];
          break;
      }
    },e=>{
      this.errorMsg(e);
      this.showSpinner = false;
    }))
  }
  /**
   * 根据 参数 跳转路由
   * @param {object} itemObj 参数
   * @memberof StudyRecordComponent
   */
  linkTo(itemObj:object){
    switch(itemObj['_flag']){
      case 'course':
        this.router.navigate(['/coursedetail/'+itemObj['_id']+'/'+itemObj['_title']]);
        break;
      case 'train':
      this.router.navigate(['/trainclass/'+itemObj['_id']+'/'+itemObj['_title']]);
    }
    
  }
}
