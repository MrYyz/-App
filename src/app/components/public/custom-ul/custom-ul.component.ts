import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var require:any;

@Component({
  selector: 'custom-ul',
  templateUrl: './custom-ul.component.html',
  styleUrls: ['./custom-ul.component.scss']
})
export class CustomUlComponent implements OnInit {

  @Input() data: object[];

  pic1:string = require('../../../../assets/images/adhibition/c1.png');
  pic2:string = require('../../../../assets/images/adhibition/c2.png');
  pic3:string = require('../../../../assets/images/adhibition/c3.png');
  pic4:string = require('../../../../assets/images/adhibition/c4.png');
  pic5:string = require('../../../../assets/images/adhibition/c5.png');
  pic6:string = require('../../../../assets/images/adhibition/c6.png');

  // baseUrl:string = '../../../../assets/images/ahibition/c'; //---为什么直接用baseUrl拼接字符串不行?

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // console.log(this.data)
  }
  getRoute(_route){
    this.router.navigate(['/'+_route]);
  }


}
