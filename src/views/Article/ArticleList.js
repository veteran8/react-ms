import React, { Component } from "react";
import { Card, Button, Table, Tag } from "antd";
import moment from "moment";
import { getArtciles } from "../../request";

const ButtonGroup = Button.Group;

const titleDisplayMap = {
  id: "id",
  title: "标题",
  author: "作者",
  createAt: "创建日期",
  amount: "阅读量"
};
export default class ArticleList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      columns: [],
      isLoading: false,
      offset: 0,
      limited: 0
    };
  }
  createColumns = columnKeys => {
    const columns = columnKeys.map(item => {
      if (item === "amount") {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const { amount } = record;
            return (
              <Tag color={amount > 200 ? "green" : "red"}>{record.amount}</Tag>
            );
          }
        };
      }
      if (item === "createAt") {
        return {
          title: titleDisplayMap[item],
          key: item,
          render: (text, record) => {
            const { createAt } = record;
            return moment(createAt).format("YYYY年MM月DD日");
          }
        };
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item
      };
    });
    columns.push({
      title: "操作",
      key: "action",
      render: () => {
        return (
          <ButtonGroup>
            <Button type="danger">取消</Button>
            <Button type="primary">ok</Button>
          </ButtonGroup>
        );
      }
    });
    return columns;
  };

  getData = () => {
    this.setState({
      isLoading: true
    });
    const { offset, limited } = this.state;
    getArtciles(offset, limited)
      .then(res => {
        const columnKeys = Object.keys(res.data.list[0]);
        const columns = this.createColumns(columnKeys);
        console.log("res", res);
        this.setState({
          total: res.data.total,
          columns,
          dataSource: res.data.list
        });
      })
      .catch(err => {})
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };
  pageChageHandler = (page, pageSize) => {
    console.log(page, pageSize, 9999);
    this.setState(
      {
        offset: pageSize * (page - 1),
        limited: pageSize
      },
      () => {
        this.getData(this.state.offset, this.limited);
      }
    );
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div>
        <Card title="文章列表" extra={<Button>转为Excel</Button>}>
          <Table
            dataSource={this.state.dataSource}
            loading={this.state.isLoading}
            columns={this.state.columns}
            rowKey={record => {
              return record.id;
            }}
            pagination={{
              pageSize: 10,
              total: this.state.total,
              onChange: this.pageChageHandler
            }}
          />
        </Card>
      </div>
    );
  }
}
