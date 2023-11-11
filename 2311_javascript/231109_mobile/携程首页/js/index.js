window.addEventListener("DOMContentLoaded", function () {
  // 获取元素
  var focus = document.querySelector(".focus");
  var ul = focus.children[0];
  var w = focus.offsetWidth;
  var ol = focus.children[1];
  // console.log(w);
  var index = 0;
  var timer = setInterval(function () {
    index++;
    // console.log(index);
    var translatex = -index * w;
    ul.style.transition = "all.3s";
    ul.style.transform = "translateX(" + translatex + "px)";
  }, 2000);
  // 等过渡完成之后，再去判断 监听过渡的事件 transitionend
  ul.addEventListener("transitionend", function () {
    //无缝滚动
    if (index >= 3) {
      index = 0;
      // console.log(index);
      //利用最新的索引号乘以宽度 去滚动图片
      var translatex = -index * w;
      //去掉过渡效果 这样让我们的ul快速跳到目标位置
      ul.style.transition = "none";
      ul.style.transform = "translateX(" + translatex + "px)";
    } else if (index < 0) {
      index = 2;
      ul.style.transition = "none";
      //利用最新的索引号乘以宽度 去滚动图片
      var translatex = -index * w;
      ul.style.transform = "translateX(" + translatex + "px)";
    }
    //3、小圆点跟随变化
    ol.querySelector(".current").classList.remove("current");
    ol.children[index].classList.add("current");
  });
  //4.手指滑动轮播图
  //触摸元素 touchstart:获取手指初始坐标
  var startX = 0;
  var moveX = 0; //后面还会用到这个移动距离所以要定义一个全局变量
  var flag = false;
  ul.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    // console.log(startX);
    clearInterval(timer); //为什么不加timer=null
  });
  ul.addEventListener("touchmove", function (e) {
    //计算移动距离
    moveX = e.targetTouches[0].pageX - startX;
    //移动盒子：盒子原来的距离+手指移动的距离
    var translatex = -index * w + moveX;
    //手指拨动的时候不需要动画所以要取消
    ul.style.transition = "none";
    ul.style.transform = "translateX(" + translatex + "px)";
    flag = true; //如果遇到用户手机移动过再去判断 否则不做判断
    e.preventDefault(); //阻止滚动屏幕的行为
  });
  ul.addEventListener("touchend", function (e) {
    if (flag) {
      //(1)如果移动距离大于50像素我们就播放上一张或者下一张
      if (Math.abs(moveX) > 50) {
        //如果是右滑就是播放上一张 moveX是正值
        //如果是左滑就是播放上一张 moveX是负值
        if (moveX > 0) {
          index--;
        } else {
          index++;
        }
        var translatex = -index * w;
        ul.style.transition = "all .3s";
        ul.style.transform = "translateX(" + translatex + "px)";
      } else {
        //(2)如果移动距离小于50像素我们就回弹
        var translatex = -index * w;
        ul.style.transition = "all .1s";
        ul.style.transform = "translateX(" + translatex + "px)";
      }
    }
    //手指离开的时候重新开启定时器
    clearInterval(timer);
    timer = setInterval(function () {
      index++;
      // console.log(index);
      var translatex = -index * w;
      ul.style.transition = "all.3s";
      ul.style.transform = "translateX(" + translatex + "px)";
    }, 2000);
  });
  var goBack = document.querySelector(".goBack");
  var nav = document.querySelector("nav");
  console.log(nav);
  window.addEventListener("scroll", function () {
    if (window.scrollY >= nav.offsetTop) {
      goBack.style.display = "block";
    } else {
      goBack.style.display = "none";
    }
  });
  goBack.addEventListener("click", function () {
    window.scroll(0, 0);
  });
});
