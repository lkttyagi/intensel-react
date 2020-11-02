import React ,{Component} from 'react';
import SideNavbar from './sidebar';
import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal,Popup,Select} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import home from '../assets/home.png';
import add from '../assets/images/add.png';
import search from '../assets/search.png';
import 	{ loadModules } from 'esri-loader';
import { withRouter } from 'react-router-dom';



class Dashboard extends Component{


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

export default withRouter(Dashboard);