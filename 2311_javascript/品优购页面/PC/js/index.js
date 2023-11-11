window.addEventListener("load", function () {
  // this.alert("123");
  // 获取元素
  var arrow_l = this.document.querySelector(".arrow-l");
  var arrow_r = this.document.querySelector(".arrow-r");
  var focus = this.document.querySelector(".focus");
  focus.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer);
    timer = null; //这个是什么意思
    console.log(timer);
  });
  focus.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    timer = setInterval(function () {
      arrow_r.click();
    }, 2000);
  });
  var ul = focus.querySelector("ul");
  var ol = focus.querySelector(".circle");
  var focusWidth = focus.offsetWidth;

  // console.log(ul.children);
  // console.log(ul.children.length);
  //动态生成小圆圈
  for (var i = 0; i < ul.children.length; i++) {
    {
      var li = document.createElement("li");
      li.setAttribute("index", i);
      ol.appendChild(li);
      //生成小圆圈的同时给小圆圈绑定事件
      li.addEventListener("click", function () {
        for (const k of ol.children) {
          // console.log(k);
          k.className = "";
        }
        this.className = "current";
        var index = parseInt(this.getAttribute("index")); //把index转化成数字型
        //当我们点击了某个小li 就把当前这个li的索引号给num
        num = index;
        //当我们点击了某个小li 就把当前这个li的索引号给num
        circle = index;
        // console.log(index);
        animate(ul, -index * focusWidth);
      });
    }
  }
  ol.children[0].className = "current";
  //6.克隆第一张图片放到ul最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  //7.点击右侧按钮 ，图片无缝滚动
  var num = 0;
  // circle控制小圆圈的播放
  var circle = 0;
  //flag节流阀
  var flag = true;
  arrow_r.addEventListener("click", function () {
    // alert("1");
    if (flag) {
      flag = false;
      if (num === ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true; //打开节流阀
      });

      circle++;
      //如果circle等于4，说明走到克隆的这张图片了
      if (circle === ol.children.length) {
        circle = 0;
      }
      circleChange();
    }
  });
  arrow_l.addEventListener("click", function () {
    // alert("1");
    if (flag) {
      flag = false;
      if (num === 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px";
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      circle--;
      //如果circle<0，说明是第一张图片，则小圆圈要改为第4个小圆圈
      // if (circle < 0) {
      //   circle = ol.children.length - 1;
      // }
      circle = circle < 0 ? ol.children.length - 1 : circle;
      circleChange();
    }
  });
  function circleChange() {
    // 先清除其余小圆圈的current类名
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    // 留下当前的小圆圈的current类名
    ol.children[circle].className = "current";
  }
  var timer = setInterval(function () {
    arrow_r.click();
  }, 2000);
});
