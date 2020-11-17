import React,{Component} from 'react';
import {Form,Button,Input,TextArea,Grid,Container,Message,Image,Header,Menu,Select,Dropdown,Icon} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import './project.css';
import {connect} from 'react-redux';
import {locus,auth,project} from '../actions';
import SideNavbar from './sidebar';
import Spinner from './loader';
let options=[];
const StatusOptions=[
	{key:'active',value:'Active',text:'Active'},
	{key:'finished',value:'Finished',text:'Finished'}
]



class Project extends Component{
	state={
		name:'',
		description:'',
		status:'',
		assets:[],
		loading:false
		
		
	}

	onSubmit=(e)=>{
		e.preventDefault();
		let formdata = new FormData();
		formdata.append("name",this.state.name)
		formdata.append("status",this.state.status)
		formdata.append("description",this.state.description)
		formdata.append("portfolio",this.state.assets)
		this.setState({loading:true},()=>{this.props.addProject(formdata)})

	}
	

	handleAssets=(e,{value})=>{
		this.setState({assets:value},()=>console.log(this.state.assets))

	}
	handleStatus=(e,{value})=>{
		this.setState({status:value},()=>console.log(this.state.status))
	}
	handleLogout=()=>{
		this.props.logout()
	}

	render(){
		const {value} =this.state;
		let user_id = localStorage.getItem('user_id');
		

	
		if(this.props.locus.length>0){
		
		const assets = this.props.locus.filter(location=>location.users_id==user_id)
		

		
		for(let i=0;i<assets.length;i++){
			options.push({
				key:assets[i].name,
				value:assets[i].name,
				text:assets[i].name
			})
		
	}
}


		
		return(	
			<div>
				<Menu style={{minHeight:'4.00em',margin:'0rem 0',backgroundColor:'#f7f6f6'}} fixed="top">
			    
				<Menu.Item>
			    <Image src={logo} size='small' style={{marginLeft:'5%'}}/>		
			    </Menu.Item>
			    <Menu.Item style={{marginLeft:'40%'}}><p style={{fontSize:'18px'}}>Project</p></Menu.Item>
				<Menu.Item
				 
				 position="right"
				 
				 >
				<Button  onClick={this.handleLogout}style={{borderRadius:5,backgroundColor:'#f7f6f6',float:'right'}}><Icon name="power"/></Button>

				 </Menu.Item>
			</Menu>
			<SideNavbar/>
			<br/><br/><br/><br/><br/>
			<Grid style={{ height:'90vh' }} verticalAlign='middle' padded centered>	
		<Grid.Row>	
		
		<Grid.Column width="6"></Grid.Column>	
		 <Grid.Column width="4">
		 	
		 	
		 	
		 	
		 	<br/>
			<Form>
				
				<Form.Field 
					 id="form-input-control-project"
					 control={Input}

					 label='Project Name'
					 
					 value={this.state.name}
					 onChange={e=>this.setState({name:e.target.value})}
					 />
				
				<Form.Group widths='equal'>
				<Form.Field 
					 id="form-input-control-project"
					 control={Input}
					 label='Description'
					 
					 
					 value={this.state.description}
					 onChange={e=>this.setState({description:e.target.value})}
					 />
				
				</Form.Group>
				<Form.Field
					id="form-input-control-status"
					control={Select}
					label="Status"
					options={StatusOptions}
					value={this.state.status}
					placeholder='Select Project Status'
					onChange={this.handleStatus}

				/>	
				<label>Portfolio</label>
				<Dropdown  placeholder="Assets" fluid   selection options={options} value={value} onChange={this.handleAssets}/>	
				
			    <br/>
			    <br/>

				{(this.state.loading && this.props.errors.error==undefined)?<Button style={{backgroundColor:'#015edc',marginLeft:'45%'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#015edc',marginLeft:'45%'}} onClick={this.onSubmit} primary>Submit</Button>}
			</Form>
			
		</Grid.Column>
				<Grid.Column width="6"></Grid.Column>	

		</Grid.Row>
		</Grid>
			</div>)
	}
}

const mapStateToProps = state =>{
	return {
		errors:state.project.errors,
		locus:state.locus.locus
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		getLocations:()=>{
			dispatch(locus.getLocations());
		},
		logout:()=>{
			dispatch(auth.logout())
		},
		addProject:(formdata)=>{
			dispatch(project.addProject(formdata))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Project);