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
    //小复选框如果选中 则让当前商品模块背景色变色
    if ($(this).prop("checked")) {
      $(this).parents(".cart-item").addClass("check-cart-item");
    } else {
      $(this).parents(".cart-item").removeClass("check-cart-item");
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
    getSum();
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
    getSum();
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
    getSum();
  });
  getSum();
  //4.总计总额模块
  function getSum() {
    var count = 0;
    var money = 0;
    $(".itxt").each(function (i, ele) {
      count += parseInt($(ele).val());
    });
    $(".amount-sum em").text(count);
    $(".p-sum").each(function (i, ele) {
      money += parseFloat($(ele).text().substr(1));
    });
    $(".price-sum em").text("¥" + money.toFixed(2));
  }
  //5.删除商品模块
  //（1）商品后面的删除按钮
  $(".p-action a").click(function () {
    $(this).parents(".cart-item").remove();
    getSum();
  });
  //（2）删除选中的商品
  $(".remove-batch").click(function () {
    //删除的是小的复选框被选中的商品
    $(".j-checkbox:checked").parents(".cart-item").remove();
    getSum();
  });
  //（3）清空购物车 删除全部商品
  $(".clear-all").click(function () {
    $(".cart-item").remove();
  });
});
