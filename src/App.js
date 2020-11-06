import React,{Component} from 'react';
import {withRouter,Router,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Register from './components/register';
import Login from './components/login';
import Location from './components/location';
import Home from './components/home';
import store from './store';
import { loadReCaptcha } from 'react-recaptcha-google'; 
import Project  from './components/project';
import Dashboard from './components/dashboard';
import Asset from './components/assets';
import PrivateRoute from './private-route';
import {history} from './_helpers/history';

class RootContainerComponent extends Component{

 




  render(){
    return(
      
      <Router  history={history} forceRefresh={true}>
        <Switch>
          
            <Route exact path="/" component={Home}/>
          
            <Route  path="/login" component={Login}/>
            <Route  path="/register" component={Register}/>
            <Route path="/location" component={Location}/>
            <Route  path="/project" component={Project}/>
            <PrivateRoute  path="/dashboard" component={Dashboard}/>
            <PrivateRoute  path="/myassets" component={Asset}/>
            
        </Switch>
      </Router>
      
      )
  }
}

let RootContainer=RootContainerComponent

class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <RootContainer/>
      </Provider>
    )
  }
}

export default  withRouter(App);
