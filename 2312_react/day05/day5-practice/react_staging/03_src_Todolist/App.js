import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";

export default class App extends Component {
  state = {
    todos: [
      { id: "001", name: "吃饭", done: false },
      { id: "002", name: "睡觉", done: true },
      { id: "003", name: "打代码", done: false },
      { id: "004", name: "逛街", done: true },
    ],
  };
  //新增todo
  addTodo = (todoObj) => {
    const { todos } = this.state;
    const newTodos = [todoObj, ...todos];
    this.setState({ todos: newTodos });
  };

  //更改某一条todo的勾选
  updateTodo = (id, done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) {
        return { ...todoObj, done };
      } else {
        return todoObj;
      }
    });
    this.setState({ todos: newTodos });
  };

  //删除某一条todo
  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todoObj) => todoObj.id !== id);
    this.setState({ todos: newTodos });
  };

  //控制全选
  checkAllTodo = (done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todoObj) => ({ ...todoObj, done }));
    this.setState({ todos: newTodos });
  };

  // 清除所有已完成todo
  clearAllDone = () => {
    const { todos } = this.state;
    const newTodos = todos.filter((todoObj) => !todoObj.done);
    this.setState({ todos: newTodos });
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List
            todos={todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
          />
          <Footer
            todos={todos}
            checkAllTodo={this.checkAllTodo}
            clearAllDone={this.clearAllDone}
          />
        </div>
      </div>
    );
  }
}
