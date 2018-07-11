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

  // courseData:any = [
   // {"_id":"20180518161303b41db4bf49cd21688ff2f8","_flag":"course","_title":"测试课程20180518","_image":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_thumbs":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_largeimage":"","_type":"","_coursewarecount":"7","_finishnum":"0","_url":"","_pubdate":"5月18日","_vc":"19","_pv":"3","_sc":"0","_commentcount":"1","_enablecomment":"1","_enabledownload":"0","_enablerating":"1","_enableshare":"0","_credit":"20.0","_description":"好好学习，天天向上","_category":"专题学习","_tag":"","_specialtopic":"","_mycompany":"1","_studyduration":"0","_studyprogress":"0","_laststudydate":"0","_israted":"1","_model":"0","_markid":"2017112214531495fb176a45c99b19b90fd3|20180326182017e0d4ceaaf45f6f0141163a|20180326182008a19f4b24a8b8e69625a245|2018032618195816493b9769345a0ba4919e|20180326181944205b43128c60e0af02b4d7|2018032618193748fc9fe4f70a9c7a1ecca6|20171122145308c1545438449784975f0afc","_markcontent":"选修|测试标签5|测试标签4|测试标签3|测试标签2|测试标签1|必修","_commonstar":"4.7","_mystar":"0","_author":"","_language":"","_coursetype":"专题学习","_courselevel":"","_developtime":"","_courseversion":"","_starcount":"3","_isfavorited":"0","_isStepOned":"0","_shareurl":"http://218.13.4.182:28002/mlp/api/share!shareCourse.do?id=20180518161303b41db4bf49cd21688ff2f8"},{"_id":"20180510104210a934329b19e872e0bcc42c","_flag":"course","_title":"20180510-81","_image":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_thumbs":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_largeimage":"","_type":"","_coursewarecount":"1","_finishnum":"0","_url":"","_pubdate":"5月10日","_vc":"13","_pv":"2","_sc":"0","_commentcount":"0","_enablecomment":"1","_enabledownload":"0","_enablerating":"1","_enableshare":"0","_credit":"5.0","_description":"20180510-","_category":"管理能力","_tag":"","_specialtopic":"","_mycompany":"1","_studyduration":"0","_studyprogress":"0","_laststudydate":"0","_israted":"1","_model":"0","_markid":"","_markcontent":"","_commonstar":"3","_mystar":"4","_author":"","_language":"","_coursetype":"管理能力","_courselevel":"","_developtime":"","_courseversion":"","_starcount":"2","_isfavorited":"0","_isStepOned":"0","_shareurl":"http://218.13.4.182:28002/mlp/api/share!shareCourse.do?id=20180510104210a934329b19e872e0bcc42c"},{"_id":"201805101042402044d149470002d31d08af","_flag":"course","_title":"20180510-82","_image":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_thumbs":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_largeimage":"","_type":"","_coursewarecount":"1","_finishnum":"0","_url":"","_pubdate":"5月10日","_vc":"4","_pv":"0","_sc":"0","_commentcount":"0","_enablecomment":"1","_enabledownload":"0","_enablerating":"1","_enableshare":"0","_credit":"5.0","_description":"20180510-","_category":"通用能力","_tag":"","_specialtopic":"","_mycompany":"1","_studyduration":"0","_studyprogress":"0","_laststudydate":"0","_israted":"0","_model":"0","_markid":"","_markcontent":"","_commonstar":"0","_mystar":"0","_author":"","_language":"","_coursetype":"通用能力","_courselevel":"","_developtime":"","_courseversion":"","_starcount":"0","_isfavorited":"0","_isStepOned":"0","_shareurl":"http://218.13.4.182:28002/mlp/api/share!shareCourse.do?id=201805101042402044d149470002d31d08af"}];
  // coursewareData:any = [
   // {"_id":"20180130165410e6a9c684b24f63ae374289","_flag":"courseware","_title":"视频课件20180130","_image":"","_type":"text/we","_coursewarecount":"1","_url":"http://218.13.4.182:28002/mlp/api/show!play.do?id=20180130165410e6a9c684b24f63ae374289&flag=course","_pubdate":"1月31日","_vc":"0","_pv":"0","_commentcount":"0","_enablecomment":"1","_enabledownload":"1","_enablerating":"1","_description":"","_mycompany":"1","_israted":"0","_model":"1","_markid":"","_markcontent":"","_setid":"201801301044403921345adbaa1bc44f1ee7","_islearned":"0","_zipurl":"http://218.13.4.182:28002/mlp/api/d.do?id=20180130165410e6a9c684b24f63ae374289&cid=201801301044403921345adbaa1bc44f1ee7","_markpicurl":"","_orientation":"P","_learnedtime":"0","_teacher":"","_learnhours":"0.0","_shareurl":"http://218.13.4.182:28002/mlp/api/share!sharecw.do?id=20180130165410e6a9c684b24f63ae374289&courseid=201801301044403921345adbaa1bc44f1ee7"},{"_id":"2018013016555172ebc4174a572301789075","_flag":"courseware","_title":"视频课件20180130","_image":"","_type":"text/we","_coursewarecount":"1","_url":"http://218.13.4.182:28002/mlp/api/show!play.do?id=2018013016555172ebc4174a572301789075&flag=course","_pubdate":"1月26日","_vc":"0","_pv":"0","_commentcount":"0","_enablecomment":"1","_enabledownload":"1","_enablerating":"1","_description":"","_mycompany":"1","_israted":"0","_model":"1","_markid":"","_markcontent":"","_setid":"20180125162735074cd49193317769679c33","_islearned":"0","_zipurl":"http://218.13.4.182:28002/mlp/api/d.do?id=2018013016555172ebc4174a572301789075&cid=20180125162735074cd49193317769679c33","_markpicurl":"","_orientation":"P","_learnedtime":"0","_teacher":"","_learnhours":"0.0","_shareurl":"http://218.13.4.182:28002/mlp/api/share!sharecw.do?id=2018013016555172ebc4174a572301789075&courseid=20180125162735074cd49193317769679c33"},{"_id":"20180130171135cfb4711821cc23ebab2850","_flag":"courseware","_title":"视频课件20180130全屏按钮","_image":"","_type":"text/we","_coursewarecount":"1","_url":"http://218.13.4.182:28002/mlp/api/show!play.do?id=20180130171135cfb4711821cc23ebab2850&flag=course","_pubdate":"1月26日","_vc":"0","_pv":"0","_commentcount":"0","_enablecomment":"1","_enabledownload":"1","_enablerating":"1","_description":"","_mycompany":"1","_israted":"0","_model":"1","_markid":"","_markcontent":"","_setid":"20180125162735074cd49193317769679c33","_islearned":"0","_zipurl":"http://218.13.4.182:28002/mlp/api/d.do?id=20180130171135cfb4711821cc23ebab2850&cid=20180125162735074cd49193317769679c33","_markpicurl":"","_orientation":"P","_learnedtime":"0","_teacher":"","_learnhours":"0.0","_shareurl":"http://218.13.4.182:28002/mlp/api/share!sharecw.do?id=20180130171135cfb4711821cc23ebab2850&courseid=20180125162735074cd49193317769679c33"}];
  // examData:any = [
   //  {"_flag":"exam","_id":"2018030818595047311fcb8043179576ea5e","_title":"测试考试(题库组卷)-20180308","_iscomplete":"0","_testscores":"0.0","_duration":"6","_passmark":"17.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=2018030818595047311fcb8043179576ea5e&tt=%E6%B5%8B%E8%AF%95%E8%80%83%E8%AF%95%28%E9%A2%98%E5%BA%93%E7%BB%84%E5%8D%B7%29-20180308","_completetime":"","_expiredate":"2018-03-08 19:02","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"20180308171327dcdf984766a8664262fc8f","_title":"测试考试(引入试卷)-20180308","_iscomplete":"0","_testscores":"0.0","_duration":"120","_passmark":"83.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=20180308171327dcdf984766a8664262fc8f&tt=%E6%B5%8B%E8%AF%95%E8%80%83%E8%AF%95%28%E5%BC%95%E5%85%A5%E8%AF%95%E5%8D%B7%29-20180308","_completetime":"","_expiredate":"2018-03-09 17:12","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"2018031011410008d6459b8abd76ba137457","_title":"测试试卷引入试卷(20180310)","_iscomplete":"0","_testscores":"0.0","_duration":"12","_passmark":"26.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=2018031011410008d6459b8abd76ba137457&tt=%E6%B5%8B%E8%AF%95%E8%AF%95%E5%8D%B7%E5%BC%95%E5%85%A5%E8%AF%95%E5%8D%B7%2820180310%29","_completetime":"","_expiredate":"2018-03-10 13:39","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"20180309152550bd761f89844e67a6d925ce","_title":"测试考试引入试卷非绝密(20180309)","_iscomplete":"0","_testscores":"0.0","_duration":"60","_passmark":"83.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=20180309152550bd761f89844e67a6d925ce&tt=%E6%B5%8B%E8%AF%95%E8%80%83%E8%AF%95%E5%BC%95%E5%85%A5%E8%AF%95%E5%8D%B7%E9%9D%9E%E7%BB%9D%E5%AF%86%2820180309%29","_completetime":"","_expiredate":"2018-03-10 15:22","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"20180309160350ab4042ef8b86af4a0f46f0","_title":"测试考试题库组卷(20180309)","_iscomplete":"0","_testscores":"0.0","_duration":"12","_passmark":"17.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=20180309160350ab4042ef8b86af4a0f46f0&tt=%E6%B5%8B%E8%AF%95%E8%80%83%E8%AF%95%E9%A2%98%E5%BA%93%E7%BB%84%E5%8D%B7%2820180309%29","_completetime":"","_expiredate":"2018-03-10 16:03","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"20180309162024a8d214564a6a11ced56a8a","_title":"测试考试导入试卷（20180309）","_iscomplete":"0","_testscores":"0.0","_duration":"140","_passmark":"83.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=20180309162024a8d214564a6a11ced56a8a&tt=%E6%B5%8B%E8%AF%95%E8%80%83%E8%AF%95%E5%AF%BC%E5%85%A5%E8%AF%95%E5%8D%B7%EF%BC%8820180309%EF%BC%89","_completetime":"","_expiredate":"2018-03-10 16:19","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"20180311102125c744e169c1673c681d2997","_title":"20180311(导入试卷)","_iscomplete":"0","_testscores":"0.0","_duration":"20","_passmark":"26.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=20180311102125c744e169c1673c681d2997&tt=20180311%28%E5%AF%BC%E5%85%A5%E8%AF%95%E5%8D%B7%29","_completetime":"","_expiredate":"2018-03-12 10:18","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"20180312115413dbe433d4c0fa708633e746","_title":"测试考试题库组卷(20180312)","_iscomplete":"0","_testscores":"0.0","_duration":"20","_passmark":"36.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=20180312115413dbe433d4c0fa708633e746&tt=%E6%B5%8B%E8%AF%95%E8%80%83%E8%AF%95%E9%A2%98%E5%BA%93%E7%BB%84%E5%8D%B7%2820180312%29","_completetime":"","_expiredate":"2018-03-13 08:00","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"201803122035166247c8b189c60e297e6dbd","_title":"测试考试引入非绝密（20180312）","_iscomplete":"0","_testscores":"0.0","_duration":"12","_passmark":"30.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=201803122035166247c8b189c60e297e6dbd&tt=%E6%B5%8B%E8%AF%95%E8%80%83%E8%AF%95%E5%BC%95%E5%85%A5%E9%9D%9E%E7%BB%9D%E5%AF%86%EF%BC%8820180312%EF%BC%89","_completetime":"","_expiredate":"2018-03-13 08:00","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"20180312154312d33e404d5893da5f7f1432","_title":"测试考试导入试卷（20180312）","_iscomplete":"0","_testscores":"0.0","_duration":"20","_passmark":"42.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=20180312154312d33e404d5893da5f7f1432&tt=%E6%B5%8B%E8%AF%95%E8%80%83%E8%AF%95%E5%AF%BC%E5%85%A5%E8%AF%95%E5%8D%B7%EF%BC%8820180312%EF%BC%89","_completetime":"","_expiredate":"2018-03-13 08:00","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"201805021828213e173a484ff68ff442128d","_title":"20180502-yz","_iscomplete":"0","_testscores":"0.0","_duration":"60","_passmark":"73.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=201805021828213e173a484ff68ff442128d&tt=20180502-yz","_completetime":"","_expiredate":"2018-05-05 18:24","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"20180428182639f4654477497f3e77112780","_title":"20180428test","_iscomplete":"0","_testscores":"0.0","_duration":"20","_passmark":"34.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=20180428182639f4654477497f3e77112780&tt=20180428test","_completetime":"","_expiredate":"2018-05-11 18:23","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"1","_examtype":""},{"_flag":"exam","_id":"201805151140340a8b0d4831a1e122ec6cb6","_title":"十九大精神-20180515","_iscomplete":"0","_testscores":"0.0","_duration":"90","_passmark":"60.0","_rankurl":"http://218.13.4.182:28002/mlp/api/show!showScore.do?id=201805151140340a8b0d4831a1e122ec6cb6&tt=%E5%8D%81%E4%B9%9D%E5%A4%A7%E7%B2%BE%E7%A5%9E-20180515","_completetime":"","_expiredate":"2018-06-01 11:39","_usercompletecount":"0","_ranking":"0","_desc":"","_category":"","_pubdate":"","_questioncount":"0","_fullmark":"0.0","_viewanswer":"0","_totalnumber":"1","_currnumber":"0","_examtype":""}];
  // trainData:any = [
   //  {"_applyid":"2018052920051195b93564387a1aaadac13b","_title":"111111111","_trainid":"20180529200458fa8da9037c5492e8e02a85","_traintime":"2018/05/29 20:04~2018/05/31 20:04","_address":"1","_description":"1","_classteachername":"管理员^","_iscompletion":"1","_flag":"noapplytrain","_state":"0","_tablist":"签到,课程|sign,course","_validtime":"1","_appliednum":"1","_planperson":"77","_image":"http://218.13.4.182:28002/mlp/upload/image/201712/TrainImgIcon/201712141406269a534000b48a256df8fe3c.png"},{"_applyid":"20180302112011790c65551594da48f8d942","_title":"test1111","_trainid":"2018030211195589089db5843ccb9d228f88","_traintime":"2018/03/02 11:20~2018/03/30 11:20","_address":"1111","_description":"11111","_classteachername":"管理员^","_iscompletion":"0","_flag":"noapplytrain","_state":"2","_tablist":"签到,课程|sign,course","_validtime":"0","_appliednum":"0","_planperson":"11","_image":"http://218.13.4.182:28002/mlp/api/resources/img/peixunban_03.png"}
  // ];

  courseData:any;
  coursewareData:any;
  examData:any;
  trainData:any;

  curSearchText:string;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.searchTitle});
    this.showSearchTabCard()
    firstChoice(this.pagination9.nativeElement,'#0072AE','#008FDB');
    // console.log(getState(this.store)['dataListState']['courseSearchData223'])
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
    console.log('1111111111=',this.showSpinner)
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
