import React,{Component} from 'react';
import { ReCaptcha } from 'react-recaptcha-google'; 
import {Form,Button,Input,TextArea,Grid,Container,Message,Image,Header} from 'semantic-ui-react';
import './register.css';
import signup from '../assets/signup.png';
import logo from '../assets/logo.png';
import {connect} from 'react-redux';
import {auth} from '../actions';
import PropTypes from 'prop-types';



function ValidationMessage(props) {
  if (!props.valid) {
    return(
      <div className='error-msg'>{props.message}</div>
    )
  }
  return null;
}





class Register extends Component{

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


	state={
		first_name:'',
		last_name:'',
		username:'',
		email:'',
		password:'',
		confirm_password:'',
		company_code:'',
		passwordConfirmValid:false,
		formValid:false,
		errorMsg:{}
	};

	validateForm=()=>{
		const {passwordConfirmValid} = this.state
		this.setState({
			formValid:passwordConfirmValid
		})
	}

    updatePasswordConfirm = (confirm_password) => {
   	
    this.setState({confirm_password}, this.validatePasswordConfirm)
    }

    validatePasswordConfirm = () => {
    const {confirm_password, password} = this.state;
    let passwordConfirmValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (password !== confirm_password) {
      passwordConfirmValid = false;
      errorMsg.confirm_password = 'Passwords do not match'
      
    }

    this.setState({passwordConfirmValid, errorMsg}, this.validateForm);
  }
	onSubmit = e =>{
		e.preventDefault();
		this.props.register(this.state.first_name,this.state.last_name,this.state.username,this.state.email,this.state.password,this.state.confirm_password,this.state.company_code)
	}
	
	render(){
		return(
		<Grid style={{ height:'100vh' }} verticalAlign='middle' padded>	
		<Grid.Row>	
		
		<Grid.Column width={8}>
			<Image src={signup}/>
		</Grid.Column> 	
		 <Grid.Column width={8}>
		 	<Image src={logo} size='medium' centered/>
		 	<Header as='h2' textAlign='center'>Welcome to Intensel</Header>
		 	<h5>Please fill in details to create an account</h5>
		 	<br/>
			<Form>
				<Form.Group widths='equal'>
					<Form.Field 
					 id="form-input-control-first-name"
					 control={Input}
					 label='First Name'
					 placeholder='First Name'
					 value={this.state.first_name}
					 onChange={e=>this.setState({first_name:e.target.value})}
					 />
					<Form.Field 
					 id="form-input-control-last-name"
					 control={Input}
					 label='Last Name'
					 placeholder='Last Name'
					 value={this.state.last_name}
					 onChange={e=>this.setState({last_name:e.target.value})}
					 />
				</Form.Group>
				<Form.Field 
					 id="form-input-control-username"
					 control={Input}
					 label='Username'
					 placeholder='Username'
					 value={this.state.username}
					 onChange={e=>this.setState({username:e.target.value})}
					 />
				<Form.Field 
					 id="form-input-control-email"
					 control={Input}
					 label='Email'
					 placeholder='Email'
					 value={this.state.email}
					 onChange={e=>this.setState({email:e.target.value})}
					 
					 />
				< ValidationMessage valid={this.state.passwordConfirmValid} message={this.state.errorMsg.confirm_password} />
				<Form.Group widths='equal'>
				<Form.Field 
					 id="form-input-control-password"
					 control={Input}
					 label='Password'
					 type="password"
					 placeholder='Password'
					 value={this.state.password}
					 onChange={e=>this.setState({password:e.target.value})}
					 />
				<Form.Field 
					 id="form-input-control-confirm-password"
					 control={Input}
					 label='Confirm Password'
					 type="password"
					 placeholder='Confirm Password'
					 value={this.state.confirm_password}
					 onChange={e=>this.updatePasswordConfirm(e.target.value)}
					 />
				
				</Form.Group>
				<Form.Field 
					 id="form-input-control-company"
					 control={Input}
					 label='Company Code'
					 placeholder='Company Code'
					 value={this.state.company_code}
					 onChange={(e)=>this.setState({company_code:e.target.value})}
					 />
				<ReCaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            render="explicit"
            sitekey="your_site_key"
            onloadCallback={this.onLoadRecaptcha}
            
        />

				<Button disabled={!this.state.formValid} onClick={this.onSubmit} primary>Register</Button>
			</Form>

			<br/>
				Already have an Account ? <a href="/login">Login</a>
			
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
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (first_name,last_name,username, email,password ,confirm_password,company_code) => dispatch(auth.register(first_name,last_name,username,email, password ,confirm_password,company_code)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);