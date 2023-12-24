import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import "./index.css";

export default class Header extends Component {
  handleKeyUp = (event) => {
    const { keyCode, target } = event;
    //判断是否按了回车键
    if (keyCode !== 13) return;
    //添加的todo名字不能为空
    if (target.value.trim() === "") {
      alert("输入不能为空");
      return;
    }
    const todoObj = {
      id: uuid(),
      name: target.value,
      done: false,
    };
    this.props.addTodo(todoObj);
    target.value = "";
  };
  render() {
    return (
      <div className="todo-header">
        <input
          onKeyUp={this.handleKeyUp}
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
        />
      </div>
    );
  }
}
