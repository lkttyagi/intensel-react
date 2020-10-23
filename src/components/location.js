import React,{Component} from 'react';
import SideNavbar from './sidebar';
import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal,Popup} from 'semantic-ui-react';
import './location.css';
import 	{ loadModules } from 'esri-loader';
import { CSVReader } from 	'react-papaparse';
import logo from '../assets/logo.png';
import home from '../assets/home.png';
import add from '../assets/images/add.png';
import search from '../assets/search.png';

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
		locations:'',
		
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
        search.clear();
        
        if(search.activeSource){
        	var geocoder = search.activeSource.locator;
        	var params = {
        		location:event.mapPoint
        	};

        	geocoder.locationToAddress(params)
        		.then(function(response){
        			
        		 var address=response.address;
        		 mapcards.push([address,event.mapPoint.latitude,event.mapPoint.longitude])
        		 console.log("mapcard",mapcards)
        		        that.setState({locations:mapcards},()=>console.log("locations",that.state.locations))
	
        				
        		},function(err){
        			console.log("errror",err);
        		});
        }
        

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
	handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }




	render(){
		var cards=[];
		
		if(mapcards.length>0){
			console.log("mapcardsssssssss",mapcards);
		for(let i=0;i<this.state.locations.length;i++){
				cards.push(
					<Grid.Column width="2" className="cont">
					
					<Label className="card">
					<div className="front">
						<div className="img-cont">
							<Image src={home} alt="" style={{float:'center'}} verticalAlign="middle"/>
						</div>
						<div className="content-cont">
							<p style={{textAlign:'center',color:'#015edc',fontSize:'12px'}}>{this.state.locations[i][0]}</p>
						</div>
					</div>
					<div className="back">
						<p style={{textAlign:'center',color:'#015edc',fontSize:'12px'}}><Icon name="map marker alternate" style={{color:'#015edc'}} size="large"/><br/>Lat {this.state.locations[i][1]}<br/>Long {this.state.locations[i][2]}</p>
					</div>
				</Label>
				</Grid.Column>)
			}
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
			
		<Grid  padded>
			<Grid.Row className="mapRow" style={{height:'650px'}}>
			
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="11" className="map">
			<br/>
			<Header as="h2" style={{color:'#6a6952'}}><Image src={add} size="medium" style={{marginTop:'-0.5rem'}}/> Add Assets<Popup content="Use the marker to select location on map ans see the assets added below." trigger={<Button style={{padding:'0.3rem 0.3rem',fontSize:'0.5rem',margin:'0.5rem',borderRadius:'50%',backgroundColor:'white',border:'0.5px solid grey'}}icon='info' size="mini"/>}/></Header>
			<p>Select on Map using Marker</p>
				<div id="viewDiv"></div>
			
			</Grid.Column>

			</Grid.Row>
				
			<Grid.Row>
			<Grid.Column width="7"></Grid.Column>
			<Grid.Column width="6">
			
			<br/>
			
			<p>Upload CSV File<Popup content="Upload location in csv file with column names in order name;latitude;longitude" trigger={<Button style={{padding:'0.3rem 0.3rem',fontSize:'0.5rem',margin:'0.5rem',borderRadius:'50%',backgroundColor:'white',border:'0.5px solid grey'}}icon='info' size="mini"/>}/> </p>
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
             <button style={{float:'right',backgroundColor:'white',border:'0px',fontSize:'30px',color:'grey'}} onClick={this.handleRemoveFile}><Image src={search} style={{padding:'8px',opacity:'0.5'}}color='grey' size='mini'/></button>
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
                backgroundColor:'#015edc',
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
			
			<Grid.Row>
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="12">
			<Grid.Row>

				{cards}
			</Grid.Row>	
			<Button primary style={{borderRadius:5,backgroundColor:'#015edc',float:'right',marginTop:'30px',marginRight:'30px',marginBottom:'30px'}}>SUBMIT</Button>

			</Grid.Column>

			</Grid.Row>
			</Grid>

			</div>

			)
	}
}

export default Location;