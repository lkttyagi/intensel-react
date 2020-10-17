import React,{Component} from 'react';
import { Header,Icon,Image,Menu,Segment,Sidebar } from 'semantic-ui-react';
import logo from '../assets/logo.png';
import Profile from '../assets/profile.png';
 

class SideNavbar extends Component{
	render(){
		return(
			<Sidebar
				as={Menu}
				animation='overlay'
				icon='labeled'
				
				vertical
				visible
				width='thin'>
				<Menu.Item as='a'>
				 <Image src={logo} size='small'/>		
				
				</Menu.Item>
				<Menu.Item as='b'>
					<Image src={Profile} size="mini"/>
				
				</Menu.Item>
				<Menu.Item as='c'>
					
				My Assets
				</Menu.Item>
				<Menu.Item as='d'>
				Dashboard
				</Menu.Item>
				<Menu.Item as='d'>
				Projects
				</Menu.Item>
				<Menu.Item as='d'>
				Main
				</Menu.Item>
				
				</Sidebar>
			)
	}
}
export default SideNavbar;