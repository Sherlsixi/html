/**
 * 目标1：获取文章列表并展示
 *  1.1 准备查询参数对象
 *  1.2 获取文章列表数据
 *  1.3 展示到指定的标签结构中
 */
(function () {
  function getStatusHtml(status) {
    switch (status) {
      case 0:
        return `<span class="badge text-bg-warning">草稿</span>`;
      case 1:
        return `<span class="badge text-bg-primary">待审核</span>`;
      case 2:
        return `<span class="badge text-bg-success">审核通过</span>`;
      case 3:
        return `<span class="badge text-bg-danger">审核失败</span>`;
      default:
        return "";
    }
  }
  const lastBtn = document.querySelector(".last button");
  const nextBtn = document.querySelector(".next button");

  const conditions = { channel_id: undefined, status: 0, page: 1 };
  function render(params = {}) {
    axios({
      url: "/v1_0/mp/articles",
      params: {
        ...params,
        per_page: 2,
      },
    }).then((res) => {
      console.log(res.data.data);
      const articlesList = res.data.data;
      const htmlStr = articlesList.results
        .map((item) => {
          return `
        <tr>
          <td>
            <img src="${item.cover.images}" alt="">
          </td>
          <td>${item.title}</td>
          <td>
            ${getStatusHtml(item.status)}
          </td>
          <td>
            <span>${item.pubdate}</span>
          </td>
          <td>
            <span>${item.read_count}</span>
          </td>
          <td>
            <span>${item.comment_count}</span>
          </td>
          <td>
            <span>${item.like_count}</span>
          </td>
          <td data-id="${item.id}">
            <i class="bi bi-pencil-square edit"></i>
            <i class="bi bi-trash3 del"></i>
          </td>
        </tr>
        `;
        })
        .join("");
      document.querySelector(".art-list").innerHTML = htmlStr;
      document.querySelector(
        ".total-count"
      ).innerHTML = `共${articlesList.total_count}条`;
      document.querySelector(
        ".page-now"
      ).innerHTML = `第${articlesList.page}页`;
      conditions.page = articlesList.page;
      conditions.channel_id = params.channel_id;
      conditions.status = params.status;
      const lastPage = Math.ceil(
        articlesList.total_count / articlesList.per_page
      );
      if (articlesList.page === lastPage) {
        nextBtn.disabled = true;
        lastBtn.disabled = false;
      } else if (articlesList.page === 1) {
        lastBtn.disabled = true;
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = false;
        lastBtn.disabled = false;
      }
    });
  }
  render();
  /**
   * 目标2：筛选文章列表
   *  2.1 设置频道列表数据
   *  2.2 监听筛选条件改变，保存查询信息到查询参数对象
   *  2.3 点击筛选时，传递查询参数对象到服务器
   *  2.4 获取匹配数据，覆盖到页面展示
   */
  axios({
    url: "/v1_0/channels",
  }).then((res) => {
    console.log(res.data.data.channels);
    const channelsStr = res.data.data.channels
      .map((item) => {
        return `<option value="${item.id}">${item.name}</option>`;
      })
      .join("");
    document.querySelector(".form-select").innerHTML =
      '<option value="" selected="">请选择文章频道</option>' + channelsStr;
  });
  document.querySelector(".sel-btn").addEventListener("click", (e) => {
    const form = document.querySelector(".sel-form");
    const data = serialize(form, { hash: true, empty: true });
    console.log(data);
    render(data);
  });
  /**
   * 目标3：分页功能
   *  3.1 保存并设置文章总条数
   *  3.2 点击下一页，做临界值判断，并切换页码参数并请求最新数据
   *  3.3 点击上一页，做临界值判断，并切换页码参数并请求最新数据
   */
  nextBtn.addEventListener("click", () => {
    const obj = {
      ...conditions,
      page: conditions.page + 1,
    };
    render(obj);
  });
  lastBtn.addEventListener("click", () => {
    const obj = {
      ...conditions,
      page: conditions.page - 1,
    };
    render(obj);
  });

  /**
   * 目标4：删除功能
   *  4.1 关联文章 id 到删除图标
   *  4.2 点击删除时，获取文章 id
   *  4.3 调用删除接口，传递文章 id 到服务器
   *  4.4 重新获取文章列表，并覆盖展示
   *  4.5 删除最后一页的最后一条，需要自动向前翻页
   */
  document.querySelector(".art-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      const delId = e.target.parentNode.dataset.id;
      console.log(delId);
      axios({
        url: `/v1_0/mp/articles/${delId}`,
        method: "delete",
      });
    }
    console.log(e.target);
  });
  // 点击编辑时，获取文章 id，跳转到发布文章页面传递文章 id 过去
})();
