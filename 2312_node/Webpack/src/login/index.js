//目标1:体验Webpack的打包过程
//1.1准备项目和源代码
import { checkPhone, checkCode } from "../utils/check.js";
console.log(checkPhone("13900002020"));
console.log(checkCode("123123123123"));

//1.2准备webpack打包的环境
//1.3运行自定义命令打包观察效果(npm run自定义命令)

//目标2:修改webpack打包入口和出口
//2.1项目根目录，新建webpack.config.js配置文件
//2.2导出配置对象，配置入口，出口文件路径
//2.3重新打包观察

//目标3:用户登录-长度判断案例
// document.querySelector(".btn").addEventListener("click", () => {
//   const phone = document.querySelector(".login-form [name=mobile]").value;
//   const code = document.querySelector(".login-form [name=code]").value;

//   if (!checkPhone(phone)) {
//     console.log("手机号长度必须为11位");
//     return;
//   }
//   if (!checkCode(code)) {
//     console.log("验证码长度必须为6位");
//     return;
//   }
//   console.log("提交到服务器登录...");
// });

//目标4：使用html-webpack-plugin插件生成html网页文件，并引入打包后的其它资源

//目标5:打包css代码
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//目标6:优化-提取css代码到单独的css文件中

//目标7:优化-压缩css代码

//目标8 打包less代码
import "./index.less";

//目标9:打包资源模块（图片处理）
//js中引入本地图片资源要用import方式（如果是网络图片地址，字符串可以直接写
import imgObj from "./assets/logo.png";
const theImg = document.createElement("img");
theImg.src = imgObj;
document.querySelector(".login-wrap").appendChild(theImg);

//目标10:完成登录功能
import myAxios from "@/utils/request.js";
import { myAlert } from "@/utils/alert.js";
document.querySelector(".btn").addEventListener("click", () => {
  const phone = document.querySelector(".login-form [name=mobile]").value;
  const code = document.querySelector(".login-form [name=code]").value;

  if (!checkPhone(phone)) {
    myAlert(false, "手机号长度必须为11位");
    console.log("手机号长度必须为11位");
    return;
  }
  if (!checkCode(code)) {
    myAlert(false, "验证码长度必须为6位");
    console.log("验证码长度必须为6位");
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
      myAlert(true, "登录成功");
      localStorage.setItem("token", res.data.token);
      location.href = "../content/index.html";
    })
    .catch((err) => {
      myAlert(false, err.response.data.message);
    });
  console.log("提交到服务器登录...");
});

//目标11:配置开发服务器环境 webpack-dev-server
//使用 npm run dev来启动开发服务器，试试热更新效果
//注意1:webpack-dev-server 借助http模块创建8080默认web服务
//注意2：默认以public文件夹作为服务器根目录
//注意3:webpack-dev-server根据配置，打包相关代码在内存中，以output.path的值作为服务器的根目录（所以可以自己拼接访问dist目录下的内容）
console.log("测试一下热更新");

//目标12:打包模式设置
//设置方式（1）webpack.config.js中 mode选项设置 （2）：package.json中 --mode=命令行设置（推荐 优先级更高）

//目标13:webpack环境下区分两种模式

//目标14:给前端注入环境变量
//需求：前端项目代码中，开发环境下打印语句生效，生产模式下打印语句失效
if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}
console.log("开发模式下好用，生产模式下失效");

//目标15:sorce map调试代码
console.warn("123");

//目标16:路径解析别名设置
import youAxios from "@/utils/request.js";
console.log(youAxios);

//目标17:第三方库使用CDN加载引入

//目标18:多页面打包
