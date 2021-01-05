import React,{Component} from 'react';
import {Button,Image,Menu,Icon} from 'semantic-ui-react';
import logo from '../assets/logo.png';
import {connect} from 'react-redux';
import {auth} from '../actions';
import SideNavbar from './sidebar';

import {
	setContainerClassnames,
  } from "../redux/actions";

class NavMenu extends Component{
	state={
		navButtonClicks: 0,
	}
	handleLogout=()=>{
		this.props.logout()
	}

	toggleSidebar = () => {
		this.setState({
			navButtonClicks: this.state.navButtonClicks + 1
		})
	}

	menuButtonClick = (e, menuClickCount, containerClassnames) => {
		e.preventDefault();
	
		setTimeout(() => {
		  var event = document.createEvent("HTMLEvents");
		  event.initEvent("resize", false, false);
		  window.dispatchEvent(event);
		}, 350);
		this.props.setContainerClassnames(
		  ++menuClickCount,
		  containerClassnames,
		  this.props.selectedMenuHasSubItems
		);
	  };



	render(){
		const { containerClassnames, menuClickCount } = this.props;
		return(	
			// <div id="app-container" className={containerClassnames}>
			<>
				<Menu style={{minHeight:'4.00em',margin:'0rem 0',backgroundColor:'#f7f6f6'}} fixed="top">
                    <Menu.Item>
                    <Button style={{"backgroundColor": "rgba(0,0,0,0)",  "fontSize": "33px", "padding": "0", "marginRight": "5%"}} onClick={e =>
						this.menuButtonClick(e, menuClickCount, containerClassnames)
					}>≡</Button>
                    <Image src={logo} size='small' style={{marginLeft:'5%'}}/>		
                    </Menu.Item>
                    <Menu.Item style={{margin:"0 auto"}}><p style={{fontSize:'18px'}}>{this.props.title}</p></Menu.Item>
                    <Menu.Item>
					<Button  onClick={this.handleLogout}style={{borderRadius:5,backgroundColor:'#f7f6f6',float:'right'}}><Icon style={{padding: 0}} name="power" size="big"/></Button>
                    </Menu.Item>
                </Menu>
                <SideNavbar navButtonClicks={this.state.navButtonClicks}/>
			</>
            // </div>
        )
		
		
		
	}
}

const mapStateToProps = ({ menu }) => {
	let { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
	return {
	  containerClassnames,
	  menuClickCount,
	  selectedMenuHasSubItems,
	};
};

const mapDispatchToProps = dispatch =>{
	return{
		logout:()=>{
			dispatch(auth.logout())
		},
		setContainerClassnames:(clickIndex, strCurrentClasses,selectedMenuHasSubItems) => {dispatch(setContainerClassnames(clickIndex, strCurrentClasses,selectedMenuHasSubItems))},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
