import { checkPhone, checkCode } from "../utils/check";
console.log(checkPhone("13812341234"));
console.log(checkCode("123123123"));

// document.querySelector(".btn").addEventListener("click", () => {
//   const phone = document.querySelector(".login-form [name=mobile]").value;
//   const code = document.querySelector(".login-form [name=code]").value;
//   if (!checkPhone(phone)) {
//     console.log("手机号长度必须为11位");
//     return;
//   }
//   if (!checkCode(code)) {
//     console.log("验证码必须为6位");
//     return;
//   }

//   console.log("提交到服务器登录。。。");
// });

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./index.less";

import imgObj from "./assets/logo.png";
const theImg = document.createElement("img");
theImg.src = imgObj;
document.querySelector(".login-wrap").appendChild(theImg);

import myAxios from "../utils/request";
import { myAlert } from "../utils/alert";
document.querySelector(".btn").addEventListener("click", () => {
  const phone = document.querySelector(".login-form [name=mobile]").value;
  const code = document.querySelector(".login-form [name=code]").value;
  if (!checkPhone(phone)) {
    myAlert(false, "手机号长度必须为11位");
    console.log("手机号长度必须为11位");
    return;
  }
  if (!checkCode(code)) {
    myAlert(false, "验证码必须为6位");
    console.log("验证码必须为6位");
    return;
  }

  myAxios({
    url: "/v1_0/authorizations",
    method: "post",
    data: {
      mobile: phone,
      code,
    },
  })
    .then((res) => {
      const { token, refresh_token } = res.data;
      sessionStorage.setItem("token", token);
      return myAlert(true, "登录成功");
    })
    .then(() => {
      location.href = "../content/index.html";
    })
    .catch((error) => {
      console.log(error);
      myAlert(false, error.response.data.message);
    });
});

if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}
console.log("开发模式下好用，生产模式下失效");

console.warn("123");

import youAxios from "@/utils/request.js";
console.log(youAxios);
