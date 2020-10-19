import React,{Component} from 'react';
import { Header,Icon,Image,Menu,Segment,Sidebar } from 'semantic-ui-react';
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
				width='medium'>
				<Menu.Item>
				 <Image src={logo} size='small'/>		
				
				</Menu.Item>
				<Menu.Item>
					<Image src={Profile} size="mini"/>
				
				</Menu.Item>
				<Menu.Item inline>
					<Icon name="folder"/>My Assets
				</Menu.Item>
				<Menu.Item>
				<Icon name="dashboard"/>
				Dashboard
				</Menu.Item>
				<Menu.Item>
				<Icon name="file"/>
				Projects
				</Menu.Item>
				<Menu.Item>
				<Icon name="home"/>
				Main
				</Menu.Item>
				
				</Sidebar>
			)
	}
}
export default SideNavbar;