import React, { Component } from "react";
import { Card, Upload } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { changeAvatar } from "../../actions/user";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      avatar: ""
    };
  }
  handleUpload = ({ file }) => {
    const data = new FormData();
    data.append(
      "Token",
      "b781ed37bb69846659152e8ebae6a25d575f8347:mkY-Wp0DIHdDVVWfskTdJSjsJII=:eyJkZWFkbGluZSI6MTU4Mjk0MzQ0NywiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzExMTk4IiwiYWlkIjoiMTY2NjkxMSIsImZyb20iOiJmaWxlIn0="
    );
    data.append("file", file);
    axios.post("http://up.imgapi.com/", data).then(uploadRes => {
      console.log(uploadRes, 999999);
      if (uploadRes.status === 200) {
        this.setState({ avatar: uploadRes.data.linkurl });
        let imgUrl = uploadRes.data.linkurl;
        this.props.changeAvatar(imgUrl);
      }
    });
  };
  render() {
    return (
      <Card title="上传图片">
        <Upload showUploadList={false} customRequest={this.handleUpload}>
          <span
            style={{
              width: 80,
              height: 80,
              display: "block",
              backgroundColor: "#ddd"
            }}
          >
            {this.state.avatar ? (
              <img
                style={{
                  width: 80,
                  height: 80,
                  display: "block"
                }}
                src={this.state.avatar}
                alt="上传图像"
              />
            ) : (
              "上传图像"
            )}
          </span>
        </Upload>
      </Card>
    );
  }
}
const mapToState = state => {
  return {};
};

export default connect(mapToState, { changeAvatar })(Profile);
