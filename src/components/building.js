import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Line
} from 'recharts';

import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal,Popup,Select,Progress,Table,Checkbox,Accordion,Dropdown} from 'semantic-ui-react';
import {project,auth,dashboard} from '../actions';
import {connect} from 'react-redux';
import  {CanvasJSChart } from  'canvasjs-react-charts';


let data01=[];

const basementOptions=[
  {key:'yes',value:'yes',text:'yes'},
  {key:'no',value:'no',text:'no'},
  {key:'unknown',value:'unknown',text:'unknown'},

]
const constructionOptions=[
  {key:'wood',value:'wood',text:'wood'},
  {key:'concrete',value:'concrete',text:'concrete'},
  {key:'masonry',value:'masonry',text:'masonry'},
  {key:'mobile home',value:'mobile home',text:'mobile home'},
  {key:'light metal',value:'light metal',text:'light metal'},
  {key:'steel',value:'steel',text:'steel'},
  {key:'unknown',value:'unknown',text:'unknown'}

]
const storiesOptions=[
  {key:1,value:1,text:1},
  {key:2,value:2,text:2},
  {key:'3 or More',value:'3 or More',text:'3 or More'},
  {key:'unknown',valeu:'unknown',text:'unknown'}
]
const occupancyOptions=[
  {key:'res',value:'res',text:'res'},
  {key:'com',value:'com',text:'com'},
  {key:'ind',value:'ind',text:'ind'},
  {key:'unknown',value:'unknown',text:'unknown'}
]

class Building extends Component {
  constructor(props){
    super(props);
  }
  state={
    basement:'yes',
    construction:'wood',
    stories:'1',
    occupancy:'res',
    per_sq_m_value:40000,
    scatter:''
  }

  componentDidMount(){
    console.log("fndfffdsfdljfjfo")
    let formdata= new FormData();
    formdata.append('building',this.props.name)
    formdata.append('basement',this.state.basement)
    formdata.append('construction',this.state.construction)
    formdata.append('stories',this.state.stories)
    formdata.append('occupancy',this.state.occupancy)
    formdata.append('per_sq_m_value',this.state.per_sq_m_value)
    this.props.getBuilding(formdata)

  }
  handleChange=(value,key)=>{
    this.setState({[key]:value},this.handleSubmit)
  }

  handleSubmit=()=>{
    
    let formdata= new FormData();
    formdata.append('building',this.props.name)
    formdata.append('basement',this.state.basement)
    formdata.append('construction',this.state.construction)
    formdata.append('stories',this.state.stories)
    formdata.append('occupancy',this.state.occupancy)
    formdata.append('per_sq_m_value',this.state.per_sq_m_value)
    this.props.getBuilding(formdata)
  }
  render(){
  const {value,basement,construction,stories,occupancy}=this.state;

  console.log("building",this.props.building,this.props.name);
  if(this.props.building.length===undefined){
  for(let i=0;i<this.props.building.depth.length;i++){  
    data01.push({
      x:this.props.building.depth[i],
      y:this.props.building.mdr[i]
    })
  }
  this.state.scatter=data01

 }
 const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title:{
        text: ""
      },
      axisY: {
        title: "Loss in Million $",
        suffix: ""
      },
      axisX: {
        title: "Depth",
        prefix: "W",
        interval: 2
      },
      data: [{
        type: "line",
        toolTipContent: "{x}: {y}",
        dataPoints:this.state.scatter
      }]
    }
const options1 = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title:{
        text: "Storm Surge Loss"
      },
      axisY: {
        title: "Loss in Million $",
        suffix: ""
      },
      axisX: {
        title: "Depth",
        prefix: "W",
        interval: 2
      },
      data: [{
        type: "line",
        toolTipContent: "{x}: {y}",
        dataPoints:this.state.scatter
      }]
    }



    return(
      <Grid>
                    <Grid.Row>
                      
                      
                          <Grid.Column width="2"></Grid.Column>
                          

                          
                          <Grid.Column width="2">
                          <Form.Select placeholder="Basement" width="equal"
                          onChange={(e,{value})=>this.handleChange(value,'basement')}
                          value={basement}
                          options={basementOptions}
                           /></Grid.Column>
                          
                          <Grid.Column width="2">
                          <Form.Select placeholder="Construction"
                          onChange={(e,{value})=>this.handleChange(value,'construction')}
                          value={construction}
                          options={constructionOptions}
                          /></Grid.Column>
                          
                          <Grid.Column width="2">
                          <Form.Select placeholder="Stories"
                          onChange={(e,{value})=>this.handleChange(value,'stories')}
                          value={stories}
                          options={storiesOptions}
                          /></Grid.Column>
                          
                          <Grid.Column width="2"><Form.Select placeholder="Occupancy"
                          onChange={(e,{value})=>this.handleChange(value,'occupancy')}
                          value={occupancy}
                          options={occupancyOptions}/></Grid.Column>
                          
                          <Grid.Column width="2"><Form.Input placeholder="Area"value={this.state.per_sq_m_value}
                          onChange={(e)=>this.setState({per_sq_m_value:e.target.value})}
                          /></Grid.Column>

                          
                          <Grid.Column width="2"></Grid.Column>
                      
                      
                    </Grid.Row>
                      <Grid.Row>
                      <Grid.Column width="4"></Grid.Column>
                    <Grid.Column width="8" className="card">
                                        
                                            <p>Analysis of Flood Damage</p>
                                            <CanvasJSChart id="chartContainer1" options = {options} style={{padding:'5px'}}
    
      />
                       
                    </Grid.Column>
                    <Grid.Column width="1"></Grid.Column>
                    
                  </Grid.Row>

      
                  </Grid>)
  }
  
    
}
const mapStateToProps = state =>{
  return{
    errors:state.project.errors,
    building:state.feedback.building
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    getBuilding:(formdata)=>{
      dispatch(dashboard.getBuilding(formdata))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Building);
