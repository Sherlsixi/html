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
document.querySelector(".btn").addEventListener("click", () => {
  const phone = document.querySelector(".login-form [name=mobile]").value;
  const code = document.querySelector(".login-form [name=code]").value;

  if (!checkPhone(phone)) {
    console.log("手机号长度必须为11位");
    return;
  }
  if (!checkCode(code)) {
    console.log("验证码长度必须为6位");
    return;
  }
  console.log("提交到服务器登录...");
});

//目标4：使用html-webpack-plugin插件生成html网页文件，并引入打包后的其它资源

//目标5:打包css代码
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

//目标6:优化-提取css代码到单独的css文件中

//目标7:优化-压缩css代码
