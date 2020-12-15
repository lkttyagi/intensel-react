import React,{Component} from 'react';
import {Form,Button,Input,TextArea,Grid,Container,Message,Image,Header,Menu,Select,Dropdown,Icon,Table,Modal} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import './project.css';
import {connect} from 'react-redux';
import {locus,auth,project} from '../actions';
import SideNavbar from './sidebar';
import Spinner from './loader';
import CsvDownload from 'react-json-to-csv';

let options=[];
const StatusOptions=[
	{key:'active',value:'Active',text:'Active'},
	{key:'finished',value:'Finished',text:'Finished'}
]
const csv=[];
const othersOptions=[
	
	{key:'type',value:'type',text:'type'},
	{key:'Area',value:'Area',text:'Area'},
	{key:'Building_H',value:'Building_H',text:'Building_H'},
	{key:'SSL',value:'SSL',text:'SSL'},
	{key:'FLL',value:'FLL',text:'FLL'}
]
const variableOptions=[
	{key:'Storm Surge',value:'Storm Surge',text:'Storm Surge'},
	{key:'Flood',value:'Flood',text:'Flood'},
	{key:'Landslide',value:'Landslide',text:'Landslide'},
	{key:'Extreme heat',value:'Extreme heat',text:'Extreme heat'},
	{key:'Drought Index',value:'Drought Index',text:'Drought Index'},
	{key:'Drought Rainfall',value:'Drought Rainfall',text:'Drought Rainfall'},
	
]
const rcpOptions=[
	{key:'2.6',value:'2.6',text:'2.6'},
	{key:'4.5',value:'4.5',text:'4.5'},
	{key:'8.5',value:'8.5',text:'8.5'}
]
const yearOptions=[
	
	{key:'2030',value:'2030',text:'2030'},
	{key:'2050',value:'2050',text:'2050'}
]


class Project extends Component{
	state={
		name:'',
		description:'',
		status:'',
		assets:[],
		loading:false,
		activeItemName:'',
		modalOpen:false,
		variables:[],
		others:'',
		year:'',
		rcp:'',
		modalloading:false,
		lossmodalOpen:false
		
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
	handleChange=(value,key)=>{
		this.setState({[key]:value},()=>console.log("othres",this.state.others,this.state.variables));
	}
	handleSubmit=(e)=>{
		e.preventDefault();
		let formdata=new FormData();
		formdata.append('portfolio',this.state.activeItemName)
		formdata.append('variables',JSON.stringify(this.state.variables))
		formdata.append('others',JSON.stringify(this.state.others))
		formdata.append('year',JSON.stringify(this.state.year))
		formdata.append('rcp',JSON.stringify(this.state.rcp))
		
		
		
		this.setState({modalloading:true},()=>{this.props.getCSV(formdata)})
	}
	handleLossSubmit=(e)=>{
		e.preventDefault();
		let formdata= new FormData();
		formdata.append('portfolio',this.state.activeItemName)
		formdata.append('year',this.state.year)
		this.setState({modalloading:true},()=>{this.props.getLoss(formdata)})
	}

	handleAssets=(e,{value})=>{
		this.setState({assets:value},()=>console.log(this.state.assets))

	}
	handleStatus=(e,{status})=>{
		this.setState({status:status},()=>console.log(this.state.status))
	}
	handleLogout=()=>{
		this.props.logout()
	}
	handleOpen =(portfolio) => this.setState({modalOpen:true,
		activeItemName:portfolio},()=>console.log(this.state.activeItemName))
	handleClose =() => this.setState({modalOpen:false})

	handleLossModalOpen =(portfolio) => this.setState({lossmodalOpen:true,
		activeItemName:portfolio},()=>console.log(this.state.activeItemName))

	handleLossModalClose =()=>{
		this.setState({lossmodalOpen:false})
	}

	render(){
		const {value,others,variables,rcp,year,status} =this.state;
		let user_id = localStorage.getItem('user_id');
		

		
		if(this.props.locus.length>0){
		options=[];
		const assets = this.props.locus.filter(location=>location.users_id==user_id)
		
		console.log("locations",assets[0].assets)
		
		for(let i=0;i<assets.length;i++){
			options.push({
				key:assets[i].name,
				value:assets[i].name,
				text:assets[i].name
			})

		
	}
	console.log("options",options)
	if(this.props.csv.length===undefined){
		csv.push(this.props.csv.success)
		console.log("csv data",this.props.csv.success)
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
				<Button  onClick={this.handleLogout}style={{borderRadius:5,backgroundColor:'#f7f6f6',float:'right'}}><Icon name="power" size="big"/></Button>

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
				

				<label>Portfolio</label>
				<Dropdown  placeholder="Portfolio" fluid   selection options={options} value={value} onChange={this.handleAssets}/>	
				
				<label>Status</label>
				<Dropdown  placeholder="Status" fluid   selection options={StatusOptions} value={status} onChange={this.handleStatus}/>	
			    <br/>
			    <br/>

				{(this.state.loading && this.props.errors.error==undefined)?<Button style={{backgroundColor:'#015edc',marginLeft:'45%'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#015edc',marginLeft:'45%'}} onClick={this.onSubmit} primary>Submit</Button>}
			</Form>
			
		</Grid.Column>
				<Grid.Column width="6"></Grid.Column>	

		</Grid.Row>
		<Grid.Row>
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="8">
				<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell textAlign="center">Portfolio</Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Download</Table.HeaderCell>

						</Table.Row>
					</Table.Header>
					<Table.Body>

					{this.props.locus.length>0?this.props.locus.reverse().map((portfolio,index)=>(
      <Table.Row key={index}>

        <Table.Cell width="4" textAlign="center"><p>{portfolio.name}</p></Table.Cell>
       
        
        
        <Table.Cell><Button className="csv" onClick={()=>this.handleOpen(portfolio.name)} style={{backgroundColor:'white',border:'1px solid black',color:'black'}} primary>Download CSV</Button></Table.Cell>
        <Table.Cell><Button className="csv" onClick={()=>this.handleLossModalOpen(portfolio.name)} style={{backgroundColor:'white',border:'1px solid black',color:'black'}} primary>Download Loss</Button></Table.Cell>
        <Table.Cell><Button className="csv"  style={{backgroundColor:'white',border:'1px solid black',color:'black'}} primary>Download Summary</Button></Table.Cell>
      </Table.Row>
      )):
<Table.Row></Table.Row>}
					
					</Table.Body>

				</Table>
			</Grid.Column>
			<Grid.Column width="4"></Grid.Column>
		</Grid.Row>
		</Grid>
		<Modal
		open={this.state.modalOpen}
		onClose={this.handleClose}
		closeIcon
		itemName={this.state.activeItemName}
		>
		<Modal.Header>
			Download CSV 
		</Modal.Header>
		<Modal.Content scrolling>
		<div style={{marginLeft:'20%',marginRight:'20%'}}>
		
		<p>Select Data You want to Download</p>
		<Grid.Row>
				<Dropdown  placeholder="Others" fluid multiple  selection options={othersOptions} value={others} onChange={(e,{value})=>this.handleChange(value,'others')}/>	

		</Grid.Row>
		<p>Select Climate Variable</p>
		<Grid.Row>

		<Dropdown  placeholder="Climate variables" fluid multiple  selection options={variableOptions} value={variables} onChange={(e,{value})=>this.handleChange(value,'variables')}/>	

		</Grid.Row>
		<p>Select RCP</p>
		<Grid.Row>
				<Dropdown  placeholder="RCP" fluid multiple  selection options={rcpOptions} value={rcp} onChange={(e,{value})=>this.handleChange(value,'rcp')}/>	

		</Grid.Row>
		<p>Select Year</p>
		<Grid.Row>
				<Dropdown  placeholder="Year" fluid multiple  selection options={yearOptions} value={year} onChange={(e,{value})=>this.handleChange(value,'year')}/>	

		</Grid.Row>
		<br/>

		{(this.state.modalloading && (!this.props.csv.length===undefined))?<Button style={{backgroundColor:'#015edc',marginLeft:'45%'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#015edc',marginLeft:'45%'}} onClick={this.handleSubmit} primary>Submit</Button>}
		
		{(this.props.csv.length===undefined)?<CsvDownload data={this.props.csv.success} style={{backgroundColor:'#015edc',color:'white',border:'0px solid white',padding:'10px',float:'right',borderRadius:'5%',fontWeight:'bold'}}/>:null}
		
		</div>
		</Modal.Content>
		</Modal>


		<Modal
		open={this.state.lossmodalOpen}
		onClose={this.handleLossModalClose}
		closeIcon
		itemName={this.state.activeItemName}
		>
		<Modal.Header>
			Download CSV 
		</Modal.Header>
		<Modal.Content scrolling>
		<div style={{marginLeft:'20%',marginRight:'20%'}}>
		
		
		<p>Select Year</p>
		<Grid.Row>
				<Dropdown  placeholder="Year" fluid   selection options={yearOptions} value={year} onChange={(e,{value})=>this.handleChange(value,'year')}/>	

		</Grid.Row>	
		<br/>

		{(this.state.modalloading && (!this.props.csv.length===undefined))?<Button style={{backgroundColor:'#015edc',marginLeft:'45%'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#015edc',marginLeft:'45%'}} onClick={this.handleLossSubmit} primary>Submit</Button>}
		
		{(this.props.csv.length===undefined)?<CsvDownload data={this.props.csv.success} style={{backgroundColor:'#015edc',color:'white',border:'0px solid white',padding:'10px',float:'right',borderRadius:'5%',fontWeight:'bold'}}/>:null}
		
		</div>
		</Modal.Content>
		</Modal>
			</div>)
		
		
		
	}
}

const mapStateToProps = state =>{
	return {
		errors:state.project.errors,
		locus:state.locus.locus,
		csv:state.project.csv

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
		},
		getCSV:(formdata)=>{
			dispatch(project.getCSV(formdata))
		},
		getLoss:(formdata)=>{
			dispatch(project.getLoss(formdata))
		},
		getSummary:(formdata)=>{
			dispatch(project.getSummary(formdata))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Project);