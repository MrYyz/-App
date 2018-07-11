import { OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, RequestMethod, RequestOptionsArgs, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as X2JS from '../../assets/js/xml2json';
import * as CryptoJS from 'crypto-js';
import { environment } from './environments';

import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { convertKeysToLowerCase, errorMsg } from './util';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

// 这个是用来干嘛?
class Setting {
    public validtimehtml:number;
    public validtimevideo:number;
    public validprogressvideo:number;
    public sliceinterval:number;
    constructor(
        public server:string,
        public pwdencode:boolean,
        public key:string,
        public ver:string,
        public server_in?:string
    ){}
    session:string;
}
export let g_Setting = new Setting(environment.server,true,'','484');

@Injectable()
export class httpRequest {

    constructor(private $http:Http,private router:Router,private route:ActivatedRoute){}

    http(_no:number, _params?:string, _type?:RequestMethod, body?:any){
        let params;
        if(_no==100){
            params = '?no=' + _no + '&' + _params + '&ver=484&os=50&wh=480X800&eid=&accept=text/html,text/vnd.wap.wml,video/3mv,audio/3ma,audio/aac&timestamp=1523622948909';
        }else if(_no==120){
            params = '?no=' + _no + '&' + _params + '&ver=484';
        }else{
            let curUser = window.localStorage.getItem('user');
            let _sid:string;
            if(curUser && JSON.parse(curUser).sid){
                _sid = JSON.parse(curUser).sid;
            }else{
                window.localStorage.clear();
                setTimeout(()=>{
                    alert('暂无用户信息，请重新登陆！')
                    this.router.navigate(['/login']);
                },500)
            }
            params = '?no=' + _no + '&' + _params + '&sid=' + _sid + '&ver=484' + '&timestamp=' +( new Date() ).getTime().toString();
        }
        let url = environment.ip + environment.server + params;
        console.debug('request:',url);//输出请求信息
        let response: Observable<Response>;
        let options: RequestOptionsArgs = {};
        options.search = {'timestamp':(new Date()).getTime()};
        if(!_type){
            _type = RequestMethod.Get;
        }
        // encodeURI() 函数可把字符串作为 URI 进行编码 --> url 防止某些网站不支持中文参数。
        if(_type === RequestMethod.Get){
            url = encodeURI(url);
            response = this.$http.get(url,options);
        }else if(_type === RequestMethod.Post){
            url = encodeURI(url);
            response = this.$http.post(url,body,options);
        }else{
            throw new Error('不支持的协议');
        }
        return response
        .map(res=>{
            // console.debug('result:',res);
            if(g_Setting.key){
                return CryptoJS.DES.decrypt(res.text(), CryptoJS.enc.Utf8.parse(g_Setting.key),{iv:CryptoJS.enc.Utf8(g_Setting.key)} as CryptoJS.CipherOption).toString(CryptoJS.enc.Utf8);
            }else{
                return res.text();
            }
        }).map(text=>{
            let result;
            try{
                result = JSON.parse(text);
            }catch(e){
                result = convertKeysToLowerCase(new X2JS().xml_str2json(text));
            }
            console.debug('result:',result.service);//输出结果
            let errNo = result.service._errno;
            if(errNo < 0){
                errorMsg(errNo);
            }else{
                return result;
            }
        })
    }

}

export class BaseComponent implements OnInit, OnDestroy {
    // 用于点击事件相应尚未结束时禁止再次点击请求
    protected submitted = false; 
    // 用于标识是否数据加载中的状态。用于显示或者各种判断，一般一个component只有一个数据加载中，aot需要改成public
    public loading = false; 
    //各种订阅集合，用户合适的时候取消订阅
    private _subscriptionss: Subscription = new Subscription();
    constructor(){}
    // constructor(portected _route:ActivatedRoute,...){}
    ngOnInit(){
        // console.info('ngOnInit component:',this.constructor.name)
    }
    ngOnDestroy(){
        // console.info('ngOnDestroy component:',this.constructor.name)
    }
    /**
     * 添加subscription到component里，确保ngOnDestroy时unsubscribe
     * @param {Subscription} subscription 订阅对象
     * @memberof BaseComponent
     */
    protect(subscription:Subscription){
        this._subscriptionss.add(subscription)
    }
    
    /**
     * @export  根据错误编号，提示错误信息
     * @param {string} errNo 错误编号
     */
    errorMsg(errNo:any){
        console.log(errNo)
        var msg:string = '';
        class ProtocalError implements Error{
            name:string='ProtocalError';
            message:string='';
            no:number=0;
            errno:string='-1';
        }
        if(errNo instanceof ProtocalError){
            switch (errNo.errno){
                case '-1':
                    msg = '服务器内部错误';
                break;
                case '-8':
                    msg = '参数错误';
                break;
                case '-10':
                    msg = '账号或密码错误';
                break;
                case '-11':
                    msg = '修改密码失败';
                break;
                case '-13':
                    msg = '您已被禁言，请联系管理员。';
                break;
                case '-14':
                    msg = '不允许重复操作！';
                break;
                case '-15':
                    msg = '状态已经改变！';
                break;
                case '-17':
                    msg = '您无权限查看该内容！';
                break;
                case '-30':
                    msg = '开始时间未到！';
                break;
                case '-33':
                    msg = '不属于该类！';
                break;
                case '-38':
                    msg = '暂不能查看答案！';
                break;
                case '-45':
                    msg = '目前登录人数过多，请稍后再重新登陆！';
                break;
                case '-46':
                    msg = '操作频率过快，请稍后再试！';
                break;
                case '-4':
                    msg = '会话超时或本账号在其他设备重新登陆！';
                break;
                default:
                    msg = errNo.toString();
            } 
            if(errNo.errno == '-4'){
                window.localStorage.clear();
            }
            alert(msg)
        }else if(errNo instanceof Response){
            this.loading = false;
            switch (errNo.status){
                case 0:
                    alert('服务器连接失败,请确认网络已打开,或联系管理员!')
                    console.error('服务器连接失败,请确认网络已打开,或联系管理员!');
                    break;
                default:
                    alert('网络异常:'+errNo.status)
                    console.error('网络异常:',errNo.status)
            }
        }else if(errNo instanceof Error){
            console.error('error:'+errNo.name+';message:'+errNo.message)
            if(errNo.stack){
                console.error('stack:'+errNo.stack)
            }
        }else{
            console.error(errNo)
        }
    }
}