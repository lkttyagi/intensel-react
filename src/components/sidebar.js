import React,{Component, Fragment} from 'react';
import { Header,Grid,Icon,Image,Menu,Segment,Sidebar,Accordion } from 'semantic-ui-react';
import logo from '../assets/logo.png';
import Profile from '../assets/profile.png';
import './sidebar.css';
import {connect} from 'react-redux';
import {locus} from '../actions';
import {history} from '../_helpers/history';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from 'react-router-dom';

import menuItems from '../constants/menu';

import {
	setContainerClassnames,
	addContainerClassname,
	changeDefaultClassnames,
	changeSelectedMenuHasSubItems
} from '../redux/actions';

import '../css/sass/themes/gogo.light.purple.scss'

class SideNavbar extends Component{
	constructor(props){
		super(props)
	}
	state={
		assets:'',
		isLevel2SidebarOpen: false,
		sidebarLevel: 1,
		sidebarDirection: "right",
		selectedParentMenu: '',
		viewingParentMenu: '',
		collapsedMenus: []
	}

	componentDidMount(){
		this.props.getLocations();
		window.addEventListener('resize', this.handleWindowResize);
		this.handleWindowResize();
		this.handleProps();
		this.setSelectedLiActive(this.setHasSubItemStatus);
	}
	componentDidUpdate(prevProps,prevState){
		if(prevProps.locus!==this.props.locus){
			this.setState({assets:this.props.locus})
		}
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.setSelectedLiActive(this.setHasSubItemStatus);
	  
			window.scrollTo(0, 0);
		  }
		  this.handleProps();
	}
	componentWillUnmount() {
		this.removeEvents();
		window.removeEventListener('resize', this.handleWindowResize);
	  }
	shouldComponentUpdate(nextProps, nextState){
		if(this.props.navButtonClicks == nextProps.navButtonClicks - 1){
			this.toggleSidebar()
			return false
		} else{
			return true
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
	handleWindowResize = event => {
		if (event && !event.isTrusted) {
		  return;
		}
		const { containerClassnames } = this.props;
		let nextClasses = this.getMenuClassesForResize(containerClassnames);
		this.props.setContainerClassnames(
		  0,
		  nextClasses.join(' '),
		  this.props.selectedMenuHasSubItems
		);
	  };

	  handleDocumentClick = e => {
		const container = this.getContainer();
		let isMenuClick = false;
		if (
		  e.target &&
		  e.target.classList &&
		  (e.target.classList.contains('menu-button') ||
			e.target.classList.contains('menu-button-mobile'))
		) {
		  isMenuClick = true;
		} else if (
		  e.target.parentElement &&
		  e.target.parentElement.classList &&
		  (e.target.parentElement.classList.contains('menu-button') ||
			e.target.parentElement.classList.contains('menu-button-mobile'))
		) {
		  isMenuClick = true;
		} else if (
		  e.target.parentElement &&
		  e.target.parentElement.parentElement &&
		  e.target.parentElement.parentElement.classList &&
		  (e.target.parentElement.parentElement.classList.contains('menu-button') ||
			e.target.parentElement.parentElement.classList.contains(
			  'menu-button-mobile'
			))
		) {
		  isMenuClick = true;
		}
		if (container.contains(e.target) || container === e.target || isMenuClick) {
		  return;
		}
		this.setState({
		  viewingParentMenu: ''
		});
		this.toggle();
	  };
	
	  getMenuClassesForResize = classes => {
		const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
		let nextClasses = classes.split(' ').filter(x => x !== '');
		const windowWidth = window.innerWidth;
		if (windowWidth < menuHiddenBreakpoint) {
		  nextClasses.push('menu-mobile');
		} else {
		  nextClasses = nextClasses.filter(x => x !== 'menu-mobile');
		  if (
			nextClasses.includes('menu-default') &&
			nextClasses.includes('menu-sub-hidden')
		  ) {
			nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden');
		  }
		}
		return nextClasses;
	  };
	
	  getContainer = () => {
		return ReactDOM.findDOMNode(this);
	  };
	toggle = () => {
		const hasSubItems = this.getIsHasSubItem();
		this.props.changeSelectedMenuHasSubItems(hasSubItems);
		const { containerClassnames, menuClickCount } = this.props;
		const currentClasses = containerClassnames
		  ? containerClassnames.split(' ').filter(x => x !== '')
		  : '';
		let clickIndex = -1;

		if (!hasSubItems) {
		  if (
			currentClasses.includes('menu-default') &&
			(menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
		  ) {
			clickIndex = 1;
		  } else if (
			currentClasses.includes('menu-sub-hidden') &&
			(menuClickCount === 2 || menuClickCount === 3)
		  ) {
			clickIndex = 0;
		  } else if (
			currentClasses.includes('menu-hidden') ||
			currentClasses.includes('menu-mobile')
		  ) {
			clickIndex = 0;
		  }
		} else {
		  if (currentClasses.includes('menu-sub-hidden') && menuClickCount === 3) {
			clickIndex = 2;
		  } else if (
			currentClasses.includes('menu-hidden') ||
			currentClasses.includes('menu-mobile')
		  ) {
			clickIndex = 0;
		  }
		}
		if (clickIndex >= 0) {
		  this.props.setContainerClassnames(
			clickIndex,
			containerClassnames,
			hasSubItems
		  );
		}
	  };
	
	  handleProps = () => {
		this.addEvents();
	  };
	
	  addEvents = () => {
		['click', 'touchstart', 'touchend'].forEach(event =>
		  document.addEventListener(event, this.handleDocumentClick, true)
		);
	  };
	
	  removeEvents = () => {
		['click', 'touchstart', 'touchend'].forEach(event =>
		  document.removeEventListener(event, this.handleDocumentClick, true)
		);
	  };
	
	  setSelectedLiActive = callback => {
		const oldli = document.querySelector('.sub-menu  li.active');
		if (oldli != null) {
		  oldli.classList.remove('active');
		}
	
		const oldliSub = document.querySelector('.third-level-menu  li.active');
		if (oldliSub != null) {
		  oldliSub.classList.remove('active');
		}
	
		/* set selected parent menu */
		const selectedSublink = document.querySelector('.third-level-menu  a.active');
		if (selectedSublink != null) {
		  selectedSublink.parentElement.classList.add('active');
		}
	
		const selectedlink = document.querySelector('.sub-menu  a.active');
		if (selectedlink != null) {
		  selectedlink.parentElement.classList.add('active');
		  this.setState(
			{
			  selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
				'data-parent'
			  )
			},
			callback
		  );
		} else {
		  var selectedParentNoSubItem = document.querySelector(
			'.main-menu  li a.active'
		  );
		  if (selectedParentNoSubItem != null) {
			this.setState(
			  {
				selectedParentMenu: selectedParentNoSubItem.getAttribute(
				  'data-flag'
				)
			  },
			  callback
			);
		  } else if (this.state.selectedParentMenu === '') {
			this.setState(
			  {
				selectedParentMenu: menuItems[0].id
			  },
			  callback
			);
		  }
		}
	  };
	
	  setHasSubItemStatus = () => {
		const hasSubmenu = this.getIsHasSubItem();
		this.props.changeSelectedMenuHasSubItems(hasSubmenu);
		this.toggle();
	  };
	
	  getIsHasSubItem = () => {
		const { selectedParentMenu } = this.state;
		const menuItem = menuItems.find(x => x.id === selectedParentMenu);
		if (menuItem)
		  return menuItem && menuItem.subs && menuItem.subs.length > 0
			? true
			: false;
		else return false;
	  };
	  openSubMenu = (e, menuItem) => {
		const selectedParent = menuItem.id;
		const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
		this.props.changeSelectedMenuHasSubItems(hasSubMenu);

		if(selectedParent == "My Assets"){
			for(let i = 1; i < document.getElementsByClassName("rotate-arrow-icon opacity-50").length; i++){
				document.getElementsByClassName("rotate-arrow-icon opacity-50")[i].click()
			}
		}

		if (!hasSubMenu) {
		  this.setState({
			viewingParentMenu: selectedParent,
			selectedParentMenu: selectedParent
		  });
		  this.toggle();
		} else {
		  e.preventDefault();
	
		  const { containerClassnames, menuClickCount } = this.props;
		  const currentClasses = containerClassnames
			? containerClassnames.split(' ').filter(x => x !== '')
			: '';

			if (!currentClasses.includes('menu-mobile')) {
			if (
			  currentClasses.includes('menu-sub-hidden') &&
			  (menuClickCount === 2 || menuClickCount === 0)
			) {
			  this.props.setContainerClassnames(3, containerClassnames, hasSubMenu);
			} else if (
			  currentClasses.includes('menu-hidden') &&
			  (menuClickCount === 1 || menuClickCount === 3)
			) {
			  this.props.setContainerClassnames(2, containerClassnames, hasSubMenu);
			} else if (
			  currentClasses.includes('menu-default') &&
			  !currentClasses.includes('menu-sub-hidden') &&
			  (menuClickCount === 1 || menuClickCount === 3)
			) {
			  this.props.setContainerClassnames(0, containerClassnames, hasSubMenu);
			}
		  } else {
			this.props.addContainerClassname(
			  'sub-show-temporary',
			  containerClassnames
			);
		  }
		  this.setState({
			viewingParentMenu: selectedParent
		  });
		}
	  };
	
	  toggleMenuCollapse = (e, menuKey) => {
		e.preventDefault();
	
		let collapsedMenus = this.state.collapsedMenus;
		if (collapsedMenus.indexOf(menuKey) > -1) {
		  this.setState({
			collapsedMenus: collapsedMenus.filter(x => x !== menuKey)
		  });
		} else {
		  collapsedMenus.push(menuKey);
		  this.setState({
			collapsedMenus
		  });
		}
		return false;
	  };
	render(){
			
		let assets='';
		let user_id = localStorage.getItem('user_id')
		if(this.props.locus && this.props.locus.length>0){
		assets = this.props.locus.filter(location=>location.users_id==user_id)
	}
		console.log("assets",assets.length);
		let Level1AContent =[];
		let level1Panels=[];
		
		console.log("assetslengngrg",assets.length)
		let x=0;
		if(assets.length>5){
			console.log("klegmmd",assets.slice(0,5))
			assets.length=5;
		}

		if(history.location.pathname == "/project"){
			for(let i=0;i<assets.length;i++){


				for(let j=0;j<assets[i].assets.length;j++){
				
				
				
				if(j==(assets[i].assets.length-1)){
					// Level1AContent.push(
					// 	(<div onClick={()=>this.addLocation(assets[i])}><p style={{fontSize:'14px',marginLeft:'25%'}}>{assets[i].assets[j].name} <Icon name="plus circle" style={{cursor:'pointer'}}></Icon></p></div>))
					// Level1AContent.push(
					// 	(<div><p style={{fontSize:'14px',marginLeft:'25%'}}>{assets[i].assets[j].name}</p></div>))
					// Level1AContent.push(
					// 	(<div onClick={()=>this.addLocation(assets[i])}><p style={{fontSize:'14px',marginLeft:'25%'}}><Icon name="plus circle" style={{cursor:'pointer'}}></Icon></p></div>))
					Level1AContent.push(({
						icon: "iconsminds-map-marker-2",
						label: assets[i].assets[j].name,
						to: "/project/assets"
					}))
					Level1AContent.push(({
						label: "Add",
						icon: "iconsminds-add",
						onClick: ()=>this.addLocation(assets[i]),
					}))
				}
				else{
					// Level1AContent.push(
					// (<div><p style={{fontSize:'14px',marginLeft:'25%'}}>{assets[i].assets[j].name}</p></div>)

					Level1AContent.push(({
						icon: "iconsminds-map-marker-2",
						label: assets[i].assets[j].name,
						to: "/project/assets"
					}))
				}
			}


				level1Panels.push({
					id: "location" + i,
					label:assets[i].name,
					to: "/project",
					subs:Level1AContent
				})
				Level1AContent=[];
			
			}
			menuItems[0]["to"] = "/project/assets"
		} else {
			menuItems[0]["to"] = history.location.pathname + "/assets"
		}
		
	
		
			
		
		
		console.log("sidebar",level1Panels)
		menuItems[0]["subs"] = level1Panels
		console.log(level1Panels, "asdasdiasd")
		console.log(menuItems[0], "asdasdiasd")

	

// 	const Level1Content = (
//   <div>
    
//     <Accordion.Accordion panels={level1Panels} />
//   </div>
// )

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

// const rootPanels = [
//   { key: 'panel-1', title: {children:(<a><Icon name="folder"></Icon>My Assets</a>)}, content: { content: Level1Content } }
  
// ]

const {
	selectedParentMenu,
	viewingParentMenu,
	collapsedMenus
  } = this.state;

		
		return(
			<div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
			  options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {menuItems &&
                  menuItems.map(item => {
                    return (
                      <NavItem
                        key={item.id}
                        className={classnames({
                          active:
                            (selectedParentMenu === item.id &&
                              viewingParentMenu === '') ||
                            viewingParentMenu === item.id
                        })}
                      >
                        {item.newWindow ? (
                          <a
                            href={item.to}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className={item.icon} />{' '}
                            <span id={item.label}>{item.id}</span>
                          </a>
                        ) : (
                          <NavLink
                            to={item.to}
                            onClick={e => this.openSubMenu(e, item)}
                            data-flag={item.id}
                          >
                            <i className={item.icon} />{' '}
                            <span id={item.label}>{item.id}</span>
                          </NavLink>
                        )}
                      </NavItem>
                    );
                  })}
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>

        <div className="sub-menu">
          <div className="scroll">
            <PerfectScrollbar
			  options={{ suppressScrollX: true, wheelPropagation: false }}
			  style={{color: "red"}}
            >
              {menuItems &&
                menuItems.map(item => {
                  return (
                    <Nav
                      key={item.id}
                      className={classnames({
                        'd-block':
                          (this.state.selectedParentMenu === item.id &&
                            this.state.viewingParentMenu === '') ||
                          this.state.viewingParentMenu === item.id
                      })}
                      data-parent={item.id}
                    >
                      {item.subs &&
                        item.subs.map((sub, index) => {
                          return (
                            <NavItem
                              key={`${item.id}_${index}`}
                              className={`${
                                sub.subs && sub.subs.length > 0
                                  ? 'has-sub-item'
                                  : ''
                              }`}
                            >
                              {sub.newWindow ? (
                                <a
                                  href={sub.to}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <i className={sub.icon} />{' '}
                                  <span id={sub.label}>{sub.label}</span>
                                </a>
                              ) : sub.subs && sub.subs.length > 0 ? (
                                <Fragment>
                                  <NavLink
                                    className={`rotate-arrow-icon opacity-50 ${
                                      collapsedMenus.indexOf(
                                        `${item.id}_${index}`
                                      ) === -1
                                        ? ''
                                        : 'collapsed'
                                    }`}
                                    to={sub.to}
                                    id={`${item.id}_${index}`}
                                    onClick={e =>
                                      this.toggleMenuCollapse(
                                        e,
                                        `${item.id}_${index}`
									  )
                                    }
                                  >
                                    <i className="simple-icon-arrow-down" />{' '}
                                    <span id={sub.label}>{sub.label}</span>
                                  </NavLink>

                                  <Collapse
                                    isOpen={
                                      collapsedMenus.indexOf(
                                        `${item.id}_${index}`
                                      ) === -1
                                    }
                                  >
                                    <Nav className="third-level-menu">
                                      {sub.subs.map((thirdSub, thirdIndex) => {
                                        return (
                                          <NavItem
                                            key={`${
                                              item.id
                                            }_${index}_${thirdIndex}`}
                                          >
                                            {thirdSub.newWindow ? (
                                              <a
                                                href={thirdSub.to}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                              >
                                                <i className={thirdSub.icon} />{' '}
                                                <span
                                                  id={thirdSub.label}
                                                >{thirdSub.label}</span>
                                              </a>
                                            ) : thirdSub.label == "Add" ? (
												<a onClick={thirdSub.onClick} style={{cursor:'pointer', marginLeft: "70%", width: "100%"}}>
													<i className={thirdSub.icon} />
												</a>
											) : (
                                              <NavLink to={thirdSub.to}>
                                                <i className={thirdSub.icon} />{' '}
                                                <span
												  id={thirdSub.label}
                                                >{thirdSub.label}</span>
                                              </NavLink>
                                            )}
                                          </NavItem>
                                        );
                                      })}
                                    </Nav>
                                  </Collapse>
                                </Fragment>
                              ) : (
                                <NavLink to={sub.to}>
                                  <i className={sub.icon} />{' '}
                                  <p id={sub.label}>{sub.label}</p>
                                </NavLink>
                              )}
                            </NavItem>
                          );
                        })}
                    </Nav>
                  );
                })}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
			// <div id={"sidebars"}>
			// 	<Sidebar
			// 		as={Menu}
			// 		animation='overlay'
			// 		icon='labeled'
			// 		id={"level1sidebar"}
			// 		className={"sidebar-open"}
			// 		vertical
			// 		visible={this.state.sidebarLevel >= 1}
			// 		width='wide'>
			// 		<Menu.Item>
			// 		<a onClick={this.toggleLevel2Sidebar}><Icon name="folder"></Icon><span>My Assets</span></a>
			// 		{/* <Accordion defaultActiveIndex={0} panels={rootPanels}  /> */}
						
			// 		</Menu.Item>
			// 		<Menu.Item>
			// 		<a href="/dashboard" style={{color: history.location.pathname == "/dashboard" ? "#1d99e8" : ""}}><Icon name="dashboard" size="large"/>
			// 		<span>Dashboard</span></a>
			// 		</Menu.Item>
			// 		<Menu.Item>
			// 		<a href="/project" style={{color: history.location.pathname == "/project" ? "#1d99e8" : ""}}><Icon name="file" size="large"/>
			// 		<span>Projects</span></a>
			// 		</Menu.Item>
			// 		<Menu.Item>
			// 		<a href="/" style={{color: history.location.pathname == "/location" ? "#1d99e8" : ""}}><Icon name="home" size="large"/>
			// 		<span>Main</span></a>
			// 		</Menu.Item>
					
					
			// 		</Sidebar>
			// 	{
			// 		this.maxSidebarLevel == 2 ? (
			// 			<Sidebar
			// 			as={Menu}
			// 			animation='overlay'
			// 			icon='labeled'
			// 			vertical
			// 			visible={this.state.sidebarLevel >= 2}
			// 			id={"level2sidebar"}
			// 			className={"sidebar-open", "animating"}
			// 			width='wide'>
			// 				<div>
			// 					<Accordion panels={level1Panels} />
			// 				</div>
			// 				</Sidebar>
			// 		) :
			// 		<></>
			// 	}
			// 	</div>
			)
	}
}
const mapStateToProps = state =>{
	const {
		containerClassnames,
		subHiddenBreakpoint,
		menuHiddenBreakpoint,
		menuClickCount,
		selectedMenuHasSubItems
	} = state.menu;

	return {
		errors:state.locus.errors,
		locus:state.locus.locus,
		containerClassnames,
		subHiddenBreakpoint,
		menuHiddenBreakpoint,
		menuClickCount,
		selectedMenuHasSubItems
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		getLocations:()=>{
			dispatch(locus.getLocations());
		},
		setContainerClassnames:(clickIndex, strCurrentClasses,selectedMenuHasSubItems) => {dispatch(setContainerClassnames(clickIndex, strCurrentClasses,selectedMenuHasSubItems))},
		addContainerClassname:(classname, strCurrentClasses) => {dispatch(addContainerClassname(classname, strCurrentClasses))},
		changeDefaultClassnames:(strCurrentClasses) => {dispatch(changeDefaultClassnames(strCurrentClasses))},
		changeSelectedMenuHasSubItems:(payload) => {dispatch(changeSelectedMenuHasSubItems(payload))},
		// setContainerClassnames,
		// addContainerClassname,
		// changeDefaultClassnames,
		// changeSelectedMenuHasSubItems
	}
}

export default withRouter(
	connect(
	  mapStateToProps,
	  mapDispatchToProps
	)(SideNavbar)
  );
