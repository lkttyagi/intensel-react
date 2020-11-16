import React,{Component} from 'react';
import { ReCaptcha } from 'react-recaptcha-google'; 
import {Form,Button,Input,TextArea,Grid,Container,Message,Image,Header} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import login from '../assets/login.jpg';
import logo from '../assets/logo.png';
import {connect} from 'react-redux';
import {auth} from '../actions';

import Spinner from './loader';

class Login extends Component{
	state={
		username:'',
		password:'',
		company_code:'',
		loading:false
	}

		componentDidMount(){
	if(this.captchaDemo){
		this.captchaDemo.reset();
		
	}
}
onLoadRecaptcha(){
	if(this.captchaDemo){
		this.captchaDemo.reset();
		
	}
}

	onSubmit = e =>{
		e.preventDefault();
		let formdata = new FormData();
		formdata.append("username",this.state.username);
		formdata.append("password",this.state.password);
		formdata.append("company_code",this.state.company_code);
		this.setState({loading:true},()=>{this.props.login(formdata)});

		
		
		
	
	}	
	
	render(){
		
				if(auth.isUserAuthenticated()){
					return <Redirect to="/location"/>
				}
		console.log(this.props.errors)
		return(
		<Grid style={{ height:'100vh' }} verticalAlign='middle' padded>	
		<Grid.Row>	
		
		<Grid.Column width={8}>
			<Image src={login}/>
		</Grid.Column> 	
		 <Grid.Column width={8}>
		 	<Image src={logo} size='medium' centered/>
		 	<Header as='h2' textAlign='center'>Welcome to Intensel</Header>
		 	<h5>Please fill in details to Login</h5>
		 	{ (this.props.errors.length>0) ?  <div className="row" style={{textAlign:"center"}}>
                  <span style={{color:'red'}}>{this.props.errors[0].message}</span>
                </div> : null}
		 	<br/>
			<Form>
				
				<Form.Field 
					 id="form-input-control-username"
					 control={Input}
					 label='Username'
					 placeholder='Username'
					 value={this.state.username}
					 onChange={e=>this.setState({username:e.target.value})}
					 />
				
				<Form.Group widths='equal'>
				<Form.Field 
					 id="form-input-control-password"
					 control={Input}
					 label='Password'
					 placeholder='Password'
					 type="password"
					 value={this.state.password}
					 onChange={e=>this.setState({password:e.target.value})}
					 />
				
				</Form.Group>
				<Form.Field 
					 id="form-input-control-company"
					 control={Input}
					 label='Company Code'
					 placeholder='Company Code'
					 value={this.state.company_code}
					 onChange={e=>this.setState({company_code:e.target.value})}
					 />
					<ReCaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            render="explicit"
            sitekey="your_site_key"
            onloadCallback={this.onLoadRecaptcha}
            
        />		
        		{(this.state.loading && this.props.errors.length==0)?<Button style={{backgroundColor:'#015edc'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#015edc'}} onClick={this.onSubmit} primary>Login</Button>}
			</Form>
			<br/>
				Don't have an Account ? <a href="/register">Create an Account</a>
				<a style={{float:'right'}} href="#">Forgot password ?</a>
		</Grid.Column>
		
		</Grid.Row>
		</Grid>
			)
	}
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
     errors = Object.keys(state.auth.errors).map(field => {
      return {field, message: state.auth.errors[field]};
    });
  }

  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
    user:state.auth.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: (formdata) => {
      return dispatch(auth.login(formdata));
    }
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);