$(function () {
  // 1. 全选 全不选功能模块
  // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
  // 事件可以使用change
  $(".checkall").change(function () {
    // console.log($(this).prop("checked"));
    $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
    if ($(this).prop("checked")) {
      // 让所有的商品添加 check-cart-item 类名
      $(".cart-item").addClass("check-cart-item");
    } else {
      // check-cart-item 移除
      $(".cart-item").removeClass("check-cart-item");
    }
  });
  //如果小复选框全都选中 就应该把全选按钮选上，否则全选按钮不选
  //   console.log($(".j-checkbox").length);
  $(".j-checkbox").change(function () {
    // console.log($(".j-checkbox:checked").length);
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
      $(".checkall").prop("checked", true);
    } else {
      $(".checkall").prop("checked", false);
    }
  });
  $(".increment").click(function () {
    // console.log($(this).siblings(".itxt").val());
    var n = $(this).siblings(".itxt").val();
    n++;
    // console.log(n);
    $(this).siblings(".itxt").val(n);

    //2.计算小计模块
    // var p = $(this).parent().parent().siblings(".p-price").html();
    var p = $(this).parents(".p-num").siblings(".p-price").html();
    p = p.substr(1);
    // console.log(p);
    //toFixed(2))保留两位小数
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("¥" + (p * n).toFixed(2));
  });
  $(".decrement").click(function () {
    var n = $(this).siblings(".itxt").val();
    // if (n > 1) {
    //   n--;
    //   $(this).siblings(".itxt").val(n);
    // }
    if (n == 1) {
      return false;
    }
    n--;
    $(this).siblings(".itxt").val(n);
    var p = $(this).parents(".p-num").siblings(".p-price").html();
    p = p.substr(1);
    // console.log(p);
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("¥" + (p * n).toFixed(2));
  });
  //3.用户修改文本框 计算 小计模块
  $(".itxt").change(function () {
    var n = $(this).val();
    var p = $(this).parents(".p-num").siblings(".p-price").html();
    p = p.substr(1);
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("¥" + (p * n).toFixed(2));
  });
});
