import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { withRouter } from "react-router-dom";

const { Header, Content, Sider } = Layout;

class Frame extends Component {
  onMenuClick = ({ keyPath }) => {
    this.props.history.push({
      pathname: keyPath[0]
    });
  };

  render() {
    console.log(this.props, 1111);
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Header className="header">
          <div className="logo" />
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
export default withRouter(Frame);
