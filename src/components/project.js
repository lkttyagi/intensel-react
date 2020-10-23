import React,{Component} from 'react';
import {Form,Button,Input,TextArea,Grid,Container,Message,Image,Header,Menu,Select} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import './project.css';

const StatusOptions=[
	{key:'active',value:'active',text:'Active'},
	{key:'finished',value:'finished',text:'Finished'}
]

class Project extends Component{
	state={
		name:'',
		description:'',
		status:''
	}
	render(){
		return(	
			<div>
				<Menu style={{minHeight:'4.35em',margin:'0rem 0'}}>
				<Menu.Item>
			    <Image src={logo} size='small' style={{marginLeft:'30%'}}/>		
			    </Menu.Item>
				<Menu.Item
				 name="logout"
				 position="right"
				 />
			</Menu>
			<Grid style={{ height:'90vh' }} verticalAlign='middle' padded centered>	
		<Grid.Row>	
		
		<Grid.Column width="6"></Grid.Column>	
		 <Grid.Column width="4">
		 	
		 	<Header as='h2' textAlign='center'>Welcome to Intensel</Header>
		 	
		 	
		 	<br/>
			<Form>
				
				<Form.Field 
					 id="form-input-control-name"
					 control={Input}
					 label='Project Name'
					 
					 value={this.state.name}
					 onChange={e=>this.setState({name:e.target.value})}
					 />
				
				<Form.Group widths='equal'>
				<Form.Field 
					 id="form-input-control-description"
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
					onChange={e=>this.setState({status:e.target.value})}

				/>
				<br/>
				
			    

				<Button style={{backgroundColor:'#015edc', marginLeft:'35%'}} onClick={this.onSubmit} primary>Submit</Button>
			</Form>
			
		</Grid.Column>
				<Grid.Column width="6"></Grid.Column>	

		</Grid.Row>
		</Grid>
			</div>)
	}
}
export default Project;