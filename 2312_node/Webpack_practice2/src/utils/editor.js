// 富文本编辑器
// 创建编辑器函数，创建工具栏函数
const wangEditor = require("@wangeditor/editor");
const { createEditor, createToolbar } = wangEditor;

const editorConfig = {
  placeholder: "发布文章内容...",
  onChange(editor) {
    const html = editor.getHtml();
    // console.log("editor content", html);
    // 也可以同步到 <textarea>
    document.querySelector(".publish-content").value = html;
  },
};

const editor = createEditor({
  selector: "#editor-container",
  html: "<p><br></p>",
  config: editorConfig,
  mode: "default", // or 'simple'
});

const toolbarConfig = {};

const toolbar = createToolbar({
  editor,
  selector: "#toolbar-container",
  config: toolbarConfig,
  mode: "default", // or 'simple'
});

export default editor;
// editorConfig.MENU_CONF["uploadImage"] = {
//   server: "http://geek.itheima.net/v1_0/upload",
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },

//   // 自定义插入图片
//   customInsert(res, insertFn) {
//     // TS 语法
//     // customInsert(res, insertFn) {                  // JS 语法
//     // res 即服务端的返回结果

//     // 从 res 中找到 url alt href ，然后插入图片
//     insertFn(url, alt, href);
//   },
// };
