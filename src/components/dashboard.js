import React ,{Component} from 'react';
import SideNavbar from './oldsidebar';
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
  Legend,ScatterChart,Scatter
} from 'recharts';
import {project,auth,dashboard} from '../actions';
import Building from './building';
import LineExample from './Line';
import './dashboard.css';

import {Tabs,Tab,Row,Col} from 'react-bootstrap';
import Detail from './detail';
import Circle from 'react-circle';
import Donut from './donut';
import Heatmap from 'react-simple-heatmap';
import RCPDonut from './rcpdonut';
import YEARDonut from './yeardonut';
import SingleDonut from './singledonut';

let options=[];
let Item=[];
let singledata=[];
let data01=[];
let flat_data=[];
let losses_data=[];
let losses_data_flat=[];

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
	
	{key:2030,value:2030,text:2030},
	{key:2050,value:2050,text:2050}
]
const basementOptions=[
	{key:'yes',value:'yes',text:'yes'},
	{key:'no',value:'no',text:'no'},
	{key:'unknown',value:'unknown',text:'unknown'},

]
const constructionOptions=[
	{key:'wood',value:'wood',text:'wood'},
	{key:'concrete',value:'concrete',text:'concrete'},
	{key:'masonry',value:'masonry',text:'masonry'},
	{key:'mobile home',value:'mobile home',text:'mobile home'},
	{key:'light metal',value:'light metal',text:'light metal'},
	{key:'steel',value:'steel',text:'steel'},
	{key:'unknown',value:'unknown',text:'unknown'}

]
const storiesOptions=[
	{key:1,value:1,text:1},
	{key:2,value:2,text:2},
	{key:'3 or More',value:'3 or More',text:'3 or More'},
	{key:'unknown',valeu:'unknown',text:'unknown'}
]
const occupancyOptions=[
	{key:'res',value:'res',text:'res'},
	{key:'com',value:'com',text:'com'},
	{key:'ind',value:'ind',text:'ind'},
	{key:'unknown',value:'unknown',text:'unknown'}
]




class Dashboard extends Component{
	constructor(props){
		super(props);
	}
	state={
		project:'123',
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
		single_asset_cone_chart:'',
		RcpData:'',
		YearData:'',
		basement:'yes',
		construction:'wood',
		stories:'1',
		occupancy:'res',
		per_sq_m_value:40000,
		scatter:'',
		yearDetail:'',
		detailed:'false',
		portfolio_losses:'',
		portfolio_losses_flat:'',
		overall:'',
		heatmap:'',
		losses:''
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
        url: "https://services9.arcgis.com/VkScCoIvdvWoNy79/arcgis/rest/services/shapefiles/FeatureServer/0",
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

   	if(this.props.project){
   		
   		let formdata = new FormData();
   		formdata.append('project',this.props.location.state.project_name.project)
   		formdata.append('rcp',this.state.rcp)
   		formdata.append('variable',this.state.variable)
   		formdata.append('year',this.state.year)
   		formdata.append('analysis',this.state.analysis)
   		this.setState({project:this.props.location.state.project_name.project},()=>this.props.addDashboard(formdata));
   	}



   	let formdata1=new FormData();
   	formdata1.append('project',this.props.location.state.project_name.project)
   	this.props.getDetailByYear(formdata1);
		
	}
	componentDidUpdate(prevProps,prevState){
		if(prevProps.feedback!==this.props.feedback){
			this.setState({feedback:this.props.feedback.overall.overall_bar_chart,
				asset_table:this.props.feedback.overall.asset_table,
				risk:this.props.feedback.overall.progress_bars,
				losses:this.props.feedback.overall.loss_bars,
				single_asset:this.props.feedback.single_asset,
				portfolio_losses:this.props.feedback.overall.portfolio_versus_losses,
				portfolio_losses_flat:this.props.feedback.overall.portfolio_versus_losses_flat_adjusted,
				overall:this.props.feedback.overall,
				heatmap:this.props.feedback.overall.heatmap
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
	 singledata =[
 {
    name: '2020', 'RCP2.6':0, 'RCP4.5':0, 'RCP8.5':this.state.single_asset_overall[0].overall_bar_chart['2020'],
  },
  
  {
    name: '2030-2050', 'RCP2.6':this.state.single_asset_overall[0].overall_bar_chart['2030_26'], 'RCP4.5':this.state.single_asset_overall[0].overall_bar_chart['2030_45'], 'RCP8.5':this.state.single_asset_overall[0].overall_bar_chart['2030_85'],
  },
  

  {
    name: '2050-2070', 'RCP2.6':this.state.single_asset_overall[0].overall_bar_chart['2050_26'], 'RCP4.5':this.state.single_asset_overall[0].overall_bar_chart['2050_45'], 'RCP8.5':this.state.single_asset_overall[0].overall_bar_chart
    ['2050_85'],
  }


]
console.log("singledata",singledata);
this.setState({singel_asset_chart:singledata,
	single_asset_loss:this.state.single_asset_overall[0].loss_bars,
	single_asset_progress:this.state.single_asset_overall[0].progress_bars,
	single_asset_cone_chart:this.state.single_asset_overall[0].cone_chart},this.handleComparison)


}


handleComparison=()=>{
	
	 let RcpData=[
			 {
    name: 'OverAll', 'rcp2.6':this.state.single_asset_cone_chart.cone1_26['OVERALL'], 'rcp4.5':this.state.single_asset_cone_chart.cone1_45['OVERALL'], 'rcp8.5':this.state.single_asset_cone_chart.cone1_85['OVERALL'],
  },
  
  {
    name: 'Flood', 'rcp2.6':this.state.single_asset_cone_chart.cone1_26['Flood'], 'rcp4.5':this.state.single_asset_cone_chart.cone1_45['Flood'], 'rcp8.5':this.state.single_asset_cone_chart.cone1_85['Flood'],
  },
  

  {
    name: 'Storm Surge', 'rcp2.6':this.state.single_asset_cone_chart.cone1_26['Storm Surge'], 'rcp4.5':this.state.single_asset_cone_chart.cone1_45['Storm Surge'], 'rcp8.5':this.state.single_asset_cone_chart.cone1_85['Storm Surge'],
  },
  {
  	name:'LandSlide','rcp2.6':this.state.single_asset_cone_chart.cone1_26['Landslide'],'rcp4.5':this.state.single_asset_cone_chart.cone1_45['Landslide'],'rcp8.5':this.state.single_asset_cone_chart.cone1_85['Landslide']
  },
  {
  	name:'Rainfall','rcp2.6':this.state.single_asset_cone_chart.cone1_26['Rainfall'],'rcp4.5':this.state.single_asset_cone_chart.cone1_45['Rainfall'],'rcp8.5':this.state.single_asset_cone_chart.cone1_85['Rainfall']
  },
  {
  	name:'Drought','rcp2.6':this.state.single_asset_cone_chart.cone1_26['Drought'],'rcp4.5':this.state.single_asset_cone_chart.cone1_45['Drought'],'rcp8.5':this.state.single_asset_cone_chart.cone1_85['Drought']
  },
  {
  	name:'Extreme Heat','rcp2.6':this.state.single_asset_cone_chart.cone1_26['Extreme Heat'],'rcp4.5':this.state.single_asset_cone_chart.cone1_45['Extreme Heat'],'rcp8.5':this.state.single_asset_cone_chart.cone1_85['Extreme Heat']
  }
]


		let yearData =[
		{
 	    name: 'OverAll', 2020:this.state.single_asset_cone_chart.cone3_20['OVERALL'], 2030:this.state.single_asset_cone_chart.cone3_30['OVERALL'], 2050:this.state.single_asset_cone_chart.cone3_50['OVERALL'],
  },
  
  {
    name: 'Flood', 2020:this.state.single_asset_cone_chart.cone3_20['Flood'], 2030:this.state.single_asset_cone_chart.cone3_30['Flood'], 2050:this.state.single_asset_cone_chart.cone3_50['Flood'],
  },
  

  {
    name: 'Storm Surge', 2020:this.state.single_asset_cone_chart.cone3_20['Storm Surge'], 2030:this.state.single_asset_cone_chart.cone3_30['Storm Surge'], 2050:this.state.single_asset_cone_chart.cone3_50['Storm Surge'],
  },
  {
  	name:'LandSlide',2020:this.state.single_asset_cone_chart.cone3_20['Landslide'],2030:this.state.single_asset_cone_chart.cone3_30['Landslide'],2050:this.state.single_asset_cone_chart.cone3_50['Landslide']
  },
  {
  	name:'Rainfall',2020:this.state.single_asset_cone_chart.cone3_20['Rainfall'],2030:this.state.single_asset_cone_chart.cone3_30['Rainfall'],2050:this.state.single_asset_cone_chart.cone3_50['Rainfall']
  },
  {
  	name:'Drought',2020:this.state.single_asset_cone_chart.cone3_20['Drought'],2030:this.state.single_asset_cone_chart.cone3_30['Drought'],2050:this.state.single_asset_cone_chart.cone3_50['Drought']
  },
  {
  	name:'Extreme Heat',2020:this.state.single_asset_cone_chart.cone3_20['Extreme Heat'],2030:this.state.single_asset_cone_chart.cone3_30['Extreme Heat'],2050:this.state.single_asset_cone_chart.cone3_50['Extreme Heat']
  }

		]
	this.setState({RcpData:RcpData,
		YearData:yearData},()=>console.log("yeardata",this.state.YearData))
	}
	handleChange=(value,key)=>{
		this.setState({[key]:value})
	}
	handleChangePro=(value,key)=>{
		this.setState({[key]:value},this.handleSubmitPro)
	}
	handleSubmitPro=()=>{
		
		let formdata = new FormData();
   		formdata.append('project',this.state.project)
   		formdata.append('rcp',this.state.rcp)
   		formdata.append('variable',this.state.variable)
   		formdata.append('year',this.state.year)
   		formdata.append('analysis',this.state.analysis)
   		this.props.addDashboard(formdata);

   		let formdata1=new FormData();
   	formdata1.append('project',this.state.project)
   	this.props.getDetailByYear(formdata1);
	}

	handleSubmit=(e)=>{
		e.preventDefault();
		let formdata= new FormData();
		formdata.append('building',this.state.activeItemName)
		formdata.append('basement',this.state.basement)
		formdata.append('construction',this.state.construction)
		formdata.append('stories',this.state.stories)
		formdata.append('occupancy',this.state.occupancy)
		formdata.append('per_sq_m_value',this.state.per_sq_m_value)
		this.props.getBuilding(formdata)
	}


 render(){
 	console.log("dashbaord dta",this.state.heatmap)
 	const {value,basement,construction,stories,occupancy,project,rcp,year}=this.state;

 	let heatmapdata=[];
 	let yLabels=[];
 	if(this.state.heatmap.length===undefined){
 	for(let i = 0; i < this.state.heatmap.values.length; i++){
    let temp=[];
    for(let j = 0; j <3; j++){
    	
        temp.push(this.state.heatmap.values[i][j]);
    }
    
    heatmapdata.push(temp)
    

}

	for(let i=0;i<this.state.heatmap.values.length;i++){
		yLabels.push(this.state.heatmap.names[i])
	}
   
}
{/*for(let i = 0; i < 6; i++){
    const tempo = [];
    for(let i = 0; i < 1; i++){
        tempo.push(Math.round(Math.random() * 100));
    }
    console.log("tempo",tempo);
    heatmapdata.push(tempo);
    console.log("heatmap",heatmapdata)
}*/}



 	if(this.state.portfolio_losses){
 		losses_data=[];
 		for(let i=0;i<this.state.portfolio_losses.x.length;i++){
 		losses_data.push({
 			name:this.state.portfolio_losses.x[i],
 			value:this.state.portfolio_losses.y[i]
 		})
 	
 	}
 }
 if(this.state.portfolio_losses_flat){
 		for(let i=0;i<this.state.portfolio_losses_flat.x.length;i++){
 		losses_data_flat.push({
 			name:this.state.portfolio_losses_flat.x[i],
 			value:this.state.portfolio_losses_flat.y[i]
 		})
 		console.log("proffsdfdd",losses_data_flat)
 	}
 }
 	
 	const data = [
  {
    name: '2020', 'RCP2.6':0, 'RCP4.5':0, 'RCP8.5':this.state.feedback['2020'],
  },
  
  {
    name: '2030-2050', 'RCP2.6':this.state.feedback['2030_26'], 'RCP4.5':this.state.feedback['2030_45'], 'RCP8.5':this.state.feedback['2030_85'],
  },
  

  {
    name: '2050-2070', 'RCP2.6':this.state.feedback['2050_26'], 'RCP4.5':this.state.feedback['2050_45'], 'RCP8.5':this.state.feedback['2050_85'],
  }
];
	  	if(this.props.project.length>0)
 	{	

 		
 		let user_id = localStorage.getItem('user_id');
 		const projects = this.props.project.filter(project=>project.users_id==user_id)
 		console.log("projscddkfl",projects)
 		options=[];
 		for(let i=0;i<projects.length;i++){
 			options.push({
 				key:projects[i].name,
 				value:projects[i].name,
 				text:projects[i].name

 			})
 		}
 		console.log("option",data)

 	}

 	
 	
 	if(this.props.detailyear.success&&this.props.detailyear.success.length>0){
 		console.log("detailyear",this.props.detailyear.success)
 		this.state.yearDetail=this.props.detailyear.success
 	}
 	 		
 


 	return(
 		<div style={{backgroundColor:'#f7f7f7'}}>
			<Menu style={{minHeight:'4.00em',margin:'0rem 0',backgroundColor:'#f7f6f6'}} fixed="top">
			    
				<Menu.Item>
			    <Image src={logo} size='small' style={{marginLeft:'5%'}}/>		
			    </Menu.Item>
			    <Menu.Item style={{marginLeft:'40%'}}><p style={{fontSize:'18px'}}>Dashboard</p></Menu.Item>
				<Menu.Item
				 
				 position="right"
				 
				 >
				<Button  onClick={this.handleLogout}style={{borderRadius:5,backgroundColor:'#f7f7f7',float:'right'}}><Icon name="power" size="big"/></Button>

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
			<p style={{float:'center'}}>OverAll Analysis<Checkbox  value={this.state.detailed} onChange={e=>this.setState({detailed:!this.state.detailed},()=>console.log("detailed",this.state.detailed))}toggle/>Detailed Analysis</p>
			</div>
		 	
			
			</Grid.Column>

			</Grid.Row>
			</Grid>
		<Grid>
				<Grid.Row>
					<Grid.Column width="3"></Grid.Column>
					<Grid.Column width="13">
						<Grid.Row>
						<Grid.Column className="card" style={{width:'24.5%',marginRight:'3%'}}>
							<Grid.Row style={{padding:'10px'}}>
							<p> Climate Risk Per 10 Year Rise</p>
							<br/>
								<Grid.Column style={{width:'50%'}}>
								
								<Circle className="cricle" progress={this.state.overall.per_10_years_rise}/>
								</Grid.Column>
								<Grid.Column style={{width:'50%'}}>
								<p> Total Value at Risk <br/><br/><b style={{color:'red',fontSize:'30px'}}>{this.state.overall.net_loss_value}</b></p>
								{this.state.losses['Asset Storm Damage']?<p> Total Loss <br/><br/><b style={{color:'red',fontSize:'30px'}}>$ {this.state.losses['Asset Flood Damage'][0]+this.state.losses['Asset Storm Damage'][0]+this.state.losses['Operational Flood Loss'][0]+this.state.losses['Operational Storm Surge Loss'][0]} Billion</b></p>:null}

								</Grid.Column>
							</Grid.Row>
							</Grid.Column>
							
							<Grid.Column className="card" style={{width:'32.5%',marginRight:'3%'}}>
								<p>Year</p>
								
							<YEARDonut data={this.state.yearDetail}/>
																	
							</Grid.Column>
							<Grid.Column className="card" style={{width:'32.5%'}}>
								<p>RCP</p>
								
								<RCPDonut data={this.state.yearDetail}/>
									
								
							</Grid.Column>
							
						</Grid.Row>

					</Grid.Column>
				</Grid.Row>

		</Grid>
			{this.state.detailed?
				<Grid>
				<Grid.Row>
			<Grid.Column width="3"></Grid.Column>
			
			<Grid.Column width="4" className="card">
			<p>Climate Risk Index</p>
				   <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20, right: 80, bottom: 20, left: 20,
        }}
        padding={0}
       
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
        <CartesianGrid stroke="#ffffff" />
        <XAxis dataKey="name" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} style={{stroke:'#3a3a33a'}}/>
        <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft'  }} stroke="#3a3a3a"  />
        <Tooltip />
        <Legend />

        <Area type="monotone" dataKey="rcp" fill="#ffffff" stroke="#ffffff" />
        <Bar dataKey="RCP2.6" barSize={20} fill="#6c85bd" />
        <Bar dataKey="RCP4.5" barSize={20} fill="#60b1cc" />
        <Bar dataKey="RCP8.5" barSize={20} fill="#bac3d2" />


        
      </ComposedChart>
			</Grid.Column>
			<Grid.Column width="1"></Grid.Column>
			<Grid.Column width="8" className="card">
						<p>Asset Level Risk Map</p>
						
					<Grid.Row>
				           

						
                          <Form.Select placeholder="Project"
                          onChange={(e,{value})=>this.handleChangePro(value,'project')}
                          value={project}
                          options={options}
                          style={{marginLeft:'25px'}}
                           />
                          
                          
                          <Form.Select placeholder="RCP"
                          onChange={(e,{value})=>this.handleChangePro(value,'rcp')}
                          value={rcp}
                          options={RcpOptions}
                          style={{marginLeft:'25px'}}
                          />
                          
                          
                          <Form.Select placeholder="Year"
                          onChange={(e,{value})=>this.handleChangePro(value,'year')}
                          value={year}
                          options={YearOptions}
                          style={{marginLeft:'25px'}}
                          />
                          
                          
                          
                          
					</Grid.Row>
			  <div id="viewDiv" style={{height:'400px',padding:'10px'}}></div>
			
			</Grid.Column>

			</Grid.Row>
			<Grid.Row>
				
				<Grid.Column width="3"></Grid.Column>
				<Grid.Column width="4" className="card">
				<br/>
				<p>Risks</p>

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
						<Progress percent={this.state.risk.Landslide} color='red'/>

						
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
				<Grid.Column width="8" className="card">
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
			<Grid.Row>
			<Grid.Column width="3"></Grid.Column>
			<Grid.Column width="4" className="card">
				<br/>
				<p>Portfolio Losses</p>

					{this.state.losses['Asset Flood Damage']?<div>
						
						<p style={{fontSize:'12px'}}>Total Loss <i style={{float:'right'}}>$ {this.state.losses['Asset Flood Damage'][0]+this.state.losses['Asset Storm Damage'][0]+this.state.losses['Operational Flood Loss'][0]+this.state.losses['Operational Storm Surge Loss'][0]} Billion</i></p>
						<Progress percent={(this.state.losses['Asset Flood Damage'][1]+this.state.losses['Asset Storm Damage'][1]+this.state.losses['Operational Flood Loss'][1]+this.state.losses['Operational Storm Surge Loss'][1])/4}/>

					    <p style={{fontSize:'12px'}}>Asset Flood Damage <i style={{float:'right'}}>$ {this.state.losses['Asset Flood Damage'][0]} Billion</i></p>

						<Progress percent={this.state.losses['Asset Flood Damage'][1]} color='green'/>
						<p style={{fontSize:'12px'}}>Asset Storm Damage <i style={{float:'right'}}>$ {this.state.losses['Asset Storm Damage'][0]} Billion</i></p>

						<Progress percent={this.state.losses['Asset Storm Damage'][1]} color='green'/>
						<p style={{fontSize:'12px'}}>Operational Flood Loss <i style={{float:'right'}}>$ {this.state.losses['Operational Flood Loss'][0]} Billion</i></p>

						<Progress percent={this.state.losses['Operational Flood Loss'][1]} color='green'/>
						<p style={{fontSize:'12px'}}>Operational Storm Surge Loss <i style={{float:'right'}}>$ {this.state.losses['Operational Storm Surge Loss'][0]} Billion</i></p>

						<Progress percent={this.state.losses['Operational Storm Surge Loss'][1]} color='green'/>
						

						

						


					</div>:null}
				</Grid.Column>
			<Grid.Column width="1"></Grid.Column>
			<Grid.Column width="8" className="card">
				 <div style={{height:'400px',padding:'10px'}}> 
				 {heatmapdata.length>0?<Heatmap
                              	data={heatmapdata}
                                bgColors={["rgb(235,102,40)","rgb(60,39,99)"]}
                                xLabels={ ["Landslide", "Rainfall", "Flood", "Drought Index", "Storm Surge", "Extreme Heat"] }
                                yLabels={ yLabels }
                                showLegend={ true }
                                xStepLabel={ 1 }
                                yStepLabel={ 1 }
                                showTicks={ "x" }
                                xLabelsStyle={{ fontWeight: "bold", fontSize: "11px" }}
                                yLabelsStyle={{ fontWeight: "bold" }}
                                legendStyle={{ fontWeight: "bold" }}
                                bordered={ true }
                                borderRadius={ "4px" }
                                
                            />:null}
                </div>
             </Grid.Column>
			</Grid.Row>
			
			          		<Grid.Row>
				<Grid.Column width="3"></Grid.Column>
				<Grid.Column width="6" className="card">
				<p>Portfolio vs Losses(Building FootPrint)</p>
		{losses_data.length>0?				   <ComposedChart
        width={450}
        height={400}
        data={losses_data}
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
        <YAxis label={{ value: 'miilion US $', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />

        <Area type="monotone" dataKey="rcp" fill="#ffffff" stroke="#ffffff" />
        <Bar dataKey="value" barSize={20} fill="#6c85bd" />
       


        	
      </ComposedChart>:null}
				</Grid.Column>
				<Grid.Column width="1"></Grid.Column>
				
			</Grid.Row>
			</Grid>:
			<Grid.Row>
			<Grid.Column width="3"></Grid.Column>
			<Grid.Column width="13"><Detail project={this.state.project}/></Grid.Column>
			</Grid.Row>}

				<Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            closeIcon
            itemName={this.state.activeItemName}
            size="fullscreen"
          >

            <Modal.Header>Asset Analysis</Modal.Header>
            <Modal.Content scrolling>
            	
				<br/>
            	<Row>
            		<Col>
            			<Tabs defaultActiveKey="Risk">
            				<Tab eventKey="Risk" title="Risk">
            				<br/>
            				<Grid>
            				<Grid.Row>
						<Grid.Column className="card" style={{width:'25%',marginLeft:'4%',marginRight:'2%'}}>
							<Grid.Row style={{padding:'10px'}}>
							<p> Climate Risk Per 10 Year Rise</p>
							<br/>
								<Grid.Column style={{width:'50%',}}>
								
								<Circle className="cricle" progress={this.state.overall.per_10_years_rise}/>
								</Grid.Column>
								<Grid.Column style={{width:'50%'}}>
								<p> Total Value at Risk <br/><br/><b style={{color:'red',fontSize:'30px'}}>{this.state.overall.net_loss_value}</b></p>
								<p> Total Loss <br/><br/><b style={{color:'red',fontSize:'30px'}}>$ 0.12 Billion</b></p>

								</Grid.Column>
							</Grid.Row>
							</Grid.Column>
							
							<Grid.Column className="card" style={{width:'30%',marginRight:'3%'}}>
								<p>Year</p>
								
							<YEARDonut data={this.state.yearDetail}/>
																	
							</Grid.Column>
							<Grid.Column className="card" style={{width:'32.5%'}}>
								<p>RCP</p>
								
								<RCPDonut data={this.state.yearDetail}/>
									
								
							</Grid.Column>
							
						</Grid.Row>
            					          		<Grid.Row>
              			<Grid.Column width="1"></Grid.Column>
              			<Grid.Column width="4" className="card">
              					<p>Climate Risk Index</p>
			   <ComposedChart
        width={450}
        height={400}
        data={singledata}
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
        <Bar dataKey="RCP2.6" barSize={20} fill="#6c85bd" />
        <Bar dataKey="RCP4.5" barSize={20} fill="#60b1cc"/>
        <Bar dataKey="RCP8.5" barSize={20} fill="#bac3d2"/>


        	
      </ComposedChart>
              			</Grid.Column>
              			<Grid.Column width="1"></Grid.Column>
              			<Grid.Column width="4" className="card">
              					<p>Risks</p>

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

						<Progress percent={this.state.single_asset_progress['Landslide']} color='red'/>
						


					</div>
              			</Grid.Column>
              			<Grid.Column width="1"></Grid.Column>
              			<Grid.Column width="5" className="card">
              							<p>Portfolio Losses</p>
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
              		</Grid>
            				</Tab>
            				<Tab eventKey="Comparison" title="Comparison">
            				<br/>
            				<Grid>
            					       		<Grid.Row>
              			<Grid.Column width="1"></Grid.Column>
              			<Grid.Column width="7" className="card">
              			              					<p>RCP 2.6 vs RCP 4.5 vs RCP 8.5</p>

            <ComposedChart
        width={750}
        height={400}
        data={this.state.RcpData}
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
        <Bar dataKey="rcp2.6" barSize={20} fill="#6c85bd" />
        <Bar dataKey="rcp4.5" barSize={20} fill="#60b1cc"/>
        <Bar dataKey="rcp8.5" barSize={20} fill="#bac3d2"/>


        <Line type="monotone" dataKey="uv" stroke="#000000" />
      </ComposedChart>
              			</Grid.Column>
              			<Grid.Column width="1"></Grid.Column>
              			<Grid.Column width="7" className="card">
              			              					<p>Year 2020 vs Year 2030 vs Year 2050</p>

              						   <ComposedChart
        width={750}
        height={400}
        data={this.state.YearData}
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

        <Area type="monotone" dataKey="Year" fill="#ffffff" stroke="#ffffff" />
        <Bar dataKey="2020" barSize={20} fill="#6c85bd" />
        <Bar dataKey="2030" barSize={20} fill="#60b1cc"/>
        <Bar dataKey="2050" barSize={20} fill="#bac3d2"/>


        <Line type="monotone" dataKey="uv" stroke="#000000" />
      </ComposedChart>
              			</Grid.Column>
              			


              		</Grid.Row>
              		</Grid>
            				</Tab>
            				<Tab eventKey="Building" title="Building">

            				<br/>
            				<Building name={this.state.activeItemName}/>
            				</Tab>
            			</Tabs>
            		</Col>
            	</Row>
              
            </Modal.Content>
          </Modal>
          <Grid>

			</Grid>
			</div>

 		)
 }
} 
const mapStateToProps = state =>{
	return{
		errors:state.project.errors,
		project:state.project.project,
		feedback:state.feedback.feedback,
		building:state.feedback.building,
		detailyear:state.feedback.detailyear
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
		},
		getDetailByYear:(formdata)=>{
			dispatch(dashboard.getDetailByYear(formdata))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);