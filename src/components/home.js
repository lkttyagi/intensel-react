import React,{Component} from 'react';
import logo from '../assets/logo.png';

import '../assets/css/animate.css';
import '../assets/css/LineIcons.2.0.css';
import '../assets/css/style.css';
import '../assets/css/bootstrap-4.5.0.min.css';
import '../assets/css/default.css';

import hero from '../assets/images/header-hero.png';
import shape from '../assets/images/services-shape.svg';
import shape1 from '../assets/images/services-shape-1.svg';
import shape2 from '../assets/images/services-shape-2.svg';
import shape3 from '../assets/images/services-shape-3.svg';

class Home extends Component{
	render(){
		return(
			<div>
				  <header className="header-area">
        <div className="navbar-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg">
                            <a className="navbar-brand" href="index.html">
                                <img src={logo} alt="Intensel" height="50" width="150"/>
                            </a>
                            
                        </nav> 
                    </div>
                </div> 
            </div> 
        </div> 
        
        <div id="home" className="header-hero bg_cover">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="header-hero-content text-center">
                            <h4 style={{fontSize:'34px'}} className="header-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.5s">Discover Climate Risk with Intensel's new SaaS</h4>

                            <h3 className="header-sub-title wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.2s"></h3>
                            <p style={{fontSize:'20px'}} className="text wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="0.8s">All Inclusive Climate Risks with Finacial Dollar Loss</p>
                            <a href="/login" className="main-btn wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="1.1s">Login</a> <a href="/register" className="main-btn wow fadeInUp" data-wow-duration="1.3s" data-wow-delay="1.1s">Signup</a>

                        </div> 
                    </div>
                </div> 
                <div className="row">
                    <div className="col-lg-12">
                        <div className="header-hero-image text-center wow fadeIn" data-wow-duration="1.3s" data-wow-delay="1.4s">
                            <img src={hero} alt="hero"/>
                        </div> 
                    </div>
                </div> 
            </div> 
            <div id="particles-1" className="particles"></div>
        </div> 
    </header>
    
  
    
    <section id="features" className="services-area pt-120">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="section-title text-center pb-40">
                        <div className="line m-auto"></div>
                        <h3 className="title">Why Choose Intensel ?</h3>
                    </div> 
                </div>
            </div> 
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-7 col-sm-8">
                    <div className="single-services text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                        <div className="services-icon">
                            <img className="shape" src={shape} alt="shape"/>
                            <img className="shape-1" src={shape1} alt="shape"/>
                            <i className="lni lni-baloon"></i>
                        </div>
                        <div className="services-content mt-30">
                            
                            <p className="text">7 + Climate Variables Both Historical and Forecast Model uses NWPs and AI</p>
                            
                        </div>
                    </div> 
                </div>
                <div className="col-lg-4 col-md-7 col-sm-8">
                    <div className="single-services text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
                        <div className="services-icon">
                            <img className="shape" src={shape} alt="shape"/>
                            <img className="shape-1" src={shape2} alt="shape"/>
                            <i className="lni lni-cog"></i>
                        </div>
                        <div className="services-content mt-30">
                            
                            <p className="text">Asset Level Gnarularity Loss is Asset Specific Pre integrated Plug and Play</p>
                            
                        </div>
                    </div> 
                </div>
                <div className="col-lg-4 col-md-7 col-sm-8">
                    <div className="single-services text-center mt-30 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                        <div className="services-icon">
                            <img className="shape" src={shape} alt="shape"/>
                            <img className="shape-1" src={shape3} alt="shape"/>
                            <i className="lni lni-bolt-alt"></i>
                        </div>
                        <div className="services-content mt-30">
                            
                            <p className="text">Automated Reports High Accuracy Insights Dynamic Relatime Updates</p>
                            
                        </div>
                    </div> 
                </div>
            </div> 
        </div> 
    </section>
    </div>

			)
	}
}
export default Home;