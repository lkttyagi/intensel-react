import React ,{Component} from 'react';
import SideNavbar from './sidebar';
import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal,Popup,Select,Progress,Table,Checkbox,Accordion,Dropdown} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import home from '../assets/home.png';
import add from '../assets/images/add.png';
import search from '../assets/search.png';
import 	{ loadModules } from 'esri-loader';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';
import {project,auth,dashboard} from '../actions';

let options=[];
const data = [
  {
    name: 'Page A', uv: 590, pv: 800, amt: 1400,
  },
  {
    name: 'Page B', uv: 868, pv: 967, amt: 1506,
  },
  {
    name: 'Page C', uv: 1397, pv: 1098, amt: 989,
  },
  {
    name: 'Page D', uv: 1480, pv: 1200, amt: 1228,
  },
  {
    name: 'Page E', uv: 1520, pv: 1108, amt: 1100,
  },
  {
    name: 'Page F', uv: 1400, pv: 680, amt: 1700,
  },
];
const RcpOptions=[
	{key:2.6,value:2.6,text:2.6},
	{key:4.5,value:4.5,text:4.5},
	{key:8.5,value:8.5,text:8.5}
]
const VariableOptions=[
	{key:'Flood',value:'Flood',text:'Flood'},
	{key:'Rain',value:'Rain',text:'Rain'},
	{key:'Storm',value:'Storm',text:'Storm'},
	{key:'LandSlide',value:'LandSlide',text:'LandSlide'}
]
const YearOptions=[
	{key:2020,value:2020,text:2020},
	{key:2030,value:2030,text:2030},
	{key:2050,value:2050,text:2050}
]




class Dashboard extends Component{
	constructor(props){
		super(props);
	}
	state={
		project:'demo',
		variable:'Flood',
		rcp:2.6,
		year:2030,
		analysis:'local'
	}


	componentDidMount(){
		loadModules(['esri/Map', 'esri/views/MapView','esri/layers/FeatureLayer','esri/widgets/Legend','esri/Graphic','esri/widgets/Search'], { css: true })
    .then(([ArcGISMap, MapView,FeatureLayer,Legend,Graphic,Search]) => {
    let that =this;
    	 const defaultSym = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255, 0.5],
            width: "0.5px"
        }
    }
    const renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: defaultSym,
        // label: "Flood at RCP 85 shapefile projection",
        visualVariables: [
            {
            type: "color",
            field: "FL8570",
            stops: [
                {
                value: 0.22,
                color: "#FFFFCC",
                label: "0 - 0.22"
                },
                {
                value: 0.609,
                color: "#FFEDA0",
                label: "0.22 - 0.609"
                },
                {
                value: 0.929,
                color: "#FED976",
                label: "0.609 - 0.929"
                },
                {
                value: 1.25,
                color: "#FEB24C",
                label: "0.929 - 1.25"
                },
                {
                value: 1.64,
                color: "#FD8D3C",
                label: "1.25 - 1.64"
                },
                {
                value: 2.19,
                color: "#FC4E2A",
                label: "1.64 - 2.19"
                },
                {
                value: 2.9,
                color: "#E31A1C",
                label: "2.19 - 2.9"
                },
                {
                value: 4,
                color: "#BD0026",
                label: "2.9 - 4"
                },
                {
                value: 6,
                color: "#940025",
                label: "4 - 6"
                },
                {
                value: 8,
                color: "#67001F",
                label: "6 - 8"
                }
            ]
            }
        ]
    };
    // Adding shapefile as a feature layer
    const povLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Hong_Kong_Shapefile/FeatureServer/0",
        renderer: renderer,
        title: "Flood in Hong Kong",
        popupTemplate: {
            // autocasts as new PopupTemplate()
            title: "{name}, {Type}",
            content:
            "Flood Value {FL8570}",
        }
    });


    
      const map = new ArcGISMap({
        basemap: 'streets-vector',
        layers:[povLayer]
        
      });

      const view = new MapView({
        container:'viewDiv',
        map: map,
        center: [114.1838,22.2797],
        zoom: 16
      });

      var search = new Search({
    view: view
    });
    view.ui.add(search, "top-right");
       
       view.on("click", function(event){
       	
       	console.log(event.mapPoint.latitude,event.mapPoint.longitude);
        createGraphic(event.mapPoint.latitude,event.mapPoint.longitude);
        
        
        
        

    });
               function createGraphic(lat, long){
          // First create a point geometry 
          var point = {
            type: "point", // autocasts as new Point()
            longitude: long,
            latitude: lat
          };

          // Create a symbol for drawing the point
          var markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [255, 0, 0]
          };

          // Create a graphic and add the geometry and symbol to it
          var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
          });

          // Add the graphics to the view's graphics layer
          view.graphics.add(pointGraphic);
        }
         });
    
   
   	this.props.getProjects();
   		let formdata = new FormData();
   		formdata.append('project',this.state.project)
   		formdata.append('rcp',this.state.rcp)
   		formdata.append('variable',this.state.variable)
   		formdata.append('year',this.state.year)
   		formdata.append('analysis',this.state.analysis)
   		this.props.addDashboard(formdata);
		
	}
	componentDidUpdate(prevProps,prevState){
		if(prevProps.project!==this.props.project){
			this.setState({project:this.props.project[0].name})
		}
	}
	handleProject=(e,{value})=>{
		this.setState({project:value},()=>console.log(this.state.project))
	}
	handleRCP=(e,{value})=>{
		this.setState({rcp:value},()=>console.log(this.state.rcp))
	}
	handleVariable=(e,{value})=>{
		this.setState({variable:value},()=>console.log(this.state.variable))
	}
	handleYear=(e,{value})=>{
		this.setState({year:value},()=>console.log(this.state.year))
	}
	handleLogout=()=>{
		this.props.logout()
	}

 render(){
 	const {value}=this.state
 	let user_id = localStorage.getItem('user_id');
 	
 	if(this.props.project.length>0)
 	{
 		const projects = this.props.project.filter(project=>project.user_id==user_id)
 		console.log("lengm",projects.length)
 		for(let i=0;i<projects.length;i++){
 			options.push({
 				key:projects[i].name,
 				value:projects[i].name,
 				text:projects[i].name

 			})
 		}
 		console.log("option",options)

 	}
 	return(
 		<div>
			<Menu style={{minHeight:'4.00em',margin:'0rem 0',backgroundColor:'#f7f6f6'}} fixed="top">
			    
				<Menu.Item>
			    <Image src={logo} size='small' style={{marginLeft:'5%'}}/>		
			    </Menu.Item>
			    <Menu.Item style={{marginLeft:'40%'}}><p style={{fontSize:'18px'}}>Dashboard</p></Menu.Item>
				<Menu.Item
				 
				 position="right"
				 
				 >
				<Button  onClick={this.handleLogout}style={{borderRadius:5,backgroundColor:'#f7f6f6',float:'right'}}><Icon name="power" size="big"/></Button>

				 </Menu.Item>
			</Menu>
			<SideNavbar/>
			<br/><br/><br/><br/><br/>
		<Grid  padded>
			<Grid.Row>
			
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="11" textAlign="center">
			<br/>
			
			<p style={{float:'right'}}>Local<Checkbox toggle/>Global</p>
			<div style={{float:'center'}} centered>
			<Button primary style={{float:'center',backgroundColor:'#015edc'}}>OverAll Analysis</Button>
			<Button primary style={{float:'center',backgroundColor:'#015edc'}}>Detailed Analysis</Button>
			</div>
		 	
			
			</Grid.Column>

			</Grid.Row>
				
			<Grid.Row>
			<Grid.Column width="3"></Grid.Column>
			<Grid.Column width="2" style={{position:'fixed',marginLeft:'2%',marginTop:'22%',boxShadow:'0 1px 2px 0 rgba(34,36,38,0.5)',zIndex:'3000',backgroundColor:'#f7f6f6'}}>
				<br/>
				<Icon name="calendar"/>Project<br/>
				<Form.Field
					id="form-input-control-project"
					control={Select}
					options={options}
					
					value={this.state.project}
					placeholder='Project'
					onChange={this.handleProject}

				/>
				
				<br/>
				<Form.Field
					id="form-input-control-climate"
					control={Select}
					options={VariableOptions}
					
					value={this.state.variable}
					placeholder='Climate Variable'
					onChange={this.handleVariable}

				/>
				
			<br/>
					
				<Form.Field
					id="form-input-control-climate"
					control={Select}
					options={RcpOptions}
					
					value={this.state.rcp}
					placeholder='RCP'
					onChange={this.handleRCP}

				/>
				<br/>
				<Form.Field
					id="form-input-control-rcp"
					control={Select}
					options={YearOptions}
					
					value={this.state.year}
					placeholder='Year'
					onChange={this.handleYear}

				/>
				
				
			</Grid.Column>	
			<Grid.Column width="5">
			<p style={{color:"#015edc"}}>Climate Risk Index</p>
				   <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20, right: 80, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" label={{ value: 'Pages', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="amt" fill="#ffffff" stroke="#ffffff" />
        <Bar dataKey="pv" barSize={20} fill="#015edc" />
        <Line type="monotone" dataKey="uv" stroke="#000000" />
      </ComposedChart>
			</Grid.Column>
			
			<Grid.Column width="8">
						<p style={{color:"#015edc"}}>Asset Level Risk Map</p>

			  <div id="viewDiv" style={{height:'400px'}}></div>
			
			</Grid.Column>

			</Grid.Row>
			<Grid.Row>
				
				<Grid.Column width="3"></Grid.Column>
				<Grid.Column width="4" style={{boxShadow:'0 1px 2px 0 rgba(34,36,38,0.5)'}}>
				<br/>
				<p style={{color:"#015edc"}}>Risks</p>

					<div>
						<Label>Overall</Label>
						<Progress percent={32} color='red'/>
					    <Label>Rain</Label>
						<Progress percent={32} color='green'/>
						<Label>Rain</Label>
						<Progress percent={32} color='yellow'/><Label>Rain</Label>
						<Progress percent={32} color='red'/><Label>Rain</Label>
						<Progress percent={32} color='red'/>
						{/*				<p style={{color:"#015edc"}}>Portfolio Losses</p>
						<Label>Overall</Label>
						<Progress percent={32} color='red'/>
					    <Label>Rain</Label>
						<Progress percent={32} color='blue'/>
						<Label>Rain</Label>
						<Progress percent={32} color='black'/><Label>Rain</Label>
						<Progress percent={32} color='red'/><Label>Rain</Label>
						<Progress percent={32} color='red'/>*/}


					</div>
				</Grid.Column>
				<Grid.Column width="9">
						<Table columns={5}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Climate Score</Table.HeaderCell>
        <Table.HeaderCell>Overalll Loss(mil $)</Table.HeaderCell>
        <Table.HeaderCell>Value</Table.HeaderCell>
        <Table.HeaderCell>Analyse</Table.HeaderCell>
        <Table.HeaderCell>Modify</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>22</Table.Cell>
        <Table.Cell>Male</Table.Cell>
        <Table.Cell>None</Table.Cell>
        <Table.Cell>None</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>32</Table.Cell>
        <Table.Cell>Male</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
        <Table.Cell>None</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill</Table.Cell>
        <Table.Cell>Denied</Table.Cell>
        <Table.Cell>22</Table.Cell>
        <Table.Cell>Other</Table.Cell>
        <Table.Cell>None</Table.Cell>
        <Table.Cell>None</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
         </Table.Footer>
  </Table>
				</Grid.Column>
			</Grid.Row>
			</Grid>

			</div>

 		)
 }
} 
const mapStateToProps = state =>{
	return{
		errors:state.project.errors,
		project:state.project.project
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		addDashboard:(formdata)=>{
			dispatch(dashboard.postDashboard(formdata));
		},
		getProjects:()=>{
			dispatch(project.getProjects());
		},
		logout:()=>{
			dispatch(auth.logout())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);