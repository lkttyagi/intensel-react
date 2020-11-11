import React,{Component} from 'react';
import SideNavbar from './oldsidebar';
import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal,Popup,Dropdown,Accordion} from 'semantic-ui-react';
import './location.css';
import 	{ loadModules } from 'esri-loader';
import { CSVReader } from 	'react-papaparse';
import logo from '../assets/logo.png';
import home from '../assets/home.png';
import add from '../assets/images/add.png';
import sample from '../assets/image.png';
import search from '../assets/search.png';
import {connect} from 'react-redux';	
import {locus,auth} from '../actions';

import companyList from '../data.json';
import {company} from '../actions';
import 	Suggestion from './suggestion';


const buttonRef = React.createRef();
let mapcards=[];
let selectList='';
let optionList=[];
let newmapcards=[];


class Location extends Component{
	constructor(props){
		super(props);
		this.mapRef=React.createRef();
	}

	state={
		upload:'',
		file:false,
		locations:[],
		query:'',
		option:'',
		company:[],
		portfolio:'',
		selectedOption:null,
		newlocations:[],

		
	};
	handleClick = (e,titleProps)=>{
		const {index} = titleProps
		const {activeIndex} = this.state
		const newIndex = activeIndex  === index ?-1:index
		this.setState({activeIndex:newIndex})
	}
	
	handleChange = (e,{value}) =>{
		this.setState({selectedOption:value},()=>console.log("selectedoption",this.state.selectedOption))

	}
	onSubmit = (e) =>{
		e.preventDefault();
		let formdata = new FormData();
		
		formdata.append("value",JSON.stringify(this.state.locations))
		formdata.append("portfolio_name",this.state.portfolio)
		console.log("final data",formdata.get("location"))
		this.props.addLocations(formdata)

	}

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
		loadModules(['esri/Map', 'esri/views/MapView','esri/layers/FeatureLayer','esri/widgets/Legend','esri/Graphic','esri/widgets/Search','esri/tasks/Locator'], { css: true })
    .then(([ArcGISMap, MapView,FeatureLayer,Legend,Graphic,Search,Locator]) => {
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
        	var locator = new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN");
        	var params = {
        		location:event.mapPoint,
        		
        	};

        	locator.locationToAddress(params)
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
    
    

    	
		
	}
	
	componentWillUnmount(){
		if(this.view){
			this.view.destroy();
		}
	}

	
	
	handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }
  handleRemoveLocation = (index) =>{
  		var array = [...this.state.locations];
  		
  		if(index!==-1){
  			array.splice(index,1);
  			this.setState({locations:array});
  			mapcards.splice(index,1);
  		}
  }
  handleRemoveNewLocation = (index) =>{
  	var array =[...this.state.newlocations];
  	if(index!==-1){
  		array.splice(index,1);
  		this.setState({newlocations:array});
  		newmapcards.splice(index,1);
  	}
  }
  handleSearch =(e,{value})=>{

  	this.setState({company:value},()=>console.log(this.state.company));
  	
  	for(let i=0;i<this.state.company.length;i++){
  		let LocationList = companyList.filter(company=>company.NAME===this.state.company[i])
  		  	
  		  	console.log("Location company",LocationList);
  		  	for(let j=0;j<LocationList[i].loc.length;j++){
  		  		console.log("chal raha hai ")
  		  		let a = LocationList[i].loc
  		  		console.log("ye a hai",a)
  		  		let b = a.replace(/'/g,'"');
  		  		console.log("ye b hai ",b);
  		  		console.log("b",JSON.parse(b)[0]);	
  		  	}

		}
  	
  }
  handleOptions =(e)=>{
  	
  	if(e.target.value.length>1){
  		this.selectList=companyList.filter(company=>company.NAME.slice(0,2)==e.target.value.slice(0,2))
  		
  		let searchList = this.selectList.map(({NAME}) =>{
	return{
		key:NAME,
		value:NAME,
		text:NAME
	}
})      
  		
  		this.setState({option:searchList},()=>console.log("option",this.state.option));
  		
  	}
  	
  	  		this.setState({query:e.target.value},()=>console.log(this.state.query))

  }
  handleLogout =()=>{
  	this.props.logout()
  }




	render(){
		const {activeIndex} = this.state

		if(this.props.location.state)
		{	
		let newmapcards = this.props.location.state.assets.assets
		
		var newcards=[];
		

		if(newmapcards.length>0){
			
			
			console.log("newcards",newmapcards);

			this.state.newlocations=newmapcards;

			console.log("this.s",this.state.newlocations)
			for(let i=0;i<this.state.newlocations.length;i++){
				newcards.push(
					<Grid.Column width="2" className="cont">
					
					<Label className="card">
					<div className="front">
						<div className="img-cont">

							<Image src={home} alt="" style={{float:'center'}} verticalAlign="middle"/>
						</div>
						<div className="content-cont">
							<p style={{textAlign:'center',color:'#015edc',fontSize:'12px'}}>{this.state.newlocations[i].name}</p>

						</div>

					</div>
					<div className="back">
						<button style={{float:'right',backgroundColor:'white',border:'0px',fontSize:'10px',color:'grey',marginLeft:'55%'}} onClick={()=>this.handleRemoveNewLocation(i)}><Image src={search} style={{float:'right',padding:'8px',opacity:'0.5'}}color='grey' size='mini'/></button>

						<p style={{textAlign:'center',color:'#015edc',fontSize:'12px'}}><Icon name="map marker alternate" style={{color:'#015edc'}} size="large"/><br/>Lat {this.state.newlocations[i].latitude}<br/>Long {this.state.newlocations[i].longitude}</p>

					</div>

				</Label>

				</Grid.Column>)	
			}

			
			
		}
	}
		
		const {value}=this.state;
		var cards=[];
		if(mapcards.length>0){
		
			console.log("mapcardsssssssss",this.state.locations);
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
						<button style={{float:'right',backgroundColor:'white',border:'0px',fontSize:'10px',color:'grey',marginLeft:'55%'}} onClick={()=>this.handleRemoveLocation(i)}><Image src={search} style={{float:'right',padding:'8px',opacity:'0.5'}}color='grey' size='mini'/></button>

						<p style={{textAlign:'center',color:'#015edc',fontSize:'12px'}}><Icon name="map marker alternate" style={{color:'#015edc'}} size="large"/><br/>Lat {this.state.locations[i][1]}<br/>Long {this.state.locations[i][2]}</p>

					</div>

				</Label>

				</Grid.Column>)
			}
		}
		
				

		
		
		return(
			<div>
			<Menu style={{minHeight:'4.00em',margin:'0rem 0',backgroundColor:'#f7f6f6'}} fixed="top">
			    
				<Menu.Item>
			    <Image src={logo} size='small' style={{marginLeft:'5%'}}/>		
			    </Menu.Item>
			    <Menu.Item style={{marginLeft:'40%'}}><p style={{fontSize:'18px'}}>Add Assets</p></Menu.Item>
				<Menu.Item
				 
				 position="right"
				 
				 >
				<Button  onClick={this.handleLogout}style={{borderRadius:5,backgroundColor:'#f7f6f6',float:'right'}}><Icon name="power"/></Button>

				 </Menu.Item>
			</Menu>

			<SideNavbar/>
		<br/><br/><br/><br/><br/>
		<Grid  padded>
			<Grid.Row className="mapRow" style={{height:'650px'}}>
			
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="11" className="map">
			<br/>
			<Header className="asset" as="h5" style={{color:'#6a6952'}}>Select on Map using Marker <Icon style={{float:'right'}}name="caret down" size="mini"/></Header>
				<div id="viewDiv"></div>
			
			</Grid.Column>

			</Grid.Row>
				
			<Grid.Row>
			<Grid.Column width="4"></Grid.Column>
			<Grid.Column width="11">
			
			<br/>
			<Accordion>
			<Accordion.Title
			active={activeIndex===0}
			index={0}
			onClick={this.handleClick}>
						<Header className="asset" as="h5" style={{color:'#6a6952'}}>Upload using CSV File
<Popup content="Upload location in csv file with column names in order , name;latitude;longitude" trigger={<Button style={{padding:'0.3rem 0.3rem',fontSize:'0.5rem',margin:'0.5rem',borderRadius:'50%',backgroundColor:'white',border:'0.5px solid grey'}}icon='info' size="mini"/>}/><Icon style={{float:'right'}}name="caret down" size="mini"/> </Header>
			</Accordion.Title>
			<br/>
			<br/>
			<Accordion.Content active={activeIndex ===0}>
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
		</Accordion.Content>	
		
			
				<Accordion.Title
				active={activeIndex===1}
				index={1}
				onClick={this.handleClick}
				>
				<Header className="asset" as="h5" style={{color:'#6a6952'}}>Search For Company
<Popup content="Upload location in csv file with column names in order , name;latitude;longitude" trigger={<Button style={{padding:'0.3rem 0.3rem',fontSize:'0.5rem',margin:'0.5rem',borderRadius:'50%',backgroundColor:'white',border:'0.5px solid grey'}}icon='info' size="mini"/>}/><Icon style={{float:'right'}}name="caret down" size="mini"/> </Header></Accordion.Title>
				<Accordion.Content active={activeIndex===1}>
				<Dropdown 
					placeholder="company"
					fluid
					multiple
					search
					selection 
					value={value}
					onChange={this.handleSearch}
					options={this.state.option}
					onKeyUp={this.handleOptions}
					/>
				</Accordion.Content>
			</Accordion>
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
			<br/>
			{(this.props.location.state)?<div><Header as="h2" textAlign="left">My Assets</Header><Grid.Row>
			{newcards}</Grid.Row></div>:null}
			<br/>
			

			<Button primary onClick={this.onSubmit}style={{borderRadius:5,backgroundColor:'#015edc',float:'right',marginTop:'30px',marginRight:'30px',marginBottom:'30px'}}>SUBMIT</Button>

			</Grid.Column>

			</Grid.Row>
			</Grid>

			</div>

			)
	}
}

const mapStateToProps = state =>{
	
	return{
		errors:state.locus.errors,
		locus:state.locus,
		company:state.company.company
	}

}
const mapDispatchToPros = dispatch =>{
	return{
		addLocations:(formdata)=>{
			dispatch(locus.addLocations(formdata));
		},
		getCompany:()=>{
			dispatch(company.getCompanies());
		},
		logout:()=>{
			dispatch(auth.logout());
		}
	}
}

export default connect(mapStateToProps,mapDispatchToPros)(Location);