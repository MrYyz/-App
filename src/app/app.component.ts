import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, Title } from './redux/app.states';
import * as titleReducer from './redux/reducers/title.reducer'

import { Home, FAVORITE_ARTICLES } from './redux/models/home'
import * as homeReducer from './redux/reducers/home.reducer'

import { Router,ActivatedRoute } from '@angular/router';

import * as VConsole from 'vconsole';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private store:Store<AppState>,private route:ActivatedRoute,private router:Router){ }

  ngOnInit(){
    // setTimeout(this.giveAppHeight());
    this.isNotLogined();
    var vconsole = new VConsole();
  }
  ngAfterViewInit() {setTimeout(this.giveAppHeight());}

  isNotLogined(){ 
    if(!window.localStorage.getItem('user')){
      this.router.navigate(['/login'])
    }
  }

  selectState(_shoose:string,_res?:any,_num?:number){
    if(typeof(arguments[0]) == 'string' && arguments.length == 1){
      _shoose = arguments[0];
      _res = this.store
    }
    if(!_num){_num = 5}
    _num --;
    if(_res.source.value){
      _res = _res.source.value;
      var result = _res[_shoose];
      // console.log('result=',result)
      return result;
    }else{
      if(_num<0) return '找不到对应的state';
      _res=_res.source;
      this.selectState(_res,_shoose,_num)
    }
  }
  /**
   * 初始化时调用，使#app根据设备高度获得对应height值
   */
  giveAppHeight(){
    var h = document.documentElement.clientHeight;
    var app = document.getElementById('app');
    var header = document.getElementById('appheader');
    var main = document.getElementById('main');
    app.style.height = h + 'px';
    if(header){
      main.style.height = (h-50) + 'px';
    }else{
      main.style.height = (h-header.offsetHeight) + 'px';
    }
  }
}
