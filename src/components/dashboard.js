import React ,{Component} from 'react';
import SideNavbar from './sidebar';
import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal,Popup,Select} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import home from '../assets/home.png';
import add from '../assets/images/add.png';
import search from '../assets/search.png';
import 	{ loadModules } from 'esri-loader';



class Dashboard extends Component{


	componentDidMount(){
		loadModules(['esri/Map', 'esri/views/MapView','esri/layers/FeatureLayer','esri/widgets/Legend','esri/Graphic','esri/widgets/Search'], { css: true })
    .then(([ArcGISMap, MapView,FeatureLayer,Legend,Graphic,Search]) => {
    let that =this;
    
      const map = new ArcGISMap({
        basemap: 'streets-vector',
        
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

			<SideNavbar/>
			
		<Grid  padded>
			<Grid.Row>
			
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="11">
			<br/>
			<Header as="h2" style={{color:'#6a6952'}}>Flood</Header>
			
		 
			
			</Grid.Column>

			</Grid.Row>
				
			<Grid.Row>
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="3">
				<p>Map Visualizations</p>
				<Icon name="calendar"/>Year of Flood<br/><br/>
				<Form.Field
					id="form-input-control-status"
					control={Select}
					
					
					value="2030"
					placeholder='Select year'
					onChange={e=>this.setState({status:e.target.value})}

				/>
				<Icon name="calendar"/>Scenario<br/><br/>
				<Form.Field
					id="form-input-control-status"
					control={Select}
					
					
					value="2030"
					placeholder='Select year'
					onChange={e=>this.setState({status:e.target.value})}

				/>
				<br/>
				<Icon name="calendar"/>Hazards<br/><br/>
				 <Form.Radio
					id="form-input-control-status"
					label="Tropical Cyclone storm surge"
					/>
					<Form.Radio
					id="form-input-control-status"
					label="Non Tropical Storng surge"
					/>
					<Form.Radio
					id="form-input-control-status"
					label="Flood"
					/>
					<Form.Radio
					id="form-input-control-status"
					label="Flood"
					/>
			</Grid.Column>
			<Grid.Column width="9">
			  <div id="viewDiv" style={{height:'600px'}}></div>
			
			</Grid.Column>

			</Grid.Row>
			</Grid>

			</div>

 		)
 }
} 

export default Dashboard;