import React,{Component} from 'react';
import SideNavbar from './sidebar';
import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal} from 'semantic-ui-react';
import './location.css';
import 	{ loadModules } from 'esri-loader';
import { CSVReader } from 	'react-papaparse';
import logo from '../assets/logo.png';


const buttonRef = React.createRef();
let mapcards=[];
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
	for(let i=1;i<data.length-1;i++){	
		mapcards.push(data[i].data);
	}
	this.setState({locations:mapcards},()=>console.log(this.state.locations))
	}
	handelOnError =(err,file,inputElem,reason) =>{
		console.log(err);
	}

	
	handleFile =() =>this.setState({upload:'csv'});
	handleMap =() =>this.setState({upload:'map'});

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
        mapcards.push(['Asset',event.mapPoint.latitude,event.mapPoint.longitude])
        that.setState({locations:mapcards},()=>console.log(that.state.locations))

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
    
    	
    this.handleMaplocation();	
		
	}
	componentDidUpdate(prevProps,prevState){
		if(prevState.locations !== mapcards){
			this.setState({locations:mapcards},()=>console.log("jdnkjjjjjjjjjjj",this.state.locations))
		}
	}
	componentWillUnmount(){
		if(this.view){
			this.view.destroy();
		}
	}
	
	handleMaplocation(){
		if(mapcards.length>0){
			for(let i=0;i<mapcards.length;i++){
			   this.state.locations.push(mapcards[i])
			   console.log("locations",this.state.locations);
		}
		}

	}




	render(){
		var cards=[];
		
		if(mapcards.length>0){
			console.log("mapcardsssssssss",mapcards);
		for(let i=0;i<this.state.locations.length;i++){
				cards.push(
					<Grid.Column width="2">
					
					<Label style={{fontSize:'14px',backgroundColor:'white',borderRadius:'10px',border:'1px solid black',margin:'5px'}}>
					<Icon name="home" size="large"/>{this.state.locations[i][0]}<br/><br/><br/>
					<Icon name="map marker" size="large"/>Lat {this.state.locations[i][1]}<br/><p style={{float:'right',fontSize:'14px',fontWeight:'bold'}}>Long {this.state.locations[i][2]}</p>
				</Label>
				</Grid.Column>)
			}
		}
		
				

		
		
		return(
			<div>
			<Menu style={{minHeight:'4.35em',margin:'0rem 0'}}>
				<Menu.Item>
			    <Image src={logo} size='small' style={{marginLeft:'150px'}}/>		
			    </Menu.Item>
				<Menu.Item
				 name="logout"
				 position="right"
				 />
			</Menu>

			<SideNavbar/>
			
		<Grid  padded>
			<Grid.Row className="mapRow" style={{height:'650px'}}>
			
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="11" className="map">
			<br/>
			<Header as="h2" textAlign="center">Add Assets</Header>
			<p>Select on Map using Marker</p>
				<div id="viewDiv"></div>
			
			</Grid.Column>

			</Grid.Row>
				
			<Grid.Row>
			<Grid.Column width="7"></Grid.Column>
			<Grid.Column width="6">
			
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
            
              
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                height: 45,
                lineHeight: 2.5,
                marginTop: 0,
                marginBottom: 0,
                paddingLeft: 5,
                paddingTop: 3,
                width: '60%',
                borderRadius:5
              }}
            >
              {file && file.name}
            </div>
            <button
              type='button'
              onClick={this.handleOpenDialog}
              style={{
                borderRadius: 5,
                marginLeft: 0,
                marginRight: 0,
                width: '15%',
                paddingLeft: 0,
                paddingRight: 0,
                border:0,
                backgroundColor:'#1d99e8',
                color:'white'
              }}
            >
              <Icon name="upload"/>
            </button>
          </aside>
        )}
      </CSVReader>
			
			</Grid.Column>
			</Grid.Row>
			<Grid.Row>

			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="12">
						
						
						
			</Grid.Column>
			</Grid.Row>
			
			<Grid.Row className="cards">
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="10">
			<Grid.Row>

				{cards}
			</Grid.Row>	
			<Button primary style={{borderRadius:5,backgroundColor:'#1d99e8',float:'right',marginTop:'30px',marginRight:'30px',marginBottom:'30px'}}>SUBMIT</Button>

			</Grid.Column>

			</Grid.Row>
			</Grid>

			</div>

			)
	}
}

export default Location