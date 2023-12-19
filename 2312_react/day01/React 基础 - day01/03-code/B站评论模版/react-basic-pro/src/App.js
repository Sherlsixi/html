import { useState, useRef, useEffect } from "react";

import "./App.scss";
import avatar from "./images/bozai.png";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import axios from "axios";

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 当前登录用户信息
const user = {
  // 用户id
  uid: "30009257",
  // 用户头像
  avatar,
  // 用户昵称
  uname: "黑马前端",
};

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];

//封装请求数据的自定义hook
function useGetList() {
  //获取接口数据渲染
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    async function getList() {
      const res = await axios.get("http://localhost:3004/list");
      setCommentList(res.data);
    }
    getList();
  }, []);
  return {
    commentList,
    setCommentList,
  };
}

//封装Item组件
const Item = ({ item, onHandleDel }) => {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" alt="" src={item.user.avatar} />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            {/* 条件：user.uid===item.user.uid */}

            {user.uid === item.user.uid && (
              <span
                className="delete-btn"
                onClick={() => onHandleDel(item.rpid)}
              >
                删除
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // 渲染评论列表
  // 1.使用useState维护list
  // const [commentList, setCommentList] = useState(
  //   _.orderBy(list, "like", "desc")
  // );

  const { commentList, setCommentList } = useGetList();

  // 删除功能
  const handleDel = (id) => {
    console.log("删除" + id);
    // 对commentList做过滤处理
    setCommentList(commentList.filter((item) => item.rpid !== id));
  };

  //tab切换功能
  // 1.点击谁就把谁的type记录下来
  //2.通过记录的type和每一项遍历时的type做匹配 控制激活类名的显示
  const [tabType, setTabType] = useState("hot");
  const handleTabChange = (type) => {
    console.log(type);
    setTabType(type);
    //基于列表的排序
    if (type === "hot") {
      setCommentList(_.orderBy(commentList, "like", "desc"));
    } else {
      setCommentList(_.orderBy(commentList, "ctime", "desc"));
    }
  };

  // 发表评论
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const handlePublish = () => {
    setCommentList([
      ...commentList,
      {
        rpid: uuidv4(),
        user: {
          uid: "30009257",
          avatar,
          uname: "黑马前端",
        },
        content: content,
        ctime: moment().format("MM-DD HH:mm"),
        like: 66,
      },
    ]);
    setContent("");
    inputRef.current?.focus();
  };

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map((item) => (
              <span
                key={item.type}
                onClick={() => handleTabChange(item.type)}
                className={`nav-item ${tabType === item.type && "active"}`}
              >
                {item.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              ref={inputRef}
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {/* 发布按钮 */}
            <button className="reply-box-send" onClick={handlePublish}>
              <span className="send-text">发布</span>
            </button>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map((item) => (
            <Item key={item.rpid} item={item} onHandleDel={handleDel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
