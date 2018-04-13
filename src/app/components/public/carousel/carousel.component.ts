import { Component, OnInit } from '@angular/core';
import * as Swiper from '../../../../assets/js/swiper-4.1.0.min.js';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // 发现：分页器不显示?
    var mySwiper = new Swiper('#swiper-container0', {
      // 方向
      // direction: 'vertical',
      // 播放速度
      speed:500,
      //设定初始化时slide的索引
      initialSlide :0,
      //将slide的宽和高取整(四舍五入)以防止某些分辨率的屏幕上文字或边界(border)模糊
      roundLengths : true,
      //高度随内容变化
      autoHeight: true, 
      //只有1个slide（非loop），swiper会失效且隐藏导航等
      watchOverflow: true,
      //无缝播放
      // loop:true,
      //拖动Swiper时阻止click事件
      preventLinksPropagation : false,
      //用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay
      // autoplay: {disableOnInteraction: false},
      //事件
      on: {
        slideChange: function () {
          console.log('activeIndex=',this.activeIndex);
        },
      },
      // 如果需要分页器
      // pagination: { el: '.swiper-pagination' },
      pagination: {
        el: '.swiper-pagination',
        // clickable: true,
        // renderBullet: function (index, className) {
        //     return '<span class="' + className + '"><image src="../../../../assets/images/home/' + ( index  + 1 ) + '.png"></span>';
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
  }

}
