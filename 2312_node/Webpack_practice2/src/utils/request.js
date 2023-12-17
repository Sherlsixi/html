// axios 公共配置
// 基地址
import axios from "axios";
import _ from "underscore";
axios.defaults.baseURL = "http://geek.itheima.net";
const AUTH_TOKEN = sessionStorage.getItem("token");
if (AUTH_TOKEN) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
}
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const result = response.data;
    return result;
  },
  _.debounce(function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.dir(error);
    if (error?.response?.status === 401) {
      alert("登录状态过期，请重新登录");
      sessionStorage.removeItem("token");
      location.href = "../login/index.html";
    }
    return Promise.reject(error);
  }, 100)
);
export default axios;
