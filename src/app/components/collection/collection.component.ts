import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState,Title,getState } from '../../redux/app.states'
import * as TitleReducer from '../../redux/reducers/title.reducer';
import { httpRequest,BaseComponent } from '../../utils/http'

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  providers:[httpRequest]
})
export class CollectionComponent extends BaseComponent implements OnInit {

  showSpinner:boolean = true;

  collectData:object[];

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,private request:httpRequest) { super() }

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:[{titleContent:'我的收藏'}]})
    this.getCollectData();
  }

  getCollectData(){
    this.protect(this.request.http(219,'type=favorites&pageno=1&pagesize=15').subscribe(js=>{
      this.showSpinner = false;
      if(!js) return;
      this.collectData = js['service']['item'];
    },e=>{
      this.showSpinner = false;
      this.errorMsg(e);
    }))
  }
  /**
   * 根据 参数 跳转路由
   * @param {object} itemObj 参数
   * @memberof CollectionComponent
   */
  linkTo(itemObj:object){
    this.router.navigate(['/coursedetail/'+itemObj['_id']+'/'+itemObj['_title']])
  }

}



// {"service":{"item":{"_id":"201803221029407472412888705fd613b9f8","_title":"测试合并课件到课程","_flag":"course","_image":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_thumbs":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_favdate":"2分钟前","_vc":"33","_pv":"1","_commentcount":"0","_description":"","_model":"0","_markid":"20171122145308c1545438449784975f0afc|20180326182017e0d4ceaaf45f6f0141163a|20180326182008a19f4b24a8b8e69625a245|2018032618195816493b9769345a0ba4919e|20180326181944205b43128c60e0af02b4d7|2018032618193748fc9fe4f70a9c7a1ecca6","_markcontent":"必修|测试标签5|测试标签4|测试标签3|测试标签2|测试标签1"},"_no":"219","_totalcount":"1","_count":"1","_pageno":"1","_errno":"0"}}


// {"service":{"item":[{"_id":"201804201738353c8d38c01485ca0306c486","_title":"【广发银行】亲属回避制度","_flag":"course","_image":"","_thumbs":"","_favdate":"刚刚","_vc":"94","_pv":"0","_commentcount":"0","_description":"","_model":"0","_markid":"2017112214531495fb176a45c99b19b90fd3|20171122145308c1545438449784975f0afc","_markcontent":"选修|必修"},{"_id":"201803221029407472412888705fd613b9f8","_title":"测试合并课件到课程","_flag":"course","_image":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_thumbs":"http://218.13.4.182:28002/mlp/api/resources/img/05.png","_favdate":"3分钟前","_vc":"33","_pv":"1","_commentcount":"0","_description":"","_model":"0","_markid":"20171122145308c1545438449784975f0afc|20180326182017e0d4ceaaf45f6f0141163a|20180326182008a19f4b24a8b8e69625a245|2018032618195816493b9769345a0ba4919e|20180326181944205b43128c60e0af02b4d7|2018032618193748fc9fe4f70a9c7a1ecca6","_markcontent":"必修|测试标签5|测试标签4|测试标签3|测试标签2|测试标签1"}],"_no":"219","_totalcount":"2","_count":"2","_pageno":"1","_errno":"0"}}