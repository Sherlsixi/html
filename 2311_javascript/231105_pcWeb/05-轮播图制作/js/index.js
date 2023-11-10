window.addEventListener("DOMContentLoaded", function () {
  var arrow_l = document.querySelector(".arrow-l");
  console.log(arrow_l);
  var arrow_r = document.querySelector(".arrow-r");
  var focus = document.querySelector(".focus");
  focus.addEventListener("mouseenter", function () {
    // alert("1");
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer);
    // timer = null; //这个的作用是什么
  });
  focus.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    timer = setInterval(function () {
      arrow_r.click();
    }, 2000);
  });
  // 动态生成小圆圈 加小圆圈的功能
  var ol = focus.querySelector(".circle");
  var ul = focus.querySelector("ul");
  var focusWidth = focus.offsetWidth;
  console.log(focusWidth);
  for (var i = 0; i < ul.children.length; i++) {
    // console.log(i);
    var li = document.createElement("li");
    li.setAttribute("index", i);
    ol.appendChild(li);
    li.addEventListener("click", function () {
      for (const i of ol.children) {
        console.log(i);
        i.className = "";
      }
      this.className = "current";
      //点小圆圈后图片滑动
      var index = parseInt(this.getAttribute("index"));
      console.log(index);
      num = index;
      circle = index;
      animate(ul, -index * focusWidth);
    });
    ol.children[0].className = "current";
  }
  //完成左右箭头的功能
  //右箭头
  var num = 0;
  var circle = 0;
  var flag = true;
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);

  arrow_r.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num === ul.children.length - 1) {
        num = 0;
        ul.style.left = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      }); //这里function的用法 回调函数
      circle++;
      if (circle === ol.children.length) {
        circle = 0;
      }
      for (const i of ol.children) {
        i.className = "";
      }
      ol.children[circle].className = "current";
    }
  });
  //左箭头
  arrow_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num === 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px"; //问题：加px和不加px的区别
        console.log(ul.style.left);
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      for (const i of ol.children) {
        i.className = "";
      }
      ol.children[circle].className = "current";
    }
  });
  var timer = setInterval(function () {
    arrow_r.click();
  }, 2000);
});
