import React from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter,Switch,HashRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import MediaQuery from 'react-responsive';
import MobileIndex from './components/mobile_index';
import PCNewsDetails from './components/pc_news_details';

export default class Root extends React.Component{
  render(){
    return (
    <div>
      <MediaQuery query="(min-device-width:1224px)">
        <HashRouter>
          <Switch>
            <Route path="/" exact  component={PCIndex}></Route>
            <Route path="/details/:uniquekey" exact  component={PCNewsDetails}></Route>
          </Switch>
        </HashRouter>
      </MediaQuery>
      <MediaQuery query="(max-device-width:1224px)">
        <MobileIndex/>
      </MediaQuery>
    </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
