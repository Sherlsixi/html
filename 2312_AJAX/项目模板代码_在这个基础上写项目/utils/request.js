// axios 公共配置
// 基地址
(function () {
  axios.defaults.baseURL = "http://geek.itheima.net";
  const AUTH_TOKEN = sessionStorage.getItem("token");
  if (AUTH_TOKEN) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
  }
  // axios.defaults.headers.post["Content-Type"] =
  //   "application/x-www-form-urlencoded";
})();
