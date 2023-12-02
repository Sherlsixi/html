const creator = "四夕";
axios({
  url: "https://hmajax.itheima.net/api/settings",
  params: {
    creator,
  },
}).then((res) => {
  const resData = res.data.data;
  Object.keys(resData).forEach((key) => {
    if (key === "avatar") {
      document.querySelector(".prew").src = resData[key];
    } else if (key === "gender") {
      const gender = document.querySelectorAll(".gender");
      gender[resData[key]].checked = true;
    } else {
      document.querySelector(`.${key}`).value = resData[key];
    }
  });
});
//更改头像
document.querySelector(".upload").addEventListener("change", (e) => {
  const fb = new FormData();
  fb.append("avatar", e.target.files[0]);
  fb.append("creator", creator);
  axios({
    url: "https://hmajax.itheima.net/api/avatar",
    method: "put",
    data: fb,
  }).then((res) => {
    document.querySelector(".prew").src = res.data.data.avatar;
  });
});

//保存修改
document.querySelector(".submit").addEventListener("click", () => {
  const userForm = document.querySelector(".user-form");
  const userData = serialize(userForm, { hash: true, empty: true });
  userData.gender = +userData.gender;
  userData.creator = creator;
  axios({
    url: "https://hmajax.itheima.net/api/settings",
    method: "put",
    data: userData,
  }).then(() => {
    const my_toast = document.querySelector(".my-toast");
    const handleDone = new bootstrap.Toast(my_toast);
    handleDone.show();
  });
});
