import React, { Component, createRef } from "react";
import { Card, Button, Form, Input, DatePicker, message, Spin } from "antd";
import moment from "moment";
import E from "wangeditor";
import "./Edit.less";
import { getArtcileById, saveArticle } from "../../request";

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};

class Edit extends Component {
  constructor() {
    super();
    this.editorRef = createRef();
    this.state = {
      isLoading: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          isLoading: true
        });
        const data = Object.assign({}, values, {
          createAt: values.createAt.valueOf()
        });
        saveArticle(this.props.match.params.id, data).then(res => {
          this.setState({
            isLoading: false
          });
          message.success(res.data.msg);
        });
      }
    });
  };
  initEditor = () => {
    this.editor = new E(this.editorRef.current);
    this.editor.customConfig.onchange = html => {
      this.props.form.setFieldsValue({
        content: html
      });
    };

    this.editor.create();
  };
  getData = () => {
    getArtcileById(this.props.match.params.id).then(res => {
      this.setState({
        isLoading: false
      });
      let data = res.data;
      this.props.form.setFieldsValue({
        title: data.title,
        author: data.author,
        amount: data.amount,
        content: data.content,
        createAt: moment(data.createAt)
      });
      this.editor.txt.html(data.content);
    });
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.initEditor();
    this.getData();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="编辑文章" bordered={false} extra={<Button>取消</Button>}>
          <Spin spinning={this.state.isLoading}>
            <Form
              {...formItemLayout}
              onSubmit={this.handleSubmit}
              className="login-form"
            >
              <Form.Item label="标题">
                {getFieldDecorator("title", {
                  initialValue: "这是标题",
                  rules: [
                    { required: true, message: "title是必填的" },
                    { min: 4, message: "必须大于4位" },
                    { max: 20, message: "必须小于20位" }
                  ]
                })(<Input placeholder="标题" />)}
              </Form.Item>
              <Form.Item label="作者">
                {getFieldDecorator("author", {
                  rules: [
                    { required: true, message: "作者是必填的" },
                    { min: 4, message: "必须大于4位" },
                    { max: 20, message: "必须小于20位" }
                  ]
                })(<Input placeholder="作者" />)}
              </Form.Item>
              <Form.Item label="阅读量">
                {getFieldDecorator("amount", {
                  rules: [
                    { required: true, message: "阅读量是必填的" },
                    { min: 4, message: "必须大于4位" },
                    { max: 20, message: "必须小于20位" }
                  ]
                })(<Input placeholder="0" />)}
              </Form.Item>
              <Form.Item label="创建时间">
                {getFieldDecorator("createAt", {
                  rules: [{ required: true, message: "创建时间是必填的" }]
                })(<DatePicker showTime placeholder="修改时间" />)}
              </Form.Item>
              <Form.Item label="内容">
                {getFieldDecorator("content", {
                  rules: [{ required: true, message: "内容是必填的" }]
                })(<div className="editor" ref={this.editorRef}></div>)}
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 4
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Card>
      </div>
    );
  }
}
export default Form.create()(Edit);
