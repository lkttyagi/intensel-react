import React,{Component} from 'react';
import logo from '../assets/logo.png';
import {auth} from '../actions';
import '../assets/css/animate.css';
import '../assets/css/LineIcons.2.0.css';
import '../assets/css/style.css';
import '../assets/css/bootstrap-4.5.0.min.css';
import '../assets/css/default.css';
import {Redirect} from 'react-router-dom';
import hero from '../assets/images/header-hero.png';
import shape from '../assets/images/services-shape.svg';
import shape1 from '../assets/images/services-shape-1.svg';
import shape2 from '../assets/images/services-shape-2.svg';
import shape3 from '../assets/images/services-shape-3.svg';
import intenselSaasAdvantage from '../assets/images/intensel-saas-advantage.png';
import extremeheat from '../assets/images/extremeheat.png';
import flood from '../assets/images/flood.png';
import typhoon from '../assets/images/typhoon.png';
import {Navbar, Nav, Button, Card} from 'react-bootstrap';
import { Icon } from 'semantic-ui-react'
import styles from './home.module.css'

class Home extends Component{
	render(){
        if(auth.isUserAuthenticated()){
                    return <Redirect to="/location"/>
                }
       
		return(
        <>
			<div>
				  <header className="header-area">
        <Navbar className={`container ${styles.navbar}`}>
            <Navbar.Brand href="index.html"><img src={logo} alt="Intensel" height="50" width="150"/></Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="" className={styles.navlink}>Who we serve</Nav.Link>
                <Nav.Link href="" className={styles.navlink}>Services</Nav.Link>
                <Nav.Link href="" className={styles.navlink}>Product</Nav.Link>
                <Nav.Link href="" className={styles.navlink}>Saas</Nav.Link>
                <Nav.Link href="" className={styles.navlink}><Button>Request a demo</Button></Nav.Link>
            </Nav>
        </Navbar>
        
        <div id="home" className="header-hero bg_cover">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="header-hero-content">
                            <h4 style={{fontSize:'48px'}} className="header-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.5s">Discover Climate Risk with Intensel's new SaaS</h4>

                            <h3 className="header-sub-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s"></h3>
                            <p style={{fontSize:'20px'}} className="text wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.8s">All Inclusive Climate Risks with Finacial Dollar Loss</p>
                            <a href="/login" className={`main-btn wow fadeInUp ${styles.signInButton}`} data-wow-duration="1.3s" data-wow-delay="1.1s">Sign In</a>
                            <a href="/register" className={`main-btn wow fadeInUp ${styles.signUpButton}`} data-wow-duration="1.3s" data-wow-delay="1.1s">Sign Up</a>

                        </div> 
                    </div>
                    <div className="col-lg-6">
                        <div className="header-hero-image text-center wow fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
                            <img src={hero} alt="hero"/>
                        </div> 
                    </div>
                </div> 
                <div className="col" style={{display: 'inline-block'}}>
                    
                </div> 
            </div> 
            <div id="particles-1" className="particles"></div>
        </div> 
    </header>
    
  
    
    <section id="features" className="services-area pt-120">
        <div className="container">
            <div className="justify-content-center">
                <div className="section-title text-center pb-40">
                    <h3 className="title">Who we <span style={{color: "#005EDC", fontWeight: "inherit"}}>serve?</span></h3>
                </div>
                <div className={styles.sectionBody}>
                    <ul className={styles.customers}>
                        <li><i class="simple-icon-plane"/> CORPORATIONS</li>
                        <li><i class="simple-icon-plane"/> FINANCIAL INSTITUTIONS</li>
                        <li><i class="simple-icon-plane"/> REAL ESTATE INVESTORS</li>
                        <li><i class="simple-icon-plane"/> COMMUNTIES</li>
                    </ul>
                </div>
            </div> 

            <div className="justify-content-center">
                <div className="section-title text-center pb-40">
                    <h3 className="title">Why Intensel is <span style={{color: "#F3B94A", fontWeight: "inherit"}}>better product?</span></h3>
                </div> 
                <div className={`${styles.sectionBody} ${styles.whyIntensel}`}>
                    <Card>
                        <Card.Body>
                            <Card.Title className={styles.whyIntenselCardTitleOdd}>1</Card.Title>
                            <Card.Text>
                            Granular & Accurate
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title className={styles.whyIntenselCardTitleEven}>2</Card.Title>
                            <Card.Text>
                            Versatile & Comprehensive Product
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title className={styles.whyIntenselCardTitleOdd}>3</Card.Title>
                            <Card.Text>
                            Real-time Analytics
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title className={styles.whyIntenselCardTitleEven}>4</Card.Title>
                            <Card.Text>
                            Interactive
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div> 

            <div className="justify-content-center">
                <div className="section-title text-center pb-40">
                    <h3 className="title">INTENSEL <span style={{color: "#005EDC", fontWeight: "inherit"}}>Climate Solutions</span></h3>
                </div>
                <div className={`${styles.text} ${styles.sectionBody}`}>
                    <p>As businesses, investors and governments explore the transition to a net-zero world,</p>
                    <p>Intensel is committed to creating climate solutions to support investors’ decision-making.</p>
                    <p>Institutional investors should be able to analyze the exposure of their portfolios</p>
                    <p>to climate risk and opportunities while also being able to report on their climate strategy.</p>
                </div>
                <div className={`${styles.features} ${styles.sectionBody}`}>
                    <Card>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>CLIMATE DATA & ANALYTICS</Card.Title>
                            <Card.Text>
                            Extensive climate change metrics
                            including Climate Value-at-Risk,
                            carbon management assessment,
                            carbon emissions, clean tech
                            metrics and fossil fuel screens.
                            <br/>
                            <ul>
                                <li>State of the art model</li>
                                <li>Broad coverage across equities, fixed income and real estate</li>
                            </ul>
                            </Card.Text>
                            <Card.Link href="http://google.com" className="mt-auto"><Button>Explore more</Button></Card.Link>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>SCENARIO ANALYSIS</Card.Title>
                            <Card.Text>
                            Extensive climate change metrics
                            including Climate Value-at-Risk,
                            carbon management assessment,
                            carbon emissions, clean tech
                            metrics and fossil fuel screens
                            <br/>
                            <ul>
                                <li>Potential financial impact of different climate scenarios</li>
                                <li>Warming Potential of portfolio to assess alignment with the Paris Agreement</li>
                                <li>Climate stress testing</li>
                            </ul>
                            </Card.Text>
                            <Card.Link href="http://google.com" className="mt-auto"><Button>Explore more</Button></Card.Link>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>CLIMATE RISK REPORTING</Card.Title>
                            <Card.Text>
                            Extensive climate change metrics
                            including Climate Value-at-Risk,
                            carbon management assessment,
                            carbon emissions, clean tech
                            metrics and fossil fuel screens
                            <br/>
                            <ul>
                                <li>Intensel Carbon Portfolio Analytics</li>
                                <li>Intensel Climate Risk / TCFD report</li>
                                <li>Climate Value-at-Risk report</li>
                            </ul>
                            </Card.Text>
                            <Card.Link href="http://google.com" className="mt-auto"><Button>Explore more</Button></Card.Link>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>SCENARIO ANALYSIS</Card.Title>
                            <Card.Text>
                            Extensive climate change metrics
                            including Climate Value-at-Risk,
                            carbon management assessment,
                            carbon emissions, clean tech
                            metrics and fossil fuel screens
                            <br/>
                            <ul>
                                <li>Potential financial impact of different climate scenarios</li>
                                <li>Warming Potential of portfolio to assess alignment with the Paris Agreement</li>
                                <li>Climate stress testing</li>
                            </ul>
                            </Card.Text>
                            <Card.Link href="http://google.com" className="mt-auto"><Button>Explore more</Button></Card.Link>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>CLIMATE DATA & ANALYTICS</Card.Title>
                            <Card.Text>
                            Extensive climate change metrics
                            including Climate Value-at-Risk,
                            carbon management assessment,
                            carbon emissions, clean tech
                            metrics and fossil fuel screens.
                            <br/>
                            <ul>
                                <li>State of the art model</li>
                                <li>Broad coverage across equities, fixed income and real estate</li>
                            </ul>
                            </Card.Text>
                            <Card.Link href="http://google.com" className="mt-auto"><Button>Explore more</Button></Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </div> 

            <div className="justify-content-center">
                <div className="section-title text-center pb-40">
                    <h3 className="title"><span style={{color: "#F3B94A", fontWeight: "inherit"}}>Intensel</span> SaaS advantage</h3>
                </div> 
                <div className={`${styles.sectionBody} ${styles.text}`}>
                    <p>Our solution is a Cloud-based SAAS Product. We have real</p>
                    <p>time and most accurate analytics.</p>
                </div>
                <div className={`${styles.sectionBody} ${styles.intenselSaasAdvantage}`}>
                    <div>
                        <div className={styles.intenselSaasAdvantageItem}>
                            <Icon size="big" name="file alternate outline"/>
                            <p>Enables reporting and disclosure consistent with the TCFD framework.</p>
                        </div>
                        <div className={styles.intenselSaasAdvantageItem}>
                            <Icon size="big" name="file alternate outline"/>
                            <p>Reports transition, physical risks & opportunities in the financial terms to empower decision - making.</p>
                        </div>
                        <div className={styles.intenselSaasAdvantageItem}>
                            <Icon size="big" name="file alternate outline"/>
                            <p>Powered by transparent methodology and rigorous science.</p>
                        </div>
                        <div className={styles.intenselSaasAdvantageItem}>
                            <Icon size="big" name="file alternate outline"/>
                            <p>Provides global coverage with property/asset to portfolio-level analysis, multiple climate scenarios covering present day to the year 2100.</p>
                        </div>
                    </div>
                    <div>
                        <img src={intenselSaasAdvantage}/>
                    </div>
                </div>
            </div> 

            <div className="justify-content-center">
                <div className="section-title text-center pb-40">
                    <h3 className="title">Climate risk</h3>
                </div> 
                <div className={`${styles.sectionBody} ${styles.climateRisk}`}>
                    <div>
                        <div className={styles.climateRiskItem}>
                            <img src={extremeheat}/>
                            <p class={styles.climateRiskItemDescription}>Extreme heat is a period of high heat and humidity with temperatures above 90 degrees for at least two to three days. In extreme heat your body works extra hard to maintain a normal temperature, which can lead to death.<br/><a href="http://google.com">Learn more</a></p>
                            <p class={styles.climateRiskItemName}>EXTREME HEAT</p>
                        </div>
                        <div className={styles.climateRiskItem}>
                            <img src={flood}/>
                            <p class={styles.climateRiskItemDescription}>A flood is an overflow of water on normally dry ground. This is most commonly due to an overflowing river, a dam break, snowmelt, or heavy rainfall. Less commonly happening are tsunamis, storm surge.<br/><a href="http://google.com">Learn more</a></p>
                            <p class={styles.climateRiskItemName}>FLOOD</p>
                        </div>
                        <div className={styles.climateRiskItem}>
                            <img src={typhoon}/>
                            <p class={styles.climateRiskItemDescription}>A typhoon is a mature tropical cyclone that develops between 180° and 100°E in the Northern Hemisphere. It is the most active tropical cyclone basin on Earth, accounting for almost one-third of the world's annual tropical cyclones.<br/><a href="http://google.com">Learn more</a></p>
                            <p class={styles.climateRiskItemName}>TYPHOONS</p>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div> 
        </div> 
    </section>
    </div>
    <footer>
        <div className="container">
            <div>
                <i class="simple-icon-location-pin"/>
                <span>Intensel Limited, Unit 517, 5/F Building 19W, No.19 Science Park<br/>
                West Avenue, Hong Kong Science Park, Hong Kong</span>
            </div>
            <div>
                <i class="simple-icon-envelope"/>
                <span><span style={{fontWeight: "bold"}}>Email Us</span><br/><a href="http://google.com">info@intensel.com</a></span>
            </div>
        </div>
    </footer>
    </>
			)
	}
}
export default Home;
