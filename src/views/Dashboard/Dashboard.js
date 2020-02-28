import React, { Component, createRef } from "react";
import { Card, Row, Col } from "antd";
import echarts from "echarts";
import { getArtcileAmount } from "../../request";
import "./Dashboard.less";
export default class Dashboard extends Component {
  constructor() {
    super();
    this.articleAmount = createRef();
  }
  initArticleChart = () => {
    getArtcileAmount().then(res => {
      let list = res.data.amount;
      this.articleChart = echarts.init(this.articleAmount.current);
      let option = {
        xAxis: {
          type: "category",
          data: list.map(item => {
            return item.month;
          })
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: list.map(item => {
              return item.value;
            }),
            type: "line",
            areaStyle: {}
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.articleChart.setOption(option);
    });
  };
  componentDidMount() {
    this.initArticleChart();
  }
  render() {
    return (
      <div>
        <Card title="概览" bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <div className="qf-gutter-box">9999</div>
            </Col>
            <Col span={6}>
              <div className="qf-gutter-box">9999</div>
            </Col>
            <Col span={6}>
              <div className="qf-gutter-box">9999</div>
            </Col>
            <Col span={6}>
              <div className="qf-gutter-box">9999</div>
            </Col>
          </Row>
        </Card>
        <Card title="文章浏览量" bordered={false}>
          <div style={{ height: "400px" }} ref={this.articleAmount} />
        </Card>
      </div>
    );
  }
}
