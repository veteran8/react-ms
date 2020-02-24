import React, { Component } from "react";
import { Card, List, Avatar, Button, Badge } from "antd";
import { connect } from "react-redux";

class Notifications extends Component {
  render() {
    console.log(this.props, 999);
    return (
      <Card
        title="通知中心"
        bordered={false}
        extra={<Button>全部标记为已读</Button>}
      >
        <List
          itemLayout="horizontal"
          dataSource={this.props.list}
          renderItem={item => (
            <List.Item extra={<Button>标记为已读</Button>}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Badge dot>{item.title}</Badge>}
                description={item.desc}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
const mapToState = state => {
  console.log(state, 111);
  return {
    list: state.notifications.list
  };
};

export default connect(mapToState)(Notifications);
