import React, { Component } from "react";
import { Card, List, Avatar, Button, Badge, Spin } from "antd";
import { connect } from "react-redux";

import { makeMessageAsRead, makeAllAsRead } from "../../actions";

class Notifications extends Component {
  render() {
    return (
      <Spin spinning={this.props.isLoading}>
        <Card
          title="通知中心"
          bordered={false}
          extra={
            <Button onClick={this.props.makeAllAsRead}>全部标记为已读</Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={this.props.list}
            renderItem={item => (
              <List.Item
                extra={
                  item.hasRead ? null : (
                    <Button
                      onClick={this.props.makeMessageAsRead.bind(this, item.id)}
                    >
                      标记为已读
                    </Button>
                  )
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </Card>
      </Spin>
    );
  }
}
const mapToState = state => {
  console.log(state, 111);
  return {
    list: state.notifications.list,
    isLoading: state.notifications.isLoading
  };
};

export default connect(mapToState, { makeMessageAsRead, makeAllAsRead })(
  Notifications
);
