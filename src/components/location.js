import React,{Component} from 'react';
import SideNavbar from './sidebar';
import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal} from 'semantic-ui-react';
import './location.css';
import 	{ loadModules } from 'esri-loader';
import { CSVReader } from 	'react-papaparse';

const buttonRef = React.createRef();
var cards=[];
class Location extends Component{
	constructor(props){
		super(props);
		this.mapRef=React.createRef();
	}

	state={
		upload:'',
		file:false,
		locations:''
	};

	handleOpenDialog =(e) =>{
		if(buttonRef.current){
			buttonRef.current.open(e)
		}
	}
	handleFileLoad = data =>{
		
		this.setState({locations:data})
		console.log("data",this.state.locations)
	}
	handelOnError =(err,file,inputElem,reason) =>{
		console.log(err);
	}

	
	handleFile =() =>this.setState({upload:'csv'});
	handleMap =() =>this.setState({upload:'map'});

	componentDidMount(){
		loadModules(['esri/Map', 'esri/views/MapView','esri/layers/FeatureLayer','esri/widgets/Legend','esri/Graphic','esri/widgets/Search'], { css: true })
    .then(([ArcGISMap, MapView,FeatureLayer,Legend,Graphic,Search]) => {

    const defaultSym = {
        type: "simple-fill",
        outline: {
            
            color: [255, 255, 255, 0.5],
            width: "0.5px"
        }
    };
    const renderer = {
        type: "simple",
        symbol: defaultSym,
        
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
    const povLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Hong_Kong_Shapefile/FeatureServer/0",
        renderer: renderer,
        title: "Flood in Hong Kong",
        popupTemplate: {
            
            title: "{name}, {Type}",
            content:
            "Flood Value {FL8570}",
        }
    });

      const map = new ArcGISMap({
        basemap: 'streets-vector',
        layers: [povLayer]	
      });

      const view = new MapView({
        container:'viewDiv',
        map: map,
        center: [114.1838,22.2797],
        zoom: 17
      });

      var search = new Search({
    view: view
    });
    view.ui.add(search, "top-right");

       view.on("click", function(event){
       	console.log(event.mapPoint.latitude,event.mapPoint.longitude);
        createGraphic(event.mapPoint.latitude,event.mapPoint.longitude)
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
            color: [0, 0, 0]
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
	componentWillUnmount(){
		if(this.view){
			this.view.destroy();
		}
	}



	render(){

		
		if(this.state.locations.length>1){
		for(let i=1;i<this.state.locations.length-1;i++){
				cards.push(
					<div>
					<p>Selected Locations:</p>
					<Label style={{fontSize:'16px'}}>
					<Icon name="warehouse"/>
					{this.state.locations[i].data[0]},{this.state.locations[i].data[1]},{this.state.locations[i].data[2]}
				</Label>
				</div>)
			}
		}
		console.log("cards",cards);

		
		
		return(
			<div>
			<SideNavbar/>
			<Menu style={{minHeight:'4.35em',margin:'0rem 0'}}>
				<Menu.Item
				 name="logout"
				 position="right"
				 />
			</Menu>
			<Grid style={{height:'100vh'}} padded>
			<Grid.Row verticalAlign='middle'>
			<Grid.Column width="6"></Grid.Column>
			<Grid.Column width="6">
			<Header as="h1" textAlign="center">Add Assets</Header>
			<br/>
			<p>Upload CSV File </p>
			 <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        
      >
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}
          >
            <button
              type='button'
              onClick={this.handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                width: '15%',
                paddingLeft: 0,
                paddingRight: 0,
                border:0,
                backgroundColor:'#015edc',
                color:'white'
              }}
            >
              <Icon name="upload"/>
            </button>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 0,
                marginBottom: 0,
                paddingLeft: 13,
                paddingTop: 3,
                width: '60%'
              }}
            >
              {file && file.name}
            </div>
            <button
              style={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 20,
                paddingRight: 20,
                border:0,
                backgroundColor:'red',
                color:'white'
              }}
              
            >
              <Icon name="delete"/>
            </button>
          </aside>
        )}
      </CSVReader>
			
			</Grid.Column>
			</Grid.Row>
			<Grid.Row>

			<Grid.Column width="2"></Grid.Column>
			<Grid.Column width="14">
						<Header as="h1" textAlign="center">OR</Header>
						
						<p>Select on Map using Marker</p>
			</Grid.Column>
			</Grid.Row>
			<Grid.Row>
			<Grid.Column width="2"></Grid.Column>
			<Grid.Column width="14">
				<div id="viewDiv"></div>
			
			</Grid.Column>

			</Grid.Row>
			<Grid.Row>
			<Grid.Column width="2"></Grid.Column>
			<Grid.Column width="14">
				{cards}
			
			</Grid.Column>
			</Grid.Row>
			</Grid>

			<Button primary style={{borderRadius:0,backgroundColor:'#015edc',float:'right',marginTop:'30px',marginRight:'30px',marginBottom:'30px'}}>SUBMIT</Button>
			</div>

			)
	}
}

export default Location