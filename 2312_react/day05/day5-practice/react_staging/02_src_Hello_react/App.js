import React, { Component } from "react";
import Hello from "./Component/Hello";
import Welcome from "./Component/Welcome";

export default class App extends Component {
  render() {
    return (
      <div>
        <Hello />
        <Welcome />
      </div>
    );
  }
}
