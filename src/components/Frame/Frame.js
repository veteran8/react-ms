import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar, Badge } from "antd";
import { withRouter } from "react-router-dom";
import "./Frame.less";
import { connect } from "react-redux";

import { logout } from "../../actions/user";

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
    if (key === "/login") {
      this.props.logout();
    } else {
      this.props.history.push(key);
    }
  };

  logout = () => {};

  renderMenu = () => (
    <Menu onClick={this.clickMenuItem}>
      <Menu.Item key="/admin/notifications">
        <Badge dot={!!this.props.messageAmounts}>个人中心</Badge>
      </Menu.Item>
      <Menu.Item key="/admin/settings">个人设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="/login" onClick={this.logout}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  render() {
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Header className="header qr-header">
          <div className="logo" />
          <Dropdown overlay={this.renderMenu()} trigger={["click"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={this.props.avatar} />
              <span>欢迎您,veteran</span>
              <Badge
                count={this.props.messageAmounts}
                offset={[0, -10]}
              ></Badge>
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
    }).length,
    avatar: state.user.avatar
  };
};

export default connect(mapToState, { logout })(withRouter(Frame));
