import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar, Badge } from "antd";
import { withRouter } from "react-router-dom";
import "./Frame.less";
import { connect } from "react-redux";

const { Header, Content, Sider } = Layout;

class Frame extends Component {
  //点击左边菜单栏
  onMenuClick = ({ keyPath }) => {
    this.props.history.push({
      pathname: keyPath[0]
    });
  };
  //点击右上角menu
  clickMenuItem = ({ key }) => {
    console.log(key);
    this.props.history.push(key);
  };

  menu = (
    <Menu onClick={this.clickMenuItem}>
      <Menu.Item key="/admin/notifications">个人中心</Menu.Item>
      <Menu.Item key="/admin/settings">个人设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="/login">退出登录</Menu.Item>
    </Menu>
  );
  render() {
    console.log(this.props, 8888);
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Header className="header qr-header">
          <div className="logo" />
          <Dropdown overlay={this.menu} trigger={["click"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <span>欢迎您,veteran</span>
              <Badge count={5} offset={[0, -10]}></Badge>
            </div>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={this.props.location.pathname}
              selectedKeys={this.props.location.pathname}
              onClick={this.onMenuClick}
              style={{ height: "100%", borderRight: 0 }}
            >
              {this.props.menus.map(route => {
                return (
                  <Menu.Item key={route.pathname}>
                    <Icon type={route.icon} />
                    {route.title}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
const mapToState = state => {
  return {
    messageAmounts: state.notifications.list.filter(item => {
      return item.hasRead === false;
    }).length
  };
};

export default connect(mapToState)(withRouter(Frame));
