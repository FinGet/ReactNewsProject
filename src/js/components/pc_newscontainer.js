import React from 'react';
import { Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
  constructor(){
    super();
  };
  render() {
    // 轮播图设置
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    }
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                  <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                  <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                  <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                </Carousel>
              </div>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}