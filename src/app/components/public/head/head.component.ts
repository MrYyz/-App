import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, Title } from '../../../redux/app.states';
import * as titleReducer from '../../../redux/reducers/title.reducer'

@Component({
  selector: 'appHeader',
  template:`
  <div *ngFor="let T of title | async">
    <div id="header" *ngIf="T.isShowTitle">
        <i *ngIf='T.isShowBack'>Back</i>
        {{T.titleContent}}
        <em *ngIf='T.isShowQrCode'>QrCode</em>
        <em *ngIf='T.isShowPosition'>Position</em>
        <em *ngIf='T.isShowSearch'>Search</em>
      </div>
    </div>
  `,
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  title:Observable<Title[]>;

  constructor(private store:Store<AppState>) { 
    this.title = store.select(titleReducer.getTitle);
  }

  ngOnInit() {
  }

}
