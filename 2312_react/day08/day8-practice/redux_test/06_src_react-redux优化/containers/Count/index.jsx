import { connect } from "react-redux";
import {
  createDecrementAction,
  createIncrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action";
import React, { Component } from "react";

class Count extends Component {
  state = { carName: "bentz" };

  increment = () => {
    const { value } = this.selectNumber;
    this.props.jia(value * 1);
  };
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.jian(value * 1);
  };
  incrementIfOdd = () => {
    const { value } = this.selectNumber;
    if (this.props.count % 2 !== 0) {
      this.props.jia(value * 1);
    }
  };
  incrementAsync = () => {
    const { value } = this.selectNumber;
    this.props.jiaAsync(value * 1, 1000);
  };
  render() {
    // console.log(this.props);
    return (
      <div>
        <h2>当前求和为：{this.props.count}</h2>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>为奇数则加</button>
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    );
  }
}

export default connect(
  //mapStateToProps87
  (state) => ({ count: state }),

  //mapDispatchToProps的一般写法
  /* dispatch=>({
    jia: (number) => {
      dispatch(createIncrementAction(number));
    },
    jian: (number) => {
      dispatch(createDecrementAction(number));
    },
    jiaAsync: (number, time) => {
      dispatch(createIncrementAsyncAction(number, time));
    },
  }) */

  //mapDispatchToProps的简写
  {
    jia: createIncrementAction,
    jian: createDecrementAction,
    jiaAsync: createIncrementAsyncAction,
  }
)(Count);
