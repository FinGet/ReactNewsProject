import React from 'react';
import {Card} from 'antd';
import {Route,BrowserRouter,Switch,Link,HashRouter} from 'react-router-dom';

export default class PCNewsBlock extends React.Component{
  constructor(){
    super();
    this.state = {
      news: ''
    };
  };
  componentWillMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
      + this.props.type
      + "&count="
      + this.props.count, myFetchOptions).then(
        response => response.json()
      ).then(
        json => this.setState({news: json})
      );
  }
  render() {
    const {news} = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => (
        <li key={index}>
          <HashRouter>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
              {newsItem.title}
            </Link>
          </HashRouter>
        </li>
      ))
      : '没有加载到任何新闻';
    return (
      <div class="topNewsList">
        <Card>
          <ul>
            {newsList}
          </ul>
        </Card>
      </div>
    );
  };
}