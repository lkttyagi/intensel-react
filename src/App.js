import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Register from './components/register';
import Login from './components/login';
import Location from './components/location';
import Home from './components/home';
import store from './store';
import { loadReCaptcha } from 'react-recaptcha-google'; 




class App extends Component{

 




  render(){
    return(
      <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/location" component={Location}/>
          </Switch>
        </div>
      </BrowserRouter>
      </Provider>
      )
  }
}

export default App;
