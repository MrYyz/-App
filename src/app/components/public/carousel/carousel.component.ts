import { Component, OnInit, Input, } from '@angular/core';
import * as Swiper from '../../../../assets/js/swiper-4.1.0.min.js';
import { Store } from '@ngrx/store';
import { Router,ActivatedRoute } from '@angular/router';
import { AppState,getState } from '../../../redux/app.states';
import { Observable } from 'rxjs/observable'

declare var require : any;

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  
  @Input() carouselDataFromHomePage:object[];

  swiper:any;
  timer:any;

  // banner_default:string = require('../../../../assets/images/home/banner_default.jpg')
  banner_default:string = require('../../../../assets/images/home/banner_default.jpg')

  constructor(private route:ActivatedRoute,private router:Router,private store:Store<AppState>) { }

  ngOnInit() {
    this.checkDataReceiveSuccess()
  }
  
    /**
   * 解决初始化时因无数据，若直接执行showCarousel()，会导致轮播图失效的问题
   * @memberof CarouselComponent
   */
  checkDataReceiveSuccess(){
    let timer = setInterval(()=>{
       if(this.carouselDataFromHomePage) {
         this.showCarousel();
         clearInterval(this.timer)
       }
     },1000)
     this.timer = timer;
  }
  /**
   * 显示 轮播图信息
   * @memberof CarouselComponent
   */
  showCarousel(){
    // 发现：分页器不显示?
    let mySwiper = new Swiper('#swiper-container0', {
      // 方向
      // direction: 'vertical',
      // 播放速度
      speed:300,
      //设定初始化时slide的索引
      initialSlide :0,
      //将slide的宽和高取整(四舍五入)以防止某些分辨率的屏幕上文字或边界(border)模糊
      roundLengths : true,
      //高度随内容变化
      autoHeight: true, 
      //只有1个slide（非loop），swiper会失效且隐藏导航等
      watchOverflow: true,
      //无缝播放
      loop:true,
      //拖动Swiper时阻止click事件
      preventLinksPropagation : false,
      //用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
      autoplay: {disableOnInteraction: false},
      // autoplay: true,
      //事件
      on: {
        slideChange: function () {
          // console.log('activeIndex=',this.activeIndex);
        },
      },
      // 如果需要分页器
      // pagination: { el: '.swiper-pagination' },
      pagination: {
        el: '.swiper-pagination',
        // clickable: true,//点击分页器的指示点分页器会控制Swiper切换
        // bulletElement : 'li',
        // dynamicBullets:true,//分页器小点的数量会部分隐藏。
        type: 'fraction',
        // renderBullet: function (index, className) {
        //   let style = 'width:1.2rem;height:1.2rem;line-height:1.2rem;border-radius:0.6rem;background-color:#aaa;float:left;margin-right:0.3rem;text-align:center;'

        //     return '<span class="' + className + '" style='+style+'>'+(index + 1)+'</span>';
        // },
      },
      // /*轮播的效果：（1）fade:淡入淡出；（2）cube:立方体；（3）coverflow:立体照片*/
      // effect:"coverflow",
      // /*网格分布：1为在容器区域出现一张图；2：在容器区域出现两张图；3：在容器区域出现三张图*/
      // slidesPerView:2,
      // /*默认第一块居左，设置为true后则是居中显示*/
      // centeredSlides:true,
  
      // coverflow:{ 
      //   rotate:30,/*3d旋转角度设置为30度*/
      //   stretch:10,/*每个slide之间的拉伸值，值越大靠得越近*/
      //   depth:60,/*位置深度，值越大离Z轴越远，看起来越小*/
      //   modifier:2, 
      //   slideshadows:true/*开启阴影*/
      // } 
    })
    this.swiper = mySwiper;
  }

  linkTo(_carouselItem){
    // console.log('_carouselItem=',_carouselItem)
    let id = _carouselItem._id, name = _carouselItem._title;
    this.router.navigate(['/coursedetail/'+id+'/'+name])
  }
}


// (click)="this.router.navigate(['/coursedetail/id/name'])"


// 参考知识: Angular2中监听数据更新 https://blog.csdn.net/cut001/article/details/70885762