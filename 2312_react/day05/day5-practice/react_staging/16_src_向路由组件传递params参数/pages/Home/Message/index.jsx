import React, { Component } from "react";
import Detail from "./Detail";
import { Link, Route } from "react-router-dom/cjs/react-router-dom";

export default class Message extends Component {
  state = {
    messageArr: [
      { id: "01", title: "消息1" },
      { id: "02", title: "消息2" },
      { id: "03", title: "消息3" },
    ],
  };
  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {messageArr.map((msgObj) => {
            return (
              <li key={msgObj.id}>
                <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>
                  {msgObj.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <hr />
        <Route path="/home/message/detail/:id/:title" component={Detail} />
      </div>
    );
  }
}
