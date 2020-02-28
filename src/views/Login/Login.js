import React from "react";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import "./Login.less";
import { login } from "../../actions/user";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const wrapperCol = {};

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.props.isLogin ? (
      <Redirect to="/admin" />
    ) : (
      <Card title="admin登录" className="xyc-login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item wrapperCol={wrapperCol}>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "用户名必须" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                disabled={this.props.isLoading}
              />
            )}
          </Form.Item>
          <Form.Item wrapperCol={wrapperCol}>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "密码必须" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                disabled={this.props.isLoading}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox disabled={this.props.isLoading}>记住我</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.props.isLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
const mapToState = state => {
  return {
    isLogin: state.user.isLogin,
    isLoading: state.user.isLoading
  };
};

export default connect(mapToState, { login })(WrappedNormalLoginForm);
