import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'

@Component({
  selector: 'custom-ul',
  templateUrl: './custom-ul.component.html',
  styleUrls: ['./custom-ul.component.scss']
})
export class CustomUlComponent implements OnInit {

  @Input() data: object[];
  // baseUrl:string = '../../../../assets/images/ahibition/'; //---为什么直接用baseUrl拼接字符串不行?

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.data)
  }
  getRoute(_route){
    this.router.navigate(['/'+_route]);
  }


}
