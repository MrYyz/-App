// export function toTop(_el,_num1,){
  //     let totop = document.querySelector(_el);
  //     window.onscroll = ()=>{
  //         let scrollTop = window.scrollY;
  //         if(scrollTop > _num1){
  //             totop.style.display = 'block';
  //         }else{
  //             totop.style.display = 'none';
  //         }
  //     }
  //     // 点击按钮返回顶部
  //     totop.onclick = ()=>{
  //         // 获取当前滚动到的位置
  //         let speed = 10;
  //         let timer = setInterval(()=>{
  //             let scrollTop = window.scrollY;//2000=>1800=>1620
  //             // 计算速度(关键)
  //             // 这是一个可变的速度
  //             speed = Math.ceil(scrollTop/10);
  //             scrollTop -= speed;
  //             // 当滚动到
  //             if(scrollTop <= 10){
  //                 clearInterval(timer);
  //             }
  //             window.scrollTo(0,scrollTop);
  //         },30);
  //     }
  // }

  // export function toTop(e){
  //     let e = e || window.event;
  //     console.log(e)
// }

/**
 * @export 实现swiper标题分类首选样式
 * @param {*} _pagination 父元素
 */
export function firstChoice(_pagination:any){
  var spans = _pagination.children;
  for(let i=0;i<spans.length;i++){
      spans[i].style['border-bottom'] = 'none';
      spans[i].style['color'] = '#3e3e3e';
  }
  for(let i=0;i<spans.length;i++){
    if(spans[i].className == 'swiper-pagination-bullet swiper-pagination-bullet-active'){
      spans[i].style['border-bottom'] = '0.15rem solid #E52425';
      spans[i].style['color'] = '#CC2F2A';
    }
  }
}

/**
 * @export 实现被调用的元素获取最小高度,备注：被调用元素必须在id=main里面
 * @param {string} el 指定元素的className或者id,且className必须唯一(格式：#el或者.el)
 * @param {any[]} ex 从main中减去的其他元素的className或者id的集合,且className必须唯一(格式：'[#el','.el'...])
 */
export function getMinHeight(el:string, ex:any[]){
  var mainHeight = document.getElementById('main').offsetHeight;
  var EL;
  switch (el.slice(0,1)) {
    case '#':
    EL = document.getElementById(el.slice(1));
      break;
    case '.':
      EL = document.getElementsByClassName(el.slice(1))[0];
      break;
    default: 
      console.error('参数'+el+'格式不符合要求.');
  }
  var exTotalHeight=0,exHeight;
  for(let i=0; i<ex.length; i++){
    switch (ex[i].slice(0,1)) {
      case '#':
        exHeight = document.getElementById(ex[i].slice(1)).offsetHeight;
        break;
      case '.':
        exHeight = document.getElementsByClassName(ex[i].slice(1))[0]['offsetHeight'];
        break;
      default: 
      console.error('参数'+ex[i]+'格式不符合要求.');
    }
    exTotalHeight += exHeight;
  }
    EL.style['height'] = (mainHeight-exTotalHeight) + 'px';
}

/**
 * @export 未摸清该方法用来干嘛? --> http.ts请求时用到
 * @param {any} obj 
 * @returns 
 */
export function convertKeysToLowerCase(obj){
  const output = {};
  for(const i in obj){
    const type = Object.prototype.toString.apply(obj[i]);
    if(type === '[object Array]'){
      output[i.toLocaleLowerCase()] = [];
      for(const j of obj[i]){
        output[i.toLocaleLowerCase()].push(convertKeysToLowerCase(j))
      }
    }else if(type === '[object object]'){
      output[i.toLocaleLowerCase()] = convertKeysToLowerCase(i);
    }else{
      output[i.toLocaleLowerCase()] = obj[i];
    }
  }
  return output;
}

/**
 * @export  根据错误编号，提示错误信息(*:请求错误调用)
 * @param {string} errNo 错误编号
 */
export function errorMsg(errNo:string){
  let msg:string = '';
  switch (errNo){
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
  if(errNo == '-4'){
    window.localStorage.clear();
  }else{
    alert(msg)
  }
}
