import { nanoid } from "nanoid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { createAddPersonAction } from "../../redux/actions/person";

class Person extends Component {
  addPerson = () => {
    const name = this.nameNode.value;
    const age = this.ageNode.value;
    const personObj = { id: nanoid(), name, age };
    this.props.add(personObj);
    this.nameNode.value = "";
    this.ageNode.value = "";
  };

  render() {
    return (
      <div>
        <h1>我是Person组件,上方组件求和为{this.props.count}</h1>
        <input
          ref={(c) => (this.nameNode = c)}
          type="text"
          placeholder="请输入姓名"
        />
        <input
          ref={(c) => (this.ageNode = c)}
          type="text"
          placeholder="请输入年龄"
        />
        <button onClick={this.addPerson}>添加一个人</button>
        <ul>
          {this.props.persons.map((p) => {
            return (
              <li key={p.id}>
                {p.name}----{p.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({ persons: state.persons, count: state.count }),
  {
    add: createAddPersonAction,
  }
)(Person);
