import { Component, OnInit, Input, } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  name: String = '';

  ngOnInit() {
    this.setBgSize()
  }
  
  setBgSize(){
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var body = document.getElementsByTagName('body');
    var notfound = document.getElementById('notfound');
    notfound.style.width = w + 'px';
    notfound.style.height = h + 'px';
  }

}
