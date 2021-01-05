import React,{Component} from 'react';
import {Form,Button,Input,TextArea,Grid,Container,Message,Image,Header,Menu,Select,Dropdown,Icon,Table,Modal,Card} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import './project.css';
import {connect} from 'react-redux';
import {locus,auth,project} from '../actions';
import Spinner from './loader';
import CsvDownload from 'react-json-to-csv';

import {
	changeTitle,
} from "../redux/actions";


let options=[];;

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
		lossmodalOpen:false,
		portfolios:'',
		summarymodalOpen:false,
		
	}
	
	componentDidMount(){
		this.props.changeTitle("Project")
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


	handleSummarySubmit=(e)=>{
		e.preventDefault();
		let formdata=new FormData();
		formdata.append('portfolio',this.state.activeItemName)
		this.setState({modalloading:true},()=>{this.props.getSummary(formdata)})
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
	handleSummaryModalOpen=(portfolio)=>this.setState({summarymodalOpen:true,
		activeItemName:portfolio})

	handleSummaryModalClose =()=>{
		this.setState({summarymodalOpen:false})
	}


	render(){
		const {value,others,variables,rcp,year,status} =this.state;
		let user_id = localStorage.getItem('user_id');
		console.log("error",this.props.errors)

		
		if(this.props.locus && this.props.locus.length>0){
		options=[];
		const assets = this.props.locus.filter(location=>location.users_id==user_id)
		this.state.portfolios=assets.reverse()
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
			<Grid style={{ height:'90vh' }} verticalAlign='middle' padded centered>	
		<Grid.Row>	
		
		<Grid.Column width="6"></Grid.Column>	
		 <Grid.Column width="4">
		 	
		 	
		 	
		 	
		 	<br/>
			<Form>
				{this.props.errors.Error?<p style={{color:'red'}}>{this.props.errors.Error}</p>:null}
				<Form.Field required
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
				<Dropdown required placeholder="Portfolio" fluid   selection options={options} value={value} onChange={this.handleAssets}/>	
				
				<label>Status</label>
				<Dropdown required placeholder="Status" fluid   selection options={StatusOptions} value={status} onChange={this.handleStatus}/>	
			    <br/>
			    <br/>

				{(this.state.loading && this.props.errors.Error==undefined)?<Button style={{backgroundColor:'#fdb827',marginLeft:'45%'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#fdb827',marginLeft:'45%',color:'black'}} onClick={this.onSubmit} primary>Submit</Button>}
			</Form>
			
		</Grid.Column>
				<Grid.Column width="6"></Grid.Column>	

		</Grid.Row>
		<Grid.Row>
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="8">
				{/*<Table>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell textAlign="left">Portfolio</Table.HeaderCell>
							<Table.HeaderCell textAlign="right">Download</Table.HeaderCell>
							<Table.HeaderCell textAlign="center"></Table.HeaderCell>
							<Table.HeaderCell textAlign="center"></Table.HeaderCell>
							<Table.HeaderCell textAlign="center">Recommended for Global Analysis</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
				
					<Table.Body>

					{this.state.portfolios && this.state.portfolios.length>0?this.state.portfolios.map((portfolio,index)=>(
      <Table.Row key={index}>

        <Table.Cell width="4" textAlign="left" style={{fontSize:'14px'}}>{portfolio.name}</Table.Cell>
       
        
        
        <Table.Cell width="3"><Button className="csv" onClick={()=>this.handleOpen(portfolio.name)} primary>Download CSV</Button></Table.Cell>
        <Table.Cell width="3"><Button className="csv" onClick={()=>this.handleLossModalOpen(portfolio.name)}primary>Download Loss</Button></Table.Cell>
        
        <Table.Cell width="3"><Button className="csv" primary onClick={()=>this.handleSummaryModalOpen(portfolio.name)}>Download Summary</Button></Table.Cell>
      	<Table.Cell width="4" textAlign="center" style={{color:'red'}}>{portfolio.problematic_assets}</Table.Cell>

      </Table.Row>

      )):
<Table.Row></Table.Row>}
					
					</Table.Body>

				</Table>*/}
				<div class="table" style={{overflow:'auto',maxHeight:'220px'}}>
  <div class="table__body">
    <div class="table__row table__heading">
      <div class="table__cell">Portfolio</div>
      <div class="table__cell">CSV</div>
      
      <div class="table__cell">Loss</div>
      <div class="table__cell">Summary</div>
      <div class="table__cell">Recommended for Global Analysis</div>
    </div>
    {this.state.portfolios && this.state.portfolios.length>0?this.state.portfolios.map((portfolio,index)=>(
    <div class="table__row" key={index}>
      <div class="table__cell">
       
        <h5 class="table__crypto-name">{portfolio.name}
          </h5>
        
        
      </div>
      <div class="table__cell"><button class="button button--primary buttons__comprar" onClick={()=>this.handleOpen(portfolio.name)}>Download</button></div>
      <div class="table__cell"><button class="button button--primary buttons__ventar" onClick={()=>this.handleLossModalOpen(portfolio.name)}>Download</button></div>
      <div class="table__cell"><button class="button button--primary buttons__comprar" onClick={()=>this.handleSummaryModalOpen(portfolio.name)}>Download</button></div>
      <div class="table__cell" style={{color:'red'}}>
        	{portfolio.problematic_assets}
      </div>
    </div>)):null}
  
  </div>
</div>


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

		{(this.state.modalloading && (!this.props.csv.length===undefined))?<Button style={{backgroundColor:'#fdb827',marginLeft:'45%'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#fdb827',color:'black',marginLeft:'45%'}} onClick={this.handleSubmit} primary>Submit</Button>}
		
		{(this.props.csv.length===undefined)?<CsvDownload data={this.props.csv.success} style={{backgroundColor:'#fdb827',color:'black',border:'0px solid white',padding:'10px',float:'right',borderRadius:'5%',fontWeight:'bold'}}/>:null}
		
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
			Download Loss
		</Modal.Header>
		<Modal.Content scrolling>
		<div style={{marginLeft:'20%',marginRight:'20%'}}>
		
		
		<p>Select Year</p>
		<Grid.Row>
				<Dropdown  placeholder="Year" fluid   selection options={yearOptions} value={year} onChange={(e,{value})=>this.handleChange(value,'year')}/>	

		</Grid.Row>	
		<br/>

		{(this.state.modalloading && (!this.props.csv.length===undefined))?<Button style={{backgroundColor:'#fdb827',marginLeft:'45%'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#fdb827',color:'black',marginLeft:'45%'}} onClick={this.handleLossSubmit} primary>Submit</Button>}
		
		{(this.props.csv.length===undefined)?<CsvDownload data={this.props.csv.success} style={{backgroundColor:'#fdb827',color:'black',border:'0px solid white',padding:'10px',float:'right',borderRadius:'5%',fontWeight:'bold'}}/>:null}
		
		</div>
		</Modal.Content>
		</Modal>

		<Modal
		open={this.state.summarymodalOpen}
		onClose={this.handleSummaryModalClose}
		closeIcon
		itemName={this.state.activeItemName}
		>
		<Modal.Header>
			Download Summary
		</Modal.Header>
		<Modal.Content scrolling>
		<div style={{marginLeft:'20%',marginRight:'20%'}}>
		
		
		
		<Grid.Row>
				<Form.Field 
					 id="form-input-control-project"
					 control={Input}
					 label='Portfolio'
					 placeholder={this.state.activeItemName}
					 disabled	
					 style={{width:'100%'}}
					 />

		</Grid.Row>	
		<br/>

		{(this.state.modalloading && (!this.props.csv.length===undefined))?<Button style={{backgroundColor:'#fdb827',marginLeft:'45%'}}><Spinner/></Button>:
				<Button style={{backgroundColor:'#fdb827',color:'black',marginLeft:'40%'}} onClick={this.handleSummarySubmit} primary>Submit</Button>}
		
		{(this.props.csv.length===undefined)?<CsvDownload data={this.props.csv.success} style={{backgroundColor:'#fdb827',color:'black',border:'0px solid white',padding:'10px',float:'right',borderRadius:'5%',fontWeight:'bold'}}/>:null}
		
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
		},
		changeTitle:(title) => {
			dispatch(changeTitle(title))
		},
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Project);
