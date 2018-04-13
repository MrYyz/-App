import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState,Title } from '../../redux/app.states'
import * as titleReducer from '../../redux/reducers/title.reducer'

import * as Swiper from '../../../assets/js/swiper-4.1.0.min.js'
import { Router,ActivatedRoute,ParamMap } from '@angular/router'

@Component({
  selector: 'app-courseware',
  templateUrl: './courseware.component.html',
  styleUrls: ['./courseware.component.scss']
})
export class CoursewareComponent implements OnInit {
  // 可观察的对象
  title:Observable<Title[]>;
  
  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router,) {
    this.title = store.select(titleReducer.getTitle)
  }
  // 头部参数
  coursewareTitle:[{}] = [{
    isShowBack: true,
    titleContent: '课件列表',
  }]
  // 路由参数
  routeParams:object;
  // 【课件】-- 模拟数据
  coursewareData:object[] = [
    {
      type:'',//图文
      title:'何为管理者?',

    }
  ]

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.coursewareTitle});
    // 路由参数 -- 转换成对象
    this.route.params.subscribe((params)=>{
      // console.log(params)
      this.routeParams = params;
    })
    // 路由参数 -- 单个接收
    var a = this.route.snapshot.paramMap.get('id');
    console.log(a)
  }

}
