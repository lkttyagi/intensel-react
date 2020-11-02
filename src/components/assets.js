import React,{Component} from 'react';
import {Form,Button,Input,TextArea,Grid,Container,Message,Image,Header,Menu,Select,Dropdown,Table,Label,Icon,Modal} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import './project.css';
import {connect} from 'react-redux';
import {location} from '../actions';
import SideNavbar from './sidebar';
import {asset} from '../actions';
import { withRouter } from 'react-router-dom';



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
		fetchAssets:[]
	}

	componentDidMount(){
		this.props.getLocations();
	}
	componentDidUpdate(prevProps,prevState){
      if(prevProps.location !== this.props.location){
        this.setState({fetchAssets:this.props.location})
      }
    }
	handleAssets=(e,{value})=>{
		this.setState({assets:value},()=>console.log(this.state.assets))

	}
	handleStatus=(e,{value})=>{
		this.setState({status:value},()=>console.log(this.state.status))
	}
	handleOpen =() => this.setState({modalOpen:true})
	handleClose =() => this.setState({modalOpen:false})


	onSubmit = e =>{
		e.preventDefault();
		let formdata = new FormData();
		formdata.append("name",this.state.name);
		formdata.append("description",this.state.description);
		formdata.append("status",this.state.status);
		formdata.append("assets",this.state.assets)
		console.log(formdata.get('status'),formdata.get('name'),formdata.get('description'),formdata.get('assets'))

		this.props.addAssets(formdata)
	}	
	

	render(){
		
		const {value} =this.state;
		let user_id = localStorage.getItem('user_id')
		console.log("locations",this.state.fetchAssets);
		const assets = this.state.fetchAssets.filter(location=>location.users_id==user_id)
		var Allassets="";
		if(this.state.fetchAssets){
		Allassets=assets.map((asset,index)=>(
	<Table.Row key={index}>
        <Table.Cell>
          {asset.name}
        </Table.Cell>
        <Table.Cell>{asset.latitude}</Table.Cell>
        <Table.Cell>{asset.longitude}</Table.Cell>
      </Table.Row>
      ))}
		

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
					value={value}
					placeholder='Select Project Status'
					onChange={this.handleStatus}

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
		location:state.location.location,
		asset:state.asset
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		getLocations:()=>{
			dispatch(location.getLocations());
		},
		addAssets:(formdata)=>{
			dispatch(asset.addAssets(formdata));
		}
	}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Asset));