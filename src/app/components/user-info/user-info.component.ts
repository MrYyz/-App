import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState,Title } from '../../redux/app.states';
import * as TitleReducer from '../../redux/reducers/title.reducer'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  
  title:Observable<Title[]>;//可观察的对象
  
  constructor(private store:Store<AppState>) {
    this.store.dispatch({type:'setTitle',payload:this.userInfoTitle})
  }
  userInfoTitle:[{}] = [{
    // isShowBack:true,
    titleContent:'个人信息'
  }]

  ngOnInit() {
  }

}
