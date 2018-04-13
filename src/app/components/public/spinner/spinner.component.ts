import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.runSpinner();
  }
  // 使spanning转起来
  runSpinner(){
    var snake = document.getElementsByClassName('spinner-snake')[0];
    var deg = 0;
    var timer = setInterval(function(){
      snake['style']['transform'] = 'rotate('+deg+'deg)';
      deg = deg + 8;
    },16)
  }
}
