import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import PCIndex from './components/pc_index'
import PCNewsDetails from './components/pc_news_details'
import MobileNewsDetails from './components/mobile_news_details'
import MobileIndex from './components/mobile_index'
import PCUserCenter from './components/pc_usercenter'
import MobileUserCenter from './components/mobile_usercenter'
import MediaQuery from 'react-responsive'

export default class Root extends React.Component{
    render(){
        return(
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}/>
                        <Route path="/details/:uniquekey" component={PCNewsDetails}/>
                        <Route path="/usercenter" component={PCUserCenter}/>
                    </Router>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileIndex}/>
                        <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
                        <Route path="/usercenter" component={MobileUserCenter}/>
                    </Router>
                </MediaQuery>
            </div>
        )
    }
}

ReactDOM.render(
    <Root/>,
    document.getElementById("mainContainer")
)