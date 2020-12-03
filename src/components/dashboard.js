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
import Example from './example';
import LineExample from './Line';
import './dashboard.css';

let options=[];
let Item=[];


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
		analysis:'local',
		modalOpen:false,
		feedback:'',
		asset_table:'',
		risk:'',
		single_asset:'',
		activeItemName:'',
		single_asset_overall:'',
		singel_asset_chart:'',
		single_asset_loss:'',
		single_asset_progress:'',
		single_asset_cone_chart:''
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
		if(prevProps.feedback!==this.props.feedback){
			this.setState({feedback:this.props.feedback.overall.overall_bar_chart,
				asset_table:this.props.feedback.overall.asset_table,
				risk:this.props.feedback.overall.progress_bars,
				single_asset:this.props.feedback.single_asset
			})
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
	handleOpen =(asset) => this.setState({modalOpen:true,
		activeItemName:asset.name},this.handleSingleAsset)
	handleClose =() => this.setState({modalOpen:false})

	handleSingleAsset=()=>{
		if(this.state.single_asset.length>0){
			console.log("itemksfk",this.state.activeItemName,this.state.single_asset)
			Item=this.state.single_asset.filter(asset=>asset.asset_name==this.state.activeItemName)
			this.setState({single_asset_overall:Item},this.handleSingleChart)



		}
	}
	handleSingleChart=()=>{
		console.log("fndfdgdgdsgdijgdos",this.state.single_asset_overall)
	let singledata =[
 {
    name: '2020', rcp2:0, rcp4:0, rcp8:this.state.single_asset_overall[0].overall_bar_chart['2020'],
  },
  
  {
    name: '2030-2050', rcp2:this.state.single_asset_overall[0].overall_bar_chart['2030_26'], rcp4:this.state.single_asset_overall[0].overall_bar_chart['2030_45'], rcp8:this.state.single_asset_overall[0].overall_bar_chart['2030_85'],
  },
  

  {
    name: '2050-2070', rcp2:this.state.single_asset_overall[0].overall_bar_chart['2050_26'], rcp4:this.state.single_asset_overall[0].overall_bar_chart['2050_45'], rcp8:this.state.single_asset_overall[0].overall_bar_chart
    ['2050_85'],
  }

]
this.setState({singel_asset_chart:singledata,
	single_asset_loss:this.state.single_asset_overall[0].loss_bars,
	single_asset_progress:this.state.single_asset_overall[0].progress_bars,
	single_asset_cone_chart:this.state.single_asset_overall[0].cone_chart},()=>console.log("loss",this.state.single_asset_loss['Total Loss'][0]))
	}

 render(){
 	console.log("dashbaord dta",this.state.single_asset)
 	
 	let user_id = localStorage.getItem('user_id');
 	const data = [
  {
    name: '2020', rcp2:0, rcp4:0, rcp8:this.state.feedback['2020'],
  },
  
  {
    name: '2030-2050', rcp2:this.state.feedback['2030_26'], rcp4:this.state.feedback['2030_45'], rcp8:this.state.feedback['2030_85'],
  },
  

  {
    name: '2050-2070', rcp2:this.state.feedback['2050_26'], rcp4:this.state.feedback['2050_45'], rcp8:this.state.feedback['2050_85'],
  }
];

 	
 	if(this.props.project.length>0)
 	{
 		const projects = this.props.project.filter(project=>project.user_id==user_id)
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
			<p style={{float:'center'}}>OverAll Analysis<Checkbox toggle/>Detailed Analysis</p>
			</div>
		 	
			
			</Grid.Column>

			</Grid.Row>
				
			<Grid.Row>
			<Grid.Column width="3"></Grid.Column>
			
			<Grid.Column width="4"  style={{boxShadow:'0 1px 2px 0 rgba(34,36,38,0.5)'}}>
			<p style={{color:"#015edc"}}>Climate Risk Index</p>
				   <ComposedChart
        width={445}
        height={400}
        data={data}
        margin={{
          top: 20, right: 80, bottom: 20, left: 20,
        }}
        padding={5}
       
      >
      <defs>
      	<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00046" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#1cb5e0" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorVv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#56ccf2" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#2f80ed" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorWv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9cecfb" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#0052d4" stopOpacity={0.3}/>
        </linearGradient>
      </defs>
        <CartesianGrid stroke="#e5e5e5" />
        <XAxis dataKey="name" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'value', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />

        <Area type="monotone" dataKey="rcp" fill="#ffffff" stroke="#ffffff" />
        <Bar dataKey="rcp2" barSize={20} fill="url(#colorUv)" stroke="#1cb5e0"/>
        <Bar dataKey="rcp4" barSize={20} fill="url(#colorVv)" stroke="#2f80ed"/>
        <Bar dataKey="rcp8" barSize={20} fill="url(#colorWv)" stroke="#0052d4"/>


        <Line type="monotone" dataKey="uv" stroke="#000000" />
      </ComposedChart>
			</Grid.Column>
			<Grid.Column width="1"></Grid.Column>
			<Grid.Column width="8" style={{boxShadow:'0 1px 2px 0 rgba(34,36,38,0.5)'}}>
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
						<p style={{fontSize:'12px'}}>OverAll  <i style={{float:'right'}}>{this.state.risk.OVERALL}%</i></p>
						<Progress percent={this.state.risk.OVERALL}/>
					    <p style={{fontSize:'12px'}}>Flood  <i style={{float:'right'}}>{this.state.risk.Flood}%</i></p>

						<Progress percent={this.state.risk.Flood} color='green'/>
						<p style={{fontSize:'12px'}}>Rainfall  <i style={{float:'right'}}>{this.state.risk.Rainfall}%</i></p>

						<Progress percent={this.state.risk.Rainfall} color='yellow'/>
						<p style={{fontSize:'12px'}}>Storm Surge  <i style={{float:'right'}}>{this.state.risk['Storm Surge']}%</i></p>

						<Progress percent={this.state.risk['Storm Surge']} color='red'/>
						<p style={{fontSize:'12px'}}>Drought  <i style={{float:'right'}}>{this.state.risk.Drought}%</i></p>

						<Progress percent={this.state.risk.Drought} color='red'/>
						<p style={{fontSize:'12px'}}>Extreme Heat  <i style={{float:'right'}}>{this.state.risk['Extreme Heat']}%</i></p>

						<Progress percent={this.state.risk['Extreme Heat']} color='red'/>
					    <p style={{fontSize:'12px'}}>LandSlide  <i style={{float:'right'}}>{this.state.risk.Landslide}%</i></p>

						<Progress percent={this.state.risk['LandSlide']} color='red'/>

						
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
				<Grid.Column width="1"></Grid.Column>
				<Grid.Column width="8">
						<Table columns={5}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Climate Score</Table.HeaderCell>
        <Table.HeaderCell>Overalll Loss(mil $)</Table.HeaderCell>
        
        <Table.HeaderCell>Analyse</Table.HeaderCell>
        <Table.HeaderCell>Modify</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {this.state.asset_table.length>0?this.state.asset_table.map((asset,index)=>(
      <Table.Row key={index}>

        <Table.Cell>{asset.name}</Table.Cell>
       
        <Table.Cell style={{textTransform:'capitalize'}}>{asset.type}</Table.Cell>
        <Table.Cell><Progress percent={(asset.climatic_score)} color="red"/></Table.Cell>
        <Table.Cell>{asset.overall_loss}</Table.Cell>
        
        <Table.Cell><Button onClick={()=>this.handleOpen(asset)}><Icon name="chart line"/></Button></Table.Cell>
        <Table.Cell><Icon name="edit"/></Table.Cell>
      </Table.Row>
      )):
<Table.Row></Table.Row>}
      
      
    </Table.Body>

    <Table.Footer>
         </Table.Footer>
  </Table>
				</Grid.Column>
			</Grid.Row>
			</Grid>
				<Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            closeIcon
            itemName={this.state.activeItemName}
            size="fullscreen"
          >

            <Modal.Header>Asset Analysis</Modal.Header>
            <Modal.Content scrolling>
              	<Grid>
              		<Grid.Row>
              			<Grid.Column width="5">
              					<p style={{color:"#015edc"}}>Climate Risk Index</p>
			   <ComposedChart
        width={445}
        height={400}
        data={data}
        margin={{
          top: 20, right: 80, bottom: 20, left: 20,
        }}
        padding={5}
       
      >
      <defs>
      	<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00046" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#1cb5e0" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorVv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#56ccf2" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#2f80ed" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorWv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9cecfb" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#0052d4" stopOpacity={0.3}/>
        </linearGradient>
      </defs>
        <CartesianGrid stroke="#e5e5e5" />
        <XAxis dataKey="name" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'value', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />

        <Area type="monotone" dataKey="rcp" fill="#ffffff" stroke="#ffffff" />
        <Bar dataKey="rcp2" barSize={20} fill="url(#colorUv)" stroke="#1cb5e0"/>
        <Bar dataKey="rcp4" barSize={20} fill="url(#colorVv)" stroke="#2f80ed"/>
        <Bar dataKey="rcp8" barSize={20} fill="url(#colorWv)" stroke="#0052d4"/>


        <Line type="monotone" dataKey="uv" stroke="#000000" />
      </ComposedChart>
              			</Grid.Column>
              			<Grid.Column width="5">
              					<p style={{color:"#015edc"}}>Risks</p>

					<div>
							<p style={{fontSize:'12px'}}>OverAll  <i style={{float:'right'}}>{this.state.single_asset_progress.OVERALL}%</i></p>
						<Progress percent={this.state.single_asset_progress.OVERALL}/>
					    <p style={{fontSize:'12px'}}>Flood  <i style={{float:'right'}}>{this.state.single_asset_progress.Flood}%</i></p>

						<Progress percent={this.state.single_asset_progress.Flood} color='green'/>
						<p style={{fontSize:'12px'}}>Rainfall  <i style={{float:'right'}}>{this.state.single_asset_progress.Rainfall}%</i></p>

						<Progress percent={this.state.single_asset_progress.Rainfall} color='yellow'/>
						<p style={{fontSize:'12px'}}>Storm Surge  <i style={{float:'right'}}>{this.state.single_asset_progress['Storm Surge']}%</i></p>

						<Progress percent={this.state.single_asset_progress['Storm Surge']} color='red'/>
						<p style={{fontSize:'12px'}}>Drought  <i style={{float:'right'}}>{this.state.single_asset_progress.Drought}%</i></p>

						<Progress percent={this.state.single_asset_progress.Drought} color='red'/>
						<p style={{fontSize:'12px'}}>Extreme Heat  <i style={{float:'right'}}>{this.state.single_asset_progress['Extreme Heat']}%</i></p>

						<Progress percent={this.state.single_asset_progress['Extreme Heat']} color='red'/>
					    <p style={{fontSize:'12px'}}>LandSlide  <i style={{float:'right'}}>{this.state.single_asset_progress.Landslide}%</i></p>

						<Progress percent={this.state.single_asset_progress['LandSlide']} color='red'/>
						


					</div>
              			</Grid.Column>
              			<Grid.Column width="5">
              							<p style={{color:"#015edc"}}>Portfolio Losses</p>
							<p style={{fontSize:'12px'}}>Total Loss  <i style={{float:'right'}}>{this.state.single_asset_loss['Total Loss']}</i></p>
						<Progress percent={this.state.single_asset_loss['Total Loss']}/>
					    <p style={{fontSize:'12px'}}>Asset Flood Damage  <i style={{float:'right'}}>{this.state.single_asset_loss['Asset Flood Damage']}</i></p>

						<Progress percent={this.state.single_asset_loss['Asset Flood Damage']} color='green'/>
						<p style={{fontSize:'12px'}}>Asset Storm Damage  <i style={{float:'right'}}>{this.state.single_asset_loss['Asset storm Damage']}</i></p>

						<Progress percent={this.state.single_asset_loss['Asset Storm Damage']} color='yellow'/>
						<p style={{fontSize:'12px'}}>Operational Flood Loss  <i style={{float:'right'}}>{this.state.single_asset_loss['Operational Flood Loss']}</i></p>

						<Progress percent={this.state.single_asset_loss['Operational Flood Loss']} color='red'/>
						<p style={{fontSize:'12px'}}> Operational Storm Surge Loss <i style={{float:'right'}}>{this.state.single_asset_loss['Operational Storm Surge Loss']}</i></p>

						<Progress percent={this.state.single_asset_loss['Operational Storm Surge Loss']} color='red'/>
						
						</Grid.Column>


              		</Grid.Row>
              		<Grid.Row>
              			<Grid.Column width="5">
              			              					<p style={{color:"#015edc"}}>RCP 2.6</p>

              				<Example data={this.state.single_asset_cone_chart.cone1_26}/>
              			</Grid.Column>
              			<Grid.Column width="5">
              			              					<p style={{color:"#015edc"}}>RCP 4.5</p>

              				<Example/>
              			</Grid.Column>
              			<Grid.Column width="5">
              			              					<p style={{color:"#015edc"}}>RCP 8.5</p>

              				<Example/>
              			</Grid.Column>


              		</Grid.Row>
              		<Grid.Row>
              			<Grid.Column width="5">
              			              					<p style={{color:"#015edc"}}>Year 2020</p>

              				<Example/>
              			</Grid.Column>
              			<Grid.Column width="5">
              			              					<p style={{color:"#015edc"}}>Year 2030 </p>

              				<Example/>
              			</Grid.Column>
              			<Grid.Column width="5">
              			              					<p style={{color:"#015edc"}}>Year 2050</p>

              				<Example/>
              			</Grid.Column>


              		</Grid.Row>
              		<Grid.Row>
              			<Grid.Column width="8">
              			              					<p style={{color:"#015edc"}}>Analysis of Flood Damage</p>

              				<LineExample/>
              			</Grid.Column>
              			<Grid.Column width="8">
              			              					<p style={{color:"#015edc"}}>Analysis of Storm Surge</p>

              				<LineExample/>
              			</Grid.Column>
              		</Grid.Row>
              	</Grid>
            </Modal.Content>
          </Modal>
			</div>

 		)
 }
} 
const mapStateToProps = state =>{
	return{
		errors:state.project.errors,
		project:state.project.project,
		feedback:state.feedback.feedback
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