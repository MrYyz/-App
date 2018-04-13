// function toTop(_el,_num1,){
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