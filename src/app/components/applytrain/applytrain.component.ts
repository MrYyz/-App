import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState, Title, getState } from '../../redux/app.states';
import * as TitleReducer from '../../redux/reducers/title.reducer';
import { httpRequest,BaseComponent } from '../../utils/http';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-applytrain',
  templateUrl: './applytrain.component.html',
  styleUrls: ['./applytrain.component.scss'],
  providers:[httpRequest]
})
export class ApplytrainComponent extends BaseComponent implements OnInit {
  // title:Observable<Title[]>
  constructor(private route:ActivatedRoute, private router:Router, private store:Store<AppState>, private request:httpRequest) { 
    super()
    // this.title = store.select(TitleReducer.getTitle);
    // console.log('title=',this.title);
  }

  // header数据
  applytrainTitle:[{}] = [{
    titleContent: '报名详情',
  }]
  // 报名详细内容
  applytrainData:object;
  // applytrainData:object = {
  //   "_id":"20180522185008744089bed4f6ad325f9153",
  //   "_title":"大王叫我来巡山",
  //   "_trainid":"2018052218494733fa2c5aa9d42908ad614f",
  //   "_image":"http://218.13.4.182:28002/mlp/api/resources/img/peixunban_02.png",
  //   "_applytime":"2018/05/22 18:49-2018/06/01 18:49",
  //   "_traintime":"2018/05/28 18:46~2018/06/29 18:46",
  //   "_address":"广东省佛山南海惠北路28号中核大楼3层305会议室",
  //   "_enableapply":"50",
  //   "_planperson":"50",
  //   "_description":"培训内容：帮助您尽快唱出\"大王带我来巡山\"经典歌剧。",
  //   "_enablecancelapply":"1",
  //   "_ispass":"1",
  //   "_appliedtime":"2018/05/22 18:50:10",
  //   "_flag":"noapply",
  //   "_appliednum":"0",
  //   "_enablepreview":"0",
  //   "_classteachername":"郭燕雪^",
  //   "_isteacher":"0"
  // }
  showSpinner:boolean = true;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.applytrainTitle});
    this.getApplytrainInfo();
    // this.showSpinner = false;
  }

  /**
   * 通过路由中的(培训班申请)id获取当前培训班报名信息 -- 2021协议
   * @memberof ApplytrainComponent
   */
  getApplytrainInfo(){

    let classesID = this.route.snapshot.paramMap.get('id');

    this.protect(this.request.http(2101,'id='+classesID).subscribe(js=>{
      this.showSpinner = false;
      if(!js) {
        return;
      };
      this.applytrainData = js.service.item;

      if(js['service'].item._flag == 'isPower'){
        this.store.dispatch({type:'setTitle',payload:[{titleContent:'培训班详情'}]})
      }

    },e=>{
      this.errorMsg(e);
      this.showSpinner = false;
    }))
  }
  /**
   * 请求2101数据 -- 获取：当前培训班信息
   * @memberof ApplytrainComponent
   */
  jumpToTrainClass(e){
    e = e || window.event;
    let text = e.target.innerText;

    switch(text){
      case '您是班主任，进入培训班':
      case '报名成功，进入培训班':
        this.router.navigate(['/trainclass/'+this.applytrainData['_trainid']+'/'+this.applytrainData['_title']]);
        break;
      case '已被管理员取申请消资格':
      case '报名正在审核中':
      case '报名已结束':
        break;
        // return;
      case '取消报名':
        this.protect(this.request.http(2103,'id='+this.applytrainData['_id']).subscribe(js=>{
          if(!js) {
            alert('取消失败，请稍后再试！')
            return;
          };
          alert('报名取消成功！')
          this.getApplytrainInfo();//获取当前培训班数据
        },e=>{this.errorMsg(e)}))
        break;
      default:// 我要报名（?人已报名）
        if(this.applytrainData['_enableapply'] == this.applytrainData['_planperson']) {alert('报名人数已达上限！');return;};
        this.protect(this.request.http(2102,'id='+this.applytrainData['_id']).subscribe(js=>{
          if(!js) return;
          this.getApplytrainInfo();
          alert('报名成功！')
        },e=>{
          this.errorMsg(e)
        }))

    }
  }

}
