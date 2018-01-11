import React from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter,Switch,HashRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import MediaQuery from 'react-responsive';
import MobileIndex from './components/mobile_index';
import PCNewsDetails from './components/pc_news_details';
import MobileNewsDetails from './components/mobile_news_details';
import PCUserCenter from './components/pc_usercenter';
import MobileUserCenter from './components/mobile_usercenter';

export default class Root extends React.Component{
  render(){
    return (
    <div>
      <MediaQuery query="(min-device-width:1224px)">
        <HashRouter>
          <Switch>
            <Route path="/" exact  component={PCIndex}></Route>
            <Route path="/details/:uniquekey" exact  component={PCNewsDetails}></Route>
            <Route path="/usercenter" exact  component={PCUserCenter}></Route>
          </Switch>
        </HashRouter>
      </MediaQuery>
      <MediaQuery query="(max-device-width:1224px)">
        <HashRouter>
          <Switch>
            <Route path="/" exact  component={MobileIndex}></Route>
            <Route path="/details/:uniquekey" exact  component={MobileNewsDetails}></Route>
            <Route path="/usercenter" exact  component={MobileUserCenter}></Route>
          </Switch>
        </HashRouter>
      </MediaQuery>
    </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
