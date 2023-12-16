import { checkPhone, checkCode } from "../utils/check";
console.log(checkPhone("13812341234"));
console.log(checkCode("123123123"));

document.querySelector(".btn").addEventListener("click", () => {
  const phone = document.querySelector(".login-form [name=mobile]").value;
  const code = document.querySelector(".login-form [name=code]").value;
  if (!checkPhone(phone)) {
    console.log("手机号长度必须为11位");
    return;
  }
  if (!checkCode(code)) {
    console.log("验证码必须为6位");
    return;
  }

  console.log("提交到服务器登录。。。");
});

import "./index.css";
