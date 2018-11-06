import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromHomeActions from '../../redux/actions/home.actions'
import { AppState, Title, getState } from '../../redux/app.states'
import * as titleReducer from '../../redux/reducers/title.reducer'
import * as dataListReducer from '../../redux/reducers/dataList.reducer'

import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { firstChoice,getMinHeight } from '../../utils/util'
import { httpRequest,BaseComponent } from '../../utils/http'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers:[httpRequest]
})
export class SearchComponent extends BaseComponent implements OnInit {

  dataList:Observable<any>;
  searchTitle:[{}] = [{
    isShowBack: true,
    isShowSearchDiv:true,
    titleContent:'',
  }]

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private request:httpRequest) { super() }

  @ViewChild('pagination9') pagination9:ElementRef;
  swiper9:any;
  showSpinner:boolean = false;

  courseData:any;
  coursewareData:any;
  examData:any;
  trainData:any;

  curSearchText:string;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.searchTitle});
    this.showSearchTabCard()
    firstChoice(this.pagination9.nativeElement,'#0072AE','#008FDB');
  }

  ngAfterViewInit(){
    getMinHeight('#swiper-container9',['.swiper-pagination9']);//实现被调用的元素获取最小高度
  }

  ngDoCheck(){//监测 数据是否发生变化
    this.courseData = getState(this.store)['dataListState']['courseSearchData223'];
// console.log('ngDoCheck=',this.courseData)
    let nextSearchText = getState(this.store)['dataListState']['SearchText'];

    if(this.curSearchText != nextSearchText){this.swiper9.slideTo(0, 300, false)}
    this.curSearchText = nextSearchText;
  }

  showSearchTabCard(){
    let swiper9 = new Swiper('#swiper-container9',{
      on:{
        slideChange:function(){
          firstChoice(this.pagination9.nativeElement,'#0072AE','#008FDB');
          this.getData(this.swiper9['activeIndex'])
        }.bind(this)
      },
      pagination:{
        el:'.swiper-pagination9',
        clickable:true,
        renderBullet:function(index,className){
          var contentList:string[] = ['课程','课件','考试','培训班'];
          var spanStyle:string = 'display:inline-block;width:25%;text-align:center;height:2.5rem;line-height:2.5rem;font-size:0.9rem;';
          return `<span style="${spanStyle}" class="${className}">${contentList[index]}</span>`;
        }
      }
    })
    this.swiper9 = swiper9;
  }

  getData(idx?:number){
    // console.log('1111111111=',this.showSpinner)
    this.showSpinner = true;

    let params = 'flag=course';
    if(idx){
      switch(idx){
        case 0:params = 'flag=course';//【课程】
          break;
        case 1:params = 'flag=courseware';//【课件】
          break;
        case 2:params = 'flag=exam';//【考试】
          break;
        case 3:params = 'flag=train';//【培训班】
          break;
      }
    }else{idx = 0;}

    let dataArr = [this.courseData,this.coursewareData,this.examData,this.trainData];

    if(dataArr[idx]) {
      //如果有结果就不再查询了
      this.showSpinner = false;
      return;
    };

    let dataList = getState(this.store)['dataListState'];
    // console.log(dataList)
    if(dataList && dataList['SearchText']){
      params = params + '&pageno=1&pagesize=15&key=' + dataList['SearchText'];
    }else{
      console.log('搜索内容不能为空！')
      this.showSpinner = false;
      return;
    }
    
    this.protect(this.request.http(223,params).subscribe(js=>{
      
      // console.log('js223=',js['service']['item'])

      this.showSpinner = false;
      if(!js) return;
      switch(idx){
        case 0://【课程】
          this.courseData = js['service']['item'];
          break;
        case 1://【课件】
        this.coursewareData = js['service']['item'];
          break;
        case 2://【考试】
          this.examData = js['service']['item'];
          break;
        case 3://【培训班】
          this.trainData = js['service']['item'];
          break;
      }
    },e=>{
      this.errorMsg(e);
      this.showSpinner = false;
    }))
  }

  linkTo(itemObj:object){
    console.log(itemObj)
    switch(itemObj['_flag']){
      case 'course':
        this.router.navigate(['/coursedetail/'+itemObj['_id']+'/'+itemObj['_title']])
      break;
      case 'courseware':
        alert('暂不支持查看课件')
      break;
      case 'exam':
        alert('暂不支持考试详情')
      break;
      default://培训班
        this.router.navigate(['/applytrain/'+itemObj['_applyid']]);
    }
  }
}
