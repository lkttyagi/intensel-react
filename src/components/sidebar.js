import React,{Component} from 'react';
import { Header,Grid,Icon,Image,Menu,Segment,Sidebar } from 'semantic-ui-react';
import logo from '../assets/logo.png';
import Profile from '../assets/profile.png';
import './sidebar.css';

class SideNavbar extends Component{
	render(){
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
					<a><Icon name="folder" size="large"/>My assets</a>
				</Menu.Item>
				<Menu.Item>
				<a><Icon name="dashboard" size="large"/>
				Dashboard</a>
				</Menu.Item>
				<Menu.Item>
				<a><Icon name="file" size="large"/>
				Projects</a>
				</Menu.Item>
				<Menu.Item>
				<a><Icon name="home" size="large"/>
				Main</a>
				</Menu.Item>
				
				
				</Sidebar>
			)
	}
}
export default SideNavbar;