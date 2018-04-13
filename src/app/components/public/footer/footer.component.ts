import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'footer',
  // templateUrl: './footer.component.html',
  template:`
  <div id="footer">
    <ul>
      <li *ngFor="let lib of libs;let i = index" (click)="jumpTo(lib.route)" [class]="'footerLi'+(i+1)" [class.choose]="this.route['_routerState'].snapshot.url.slice(1)==lib.route">
        <i></i>
        <span>{{lib.name}}</span>
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  libs:Array<object> = [
    {name:'首页',route:'home'},
    {name:'课程',route:'classify'},
    {name:'应用',route:'cart'},
    {name:'我',route:'mine'}]



  ngOnInit() {
    if(this.route['_routerState'].snapshot.url == '/'){
      setTimeout(function(){document.getElementById('footer').children[0].firstElementChild.className = 'choose';})
    }
  }

  jumpTo(_route){
    // console.log(_route)
    this.router.navigate([_route]);
  }

}
