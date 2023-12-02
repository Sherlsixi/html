const creator = "四夕";
// 第一次渲染画面

function getBooksList() {
  axios({
    url: "http://hmajax.itheima.net/api/books",
    params: {
      creator,
    },
  }).then((result) => {
    const bookList = result.data.data;
    const str = bookList
      .map((book, index) => {
        const { id, bookname, author, publisher } = book;
        return `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${bookname}</td>
            <td>${author}</td>
            <td>${publisher}</td>
            <td>
              <span
                class="del-btn"
                data-bookname="${bookname}"
                data-id="${id}"
              >删除</span>
              <span class="edit-btn" data-id="${id}">编辑</span>
            </td>
          </tr>
        `;
      })
      .join("");
    document.querySelector("tbody").innerHTML = str;
  });
}
getBooksList();

const addModal = document.querySelector(".add-modal");
const modal = new bootstrap.Modal(addModal);
const addForm = document.querySelector(".add-form");
let changer = "none";
addModal.addEventListener("hidden.bs.modal", (event) => {
  addForm.reset();
});

// 点击添加 显示弹框
document.querySelector(".plus-btn").addEventListener("click", () => {
  changer = "add";
  addModal.querySelector(".modal-title").innerText = "添加图书";
  modal.show();
});

// 点击删除或编辑 显示弹框
const delModalBox = document.querySelector(".delModal");
const delModal = new bootstrap.Modal(delModalBox);
// 操作成功弹框
const handleDoneBox = document.querySelector(".toast");
const handleDone = new bootstrap.Toast(handleDoneBox, { delay: 2000 });
// 获取id存进全局变量里
let delId = null;
let editId = null;
document.querySelector(".list").addEventListener("click", function (e) {
  if (e.target.className === "del-btn") {
    const { id, bookname } = e.target.dataset;
    delId = id;
    delModalBox.querySelector(
      ".modal-body"
    ).innerText = `确认删除${bookname}这本书吗`;
    delModal.show();
  }
  if (e.target.className === "edit-btn") {
    changer = "edit";
    editId = e.target.dataset.id;
    addModal.querySelector(".modal-title").innerText = "编辑图书";
    axios({
      url: `http://hmajax.itheima.net/api/books/${editId}`,
      method: "get",
    }).then((getRe) => {
      for (const key in getRe.data.data) {
        if (key !== "id") {
          addModal.querySelector(`#${key}`).value = getRe.data.data[key];
        }
      }
    });
    modal.show();
  }
});

// 添加图书或编辑图书功能
document.querySelector(".add-btn").addEventListener("click", () => {
  const formData = serialize(addForm, { hash: true, empty: true });
  // console.log(formData);
  // {bookname: '123', author: '456', publisher: '789'}
  const { bookname, author, publisher } = formData;
  // 判断是添加还是编辑图书
  let url = "http://hmajax.itheima.net/api/books/";
  let method = "post";
  if (changer === "edit") {
    url += editId;
    method = "put";
  }
  axios({
    url,
    method,
    data: {
      bookname,
      author,
      publisher,
      creator,
    },
  })
    .then(() => {
      getBooksList();
      modal.hide();
      handleDone.show();
    })
    .finally(() => {
      changer = "none";
    });
});
//确认删除图书功能
document
  .querySelector(".delModal .btn-primary")
  .addEventListener("click", () => {
    axios({
      url: `http://hmajax.itheima.net/api/books/${delId}`,
      method: "delete",
    })
      .then(() => {
        getBooksList();
        delModal.hide();
        handleDone.show();
      })
      .finally(() => {
        delId = null;
      });
  });
