import React from 'react';
import { Row, Col, Menu, Icon, Modal, Button, Tabs, Form, Input, Checkbox, message } from 'antd';

const FormItem = Form.Item;
// const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
// const MenuItemGroup = Menu.ItemGroup;
import {Router, Route, Link, browserHistory, BrowserRouter} from 'react-router-dom';

class MobileHeader extends React.Component{
  constructor(){
    super();
    this.state = {
      current: 'top', // 当前选定的tab
      modalVisible: false, // 模态框显示/隐藏
      action: 'login', // 登录/注册
      hasLogined: false, // 是否已经登录
      userNickName: '', // 昵称
      userid : 0
    }
  };
  /**
   * 模态框显示隐藏
   */
  setModalVisible(value)
  {
    this.setState({modalVisible: value});
  };

  /**
   * form表单提交
   * @param e
   */
  handleSubmit(e)
  {
    //页面开始向 API 进行提交数据
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    // 获取表单中的值
    var formData = this.props.form.getFieldsValue();
    console.log(this.props.form);
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="
      +formData.r_userName+"&r_password="
      +formData.r_password+"&r_confirmPassword="
      +formData.r_confirmPassword,myFetchOptions).
    then(response=>response.json()).then(json=>{
      this.setState({userNickName:json.NickUserName,userid:json.UserId});
    });
    if (this.state.action=="login") {
      this.setState({hasLogined:true});
    }
    message.success("请求成功！");
    this.setModalVisible(false);
  };
  login(){
    this.setModalVisible(true);
  };
  callback(key) {
    if (key == 1) {
      this.setState({action: 'login'});
    } else if (key == 2) {
      this.setState({action: 'register'});
    }
  };
  render() {
    let {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined ?
      <BrowserRouter>
        <Link to="/">
          <Icon type="logout" />
        </Link>
      </BrowserRouter>
      :
      <Icon type="setting" onClick={this.login.bind(this)}/>
    return(
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>
        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText = "关闭">
          <Tabs type="card" onChange={this.callback.bind(this)}>
            <TabPane tab="登录" key="1">
              <Form mode="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  <Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form mode="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                </FormItem>
                <FormItem label="密码">
                  <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                </FormItem>
                <FormItem label="确认密码">
                  <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
                </FormItem>
                <Button type="primary" htmlType="submit" >注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MobileHeader = Form.create({})(MobileHeader);