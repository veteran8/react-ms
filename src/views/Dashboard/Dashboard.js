import React, { Component, createRef } from "react";
import { Card, Row, Col } from "antd";
import echarts from "echarts";
import "./Dashboard.less";
export default class Dashboard extends Component {
  constructor() {
    super();
    this.articleAmount = createRef();
  }
  initArticleChart = () => {
    this.articleChart = echarts.init(this.articleAmount.current);
    let option = {
      xAxis: {
        type: "category",
        data: ["一月", "二月", "三月", "四月", "五月  ", "六月"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330],
          type: "line",
          areaStyle: {}
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    this.articleChart.setOption(option);
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
