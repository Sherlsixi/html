/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */
const loginBtn = document.querySelector(".btn");
loginBtn.addEventListener("click", () => {
  loginBtn.disabled = true;
  const form = document.querySelector(".login-form");
  const data = serialize(form, { hash: true, empty: true });
  console.log(data.mobile);
  axios({
    url: "/v1_0/authorizations",
    method: "post",
    data,
  })
    .then((res) => {
      const { token, refresh_token } = res.data.data;
      sessionStorage.setItem("token", token);
      return myAlert(true, "登录成功");
    })
    .then(() => {
      location.href = "../content/index.html";
    })
    .catch((error) => {
      console.log(error);
      if (error.response && error.response.data) {
        myAlert(false, error.response.data.message);
      } else {
        myAlert(false, error.message);
      }
      loginBtn.disabled = false;
    });
});
