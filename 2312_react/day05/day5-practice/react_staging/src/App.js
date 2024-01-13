import React, { Component } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Radio } from "antd";

export default class App extends Component {
  state = {
    size: "large",
  };
  render() {
    const { size } = this.state;
    return (
      <div>
        App...
        <button>点我</button>
        <Flex gap="small" wrap="wrap">
          <Button type="primary">点我</Button>
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={size}
          >
            Download
          </Button>
        </Flex>
      </div>
    );
  }
}
