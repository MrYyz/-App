import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/observable";
import { AppState, Title } from "../../redux/app.states";
import * as titleReducer from '../../redux/reducers/title.reducer'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  title:Observable<Title[]>;
  searchTitle:[{}] = [{
    isShowBack: true,
    titleContent:'',
  }]

  constructor(private store:Store<AppState>) {
    this.title = store.select(titleReducer.getTitle);
   }

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.searchTitle});
  }

}
