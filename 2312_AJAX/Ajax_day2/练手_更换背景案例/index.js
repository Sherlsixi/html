document.querySelector(".bg-ipt").addEventListener("change", (e) => {
  // console.log(e.target.files);
  const fd = new FormData();
  fd.append("img", e.target.files[0]);
  axios({
    url: "https://hmajax.itheima.net/api/uploadimg",
    method: "post",
    data: fd,
  }).then((res) => {
    const urlImg = res.data.data.url;
    document.body.style.backgroundImage = `url(${urlImg})`;
    localStorage.setItem("bgUrl", urlImg);
  });
});
const bgUrl = localStorage.getItem("bgUrl");
bgUrl && (document.body.style.backgroundImage = `url(${bgUrl})`);
