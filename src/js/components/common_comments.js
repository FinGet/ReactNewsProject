import React from 'react';
import {Row, Col,Card,notification} from 'antd';
import {Form, Input, Button, CheckBox} from 'antd';
const FormItem = Form.Item;
class CommonComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: ''
    };
  }
    componentDidMount() {
    console.log(this.props.uniquekey)
      var myFetchOptions = {
        method: 'GET'
      };
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
        + this.props.uniquekey, myFetchOptions).then(
          response => response.json()).then(json => {
        this.setState({comments: json});
      })
      console.log(this.state.comments)
    };
    handleSubmit(e) {
      e.preventDefault();
      var myFetchOptions = {
        method: 'GET'
      };
      var formdata = this.props.form.getFieldsValue();
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="
        + localStorage.userid + "&uniquekey="
        + this.props.uniquekey + "&commnet="
        + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
        this.componentDidMount();
      })
    };
    addUserCollection(){
      var myFetchOptions = {
        method: 'GET'
      };
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="
        +localStorage.userid+"&uniquekey="
        +this.props.uniquekey,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
          //收藏成功以后进行一下全局的提醒
          notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
        });
    };
    render()
    {
      let {getFieldProps} = this.props.form;
      const {comments} = this.state;
      console.log(comments)
      const commentList = comments.length?
        comments.map((comment,index)=>(
          <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
            <p>{comment.Comments}</p>
          </Card>
        ))
        :
        '没有加载到任何评论';
      return (
        <div class="comment">
          <Row>
            <Col span={24}>
              {commentList}
              <Form onSubmit ={this.handleSubmit.bind(this)}>
                <FormItem label="您的评论">
                  <Input type="textarea" placeholder="随便写" {...getFieldProps('remark',{initialValue: ''})}/>
                </FormItem>
                <Button type="primary" htmlType="submit">提交评论</Button>
                &nbsp;&nbsp;
                <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏文章</Button>
              </Form>
            </Col>
          </Row>
        </div>
      );
    };
  }

export default CommonComments = Form.create({})(CommonComments);
