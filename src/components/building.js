import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScatterChart, Scatter, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal,Popup,Select,Progress,Table,Checkbox,Accordion,Dropdown} from 'semantic-ui-react';
import {project,auth,dashboard} from '../actions';
import {connect} from 'react-redux';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';


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
    line:'',
    scatter_y:'',
    scatter_x:''
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
  this.state.scatter_y=this.props.building.dct_asset
  this.state.scatter_x=this.props.building.dct
  this.state.line=data01

 }
 const data=[
                                                    {x:this.state.scatter_x['FL2670'],y:this.state.scatter_y['f2.6']},
                                                    {x:this.state.scatter_x['FL4570'],y:this.state.scatter_y['f4.5']},
                                                    {x:this.state.scatter_x['FL8570'],y:this.state.scatter_y['f8.5']}

                                                    ]
const data1=[
          {x:this.state.scatter_x['SS2670'],y:this.state.scatter_y['s2.6']},
          {x:this.state.scatter_x['SS4570'],y:this.state.scatter_y['s4.5']},
          {x:this.state.scatter_x['SS8570'],y:this.state.scatter_y['s8.5']}

          ]
 const colors = scaleOrdinal(schemeCategory10).range();



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
                      <Grid.Column width="1"></Grid.Column>
                    <Grid.Column width="6" className="card">
                                        
                                            <p>Analysis of Flood Damage</p>
                                                                                                     <ScatterChart
                                                  width={400}
                                                  height={400}
                                                  margin={{
                                                    top: 20, right: 20, bottom: 20, left: 20,
                                                  }}
                                                >
                                                  <CartesianGrid />
                                                  <XAxis type="number" dataKey="x" name="Depth" value="Depth"/>
                                                  <YAxis type="number" dataKey="y" name="Loss in Million $" value="Loss in Million $" unit="mn $" />
                                                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                                  <Scatter name="" data={data} fill="#8884d8">
                                                   
                                                   {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
          }
                                                  </Scatter>
                                                </ScatterChart>
    
      
                       
                    </Grid.Column>
                    <Grid.Column width="1"></Grid.Column>
                    <Grid.Column width="6" className="card">
                    <p>Analysis of Storm Damage</p>
                      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Depth" value="Depth"/>
        <YAxis type="number" dataKey="y" name="Loss in Million $" value="Loss in Million $" unit="mn $" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="" data={data1} fill="#8884d8">
          
          {
            data1.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
          }
        </Scatter>
      </ScatterChart>

                    </Grid.Column>
                    
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
