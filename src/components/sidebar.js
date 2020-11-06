import React,{Component} from 'react';
import { Header,Grid,Icon,Image,Menu,Segment,Sidebar,Accordion } from 'semantic-ui-react';
import logo from '../assets/logo.png';
import Profile from '../assets/profile.png';
import './sidebar.css';
import {connect} from 'react-redux';
import {locus} from '../actions';
import {history} from '../_helpers/history';







class SideNavbar extends Component{
	state={
		assets:''
	}

	componentDidMount(){
		this.props.getLocations();
	}
	componentDidUpdate(prevProps,prevState){
		if(prevProps.locus!==this.props.locus){
			this.setState({assets:this.props.locus})
		}
	}
	addLocation(assets){
		console.log("transfer",assets);
		history.push({
			pathname:'/location',
			state:{
				assets:assets,
			}
		})

	}
	render(){
			

		
		let user_id = localStorage.getItem('user_id')
		const assets = this.props.locus.filter(location=>location.users_id==user_id)
		console.log("assets",assets.length);
		let Level1AContent =[];
		let level1Panels=[];
		
		console.log("assetslengngrg",assets.length)
		let x=0;
		for(let i=0;i<assets.length;i++){


			for(let j=0;j<assets[i].assets.length;j++){
			
			
			
			if(j==(assets[i].assets.length-1)){
				Level1AContent.push(
					(<div onClick={()=>this.addLocation(assets[i])}><p style={{fontSize:'14px',marginLeft:'25%'}}>{assets[i].assets[j].name} <Icon name="plus circle" style={{cursor:'pointer'}}></Icon></p></div>))
			}
			else{
				Level1AContent.push(
				(<div><p style={{fontSize:'14px',marginLeft:'25%'}}>{assets[i].assets[j].name}</p></div>)
			)
			}
		}


			level1Panels.push({
				key:'panel-'+i+'a',
				title:assets[i].name,
				content:{content:Level1AContent}
			})
			Level1AContent=[];
		
		}
	
	
			
		
		
		console.log("sidebar",level1Panels)
	

	const Level1Content = (
  <div>
    
    <Accordion.Accordion panels={level1Panels} />
  </div>
)

const level2Panels = [
  { key: 'panel-2a', title: 'Level 2A', content: 'Level 2A Contents' },
  { key: 'panel-2b', title: 'Level 2B', content: 'Level 2B Contents' },
]

const Level2Content = (
  <div>
    Welcome to level 2
    <Accordion.Accordion panels={level2Panels} />
  </div>
)

const rootPanels = [
  { key: 'panel-1', title: {children:(<a><Icon name="folder"></Icon>My Assets</a>)}, content: { content: Level1Content } }
  
]

		
		return(
			<Sidebar
				as={Menu}
				animation='overlay'
				icon='labeled'
				
				vertical
				visible
				width='wide'>

				<Menu.Item>
					
				</Menu.Item>
				<br/><br/><br/><br/><br/><br/>
				<Menu.Item>
				 <Accordion defaultActiveIndex={0} panels={rootPanels}  />
					
				</Menu.Item>
				<Menu.Item>
				<a href="/dashboard"><Icon name="dashboard" size="large"/>
				Dashboard</a>
				</Menu.Item>
				<Menu.Item>
				<a href="/project"><Icon name="file" size="large"/>
				Projects</a>
				</Menu.Item>
				<Menu.Item>
				<a href="/"><Icon name="home" size="large"/>
				Main</a>
				</Menu.Item>
				
				
				</Sidebar>
			)
	}
}
const mapStateToProps = state =>{
	return {
		errors:state.locus.errors,
		locus:state.locus.locus
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		getLocations:()=>{
			dispatch(locus.getLocations());
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(SideNavbar);