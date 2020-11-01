import React,{Component} from 'react';
import {Form,Button,Input,TextArea,Grid,Container,Message,Image,Header,Menu,Select,Dropdown,Table,Label,Icon,Modal} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import './project.css';
import {connect} from 'react-redux';
import {location} from '../actions';
import SideNavbar from './sidebar';



const StatusOptions=[
	{key:'active',value:'active',text:'Active'},
	{key:'finished',value:'finished',text:'Finished'}
]



class Asset extends Component{
	state={
		name:'',
		description:'',
		status:'',
		assets:[],
		modalOpen:false,
	}
	componentDidMount(){
		this.props.getLocations();
	}
	handleAssets=(e,{value})=>{
		this.setState({assets:value},()=>console.log(this.state.assets))

	}
	handleOpen =() => this.setState({modalOpen:true})
	handleClose =() => this.setState({modalOpen:false})

	render(){
		const {value} =this.state;
		let user_id = localStorage.getItem('user_id')
		const assets = this.props.location.filter(location=>location.users_id==user_id)
		var Allassets="";
		if(this.props.location){
		Allassets=assets.map((asset,index)=>(
	<Table.Row key={index}>
        <Table.Cell>
          {asset.name}
        </Table.Cell>
        <Table.Cell>{asset.latitude}</Table.Cell>
        <Table.Cell>{asset.longitude}</Table.Cell>
      </Table.Row>
      ))}
		console.log(Allassets);

		let options=[];
		for(let i=0;i<assets.length;i++){
			options.push({
				key:assets[i].name+','+assets[i].latitude+','+assets[i].longitude,
				value:assets[i].name+','+assets[i].latitude+','+assets[i].longitude,
				text:assets[i].name+','+assets[i].latitude+','+assets[i].longitude
			})
	}
		
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
			<SideNavbar/>
			<br/>
			<Grid style={{ height:'90vh' }}  padded centered>	
		<Grid.Row>	
		<Grid.Column width="4"></Grid.Column>
		<Grid.Column width="12">
					<Header as="h2" style={{color:'#6a6952'}}> My Assets</Header>

			 <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Latitude</Table.HeaderCell>
        <Table.HeaderCell>Longitude</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {Allassets}
      
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
  <Button primary onClick={this.handleOpen}style={{borderRadius:5,backgroundColor:'#015edc',float:'right',marginTop:'30px',marginRight:'30px',marginBottom:'30px'}}>Create Group</Button>
  
</Grid.Column>
		</Grid.Row>
		</Grid>
		<Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            closeIcon
          >
            <Modal.Header>Create Group</Modal.Header>
            <Modal.Content scrolling>
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
				<label>Assets</label>
				<Dropdown  placeholder="Assets" fluid  multiple selection options={options} value={value} onChange={this.handleAssets}/>	
				
			    <br/>
			    <br/>

				<Button style={{backgroundColor:'#015edc', marginLeft:'45%'}} onClick={this.onSubmit} primary>Submit</Button>
			</Form>
            </Modal.Content>
          </Modal>
			</div>)
	}
}

const mapStateToProps = state =>{
	return {
		errors:state.location.errors,
		location:state.location.location
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		getLocations:()=>{
			dispatch(location.getLocations());
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Asset);