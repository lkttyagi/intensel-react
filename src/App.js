import React,{Component} from 'react';
import {Router,Route,Switch} from 'react-router-dom';
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
import  {withRouter} from 'react-router';
import {history} from './_helpers/history';

class App extends Component{

 




  render(){
    return(
      <Provider store={store}>
      <Router  history={history}>
        <Switch>
          
            
            <Route  path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/location" component={Location}/>
            <Route exact path="/project" component={Project}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/myassets" component={Asset}/>
            <Route exact path="/" component={Home}/>
          
        </Switch>
      </Router>
      </Provider>
      )
  }
}

export default App;
