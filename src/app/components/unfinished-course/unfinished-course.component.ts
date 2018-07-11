import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState,Title,getState } from '../../redux/app.states';
import * as titleReducer from '../../redux/reducers/title.reducer';

import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { httpRequest,BaseComponent } from '../../utils/http';

// declare var require:any;

@Component({
  selector: 'app-unfinished-course',
  templateUrl: './unfinished-course.component.html',
  styleUrls: ['./unfinished-course.component.scss'],
  providers:[httpRequest]
})
export class UnfinishedCourseComponent extends BaseComponent implements OnInit {

  showSpinner:boolean = true;

  unfinishedCourseData:object[];

  constructor(private router:Router,private store:Store<AppState>,private route:ActivatedRoute,private request:httpRequest) { super() }

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:[{titleContent:'未学课程',isShowSearch:true}]})
    this.getUnfinishedCourseData();
  }

  getUnfinishedCourseData(){
    this.protect(this.request.http(210,'flag=course&categoryid=nofinish&order=new&pageno=1&pagesize=15').subscribe(js=>{
      this.showSpinner = false;
      if(!js) return;
      // console.log('js210=',js)
      this.unfinishedCourseData = js['service']['item'];
    },e=>{
      this.errorMsg(e);
      this.showSpinner = false;
    }))
  }

  linkTo(itemObj:object){
    this.router.navigate(['/coursedetail/'+itemObj['_id']+'/'+itemObj['_title']]);
  }

}
