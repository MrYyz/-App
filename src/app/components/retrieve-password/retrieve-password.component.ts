import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { httpRequest,BaseComponent } from '../../utils/http';
import { AppState, getState } from '../../redux/app.states';

@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.scss'],
  providers:[httpRequest]
})
export class RetrievePasswordComponent extends BaseComponent implements OnInit {

  constructor(private store:Store<AppState>, private request:httpRequest) {
    super()
  }

  retrievePwdTitle:[{}] = [{titleContent:'找回密码'}];
  curEmail:string = '18825046808@139.com';
  showSpinner:boolean = false;
  isRequest:boolean = false;
  mailUrl:string;

  ngOnInit() {
    this.store.dispatch({type:'setTitle',payload:this.retrievePwdTitle});
  }

  onSubmit(){
    if(!this.curEmail){
      
      return;
    }
    this.showSpinner = true;
    const reg = /^[A-Za-zd0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-_.])+[A-Za-z0-9]{2,5}$/;
    const res = reg.test(this.curEmail);
    if(res){
      this.protect(this.request.http(120,'info='+this.curEmail).subscribe(js=>{
          console.log('已发送120=',js)
          this.showSpinner = false;
          this.isRequest = true;
          this.mailUrl = js.service._mailurl;
        },e=>{
          // this.errorMsg(e);
          alert('邮箱不存在！'+e)
          this.showSpinner = false;
        })
      )
    }else{
      alert('输入的邮箱格式有误！');
      this.showSpinner = false;
    }
  }

  open(){
    window.open(this.mailUrl)
  }
}
