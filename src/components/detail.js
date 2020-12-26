import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ComposedChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Line,Area
} from 'recharts';

import {Header,Icon,Menu,Label,Button,Grid,Radio,Image,Form,Input,Modal,Popup,Select,Progress,Table,Checkbox,Accordion,Dropdown} from 'semantic-ui-react';
import {project,auth,dashboard} from '../actions';
import {connect} from 'react-redux';
import './detail.css';


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
let data=[];
let data1=[];
let data2=[];

class Detail extends Component {
  constructor(props){
    super(props);
  }
  state={
    project:'123',
    details:'',
    bar_data:'',
    bar_data1:'',
    bar_data2:''
      }

  componentDidMount(){
    let formdata=new FormData();
    formdata.append("project",this.props.project)
    this.props.getDetail(formdata)
    

  }
   render(){
    
    
    if(this.props.detail['2030_vs_2020']&&this.props.detail['2030_vs_2020'].length>0){
        data=[];
        let x=this.props.detail['2030_vs_2020']
        for(let j=0;j<x.length;j++){
            for(var i in x[j]){
              
              data.push({
                name:i,
                'RCP2.6':x[j][i]['rcp2.6'],
                'RCP4.5':x[j][i]['rcp4.5'],
                'RCP8.5':x[j][i]['rcp8.5'],
                'loss_2020':x[j][i]['loss_2020']
              })
            }
      }
      this.state.bar_data=data
      data1=[];
      let y= this.props.detail['2050_vs_2020']
      for(let k=0;k<y.length;k++){
        for (var i in y[k]){

            data1.push({
              name:i,
                'RCP2.6':y[k][i]['rcp2.6'],
                'RCP4.5':y[k][i]['rcp4.5'],
                'RCP8.5':y[k][i]['rcp8.5'],
                'loss_2020':y[k][i]['loss_2020']
            })
        }
      }
      this.state.bar_data1=data1
      data2=[];
       let z= this.props.detail['year_chart']
      for(let l=0;l<y.length;l++){
        for (var i in z[l]){

            data2.push({
              name:i,
                '2020':z[l][i]['2020'],
                '2030':z[l][i]['2030'],
                '2050':z[l][i]['2050']
                
            })
        }
      }
      this.state.bar_data2=data2

    }
    

  

    return(
      <Grid>
          <Grid.Row>
      
      <Grid.Column width="3"></Grid.Column>
      <Grid.Column width="12" className="card">
      <p>Climate Risk Index</p>
           <ComposedChart
        width={1200}
        height={400}
        data={this.state.bar_data}
        margin={{
          top: 20, right: 80, bottom: 20, left: 20,
        }}
        padding={5}
       
      >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00046" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#1cb5e0" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorVv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#56ccf2" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#2f80ed" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorWv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9cecfb" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#0052d4" stopOpacity={0.3}/>
        </linearGradient>
      </defs>
        <CartesianGrid stroke="#ffffff" />
        <XAxis dataKey="name" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} style={{stroke:'#3a3a33a',fontSize:'12px'}}/>
        <YAxis label={{ value: '$ Mil Losses in 2030 vs 2020', angle: -90, position: 'insideLeft',textAnchor:'middle'  }} style={{stroke:'#3a3a33a',fontSize:'12px'}} className="yaxis" />
        <Tooltip />
        <Legend />

        <Area type="monotone" dataKey="rcp" fill="#ffffff" stroke="#ffffff" />
        <Bar dataKey="loss_2020" barSize={20} fill="#bac3d2"/>
        <Bar dataKey="RCP2.6" barSize={20} fill="#6c85bd" />
        <Bar dataKey="RCP4.5" barSize={20} fill="#60b1cc" />
        <Bar dataKey="RCP8.5" barSize={20} fill="red" />
        


        
      </ComposedChart>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column width="3"></Grid.Column>
      <Grid.Column width="12" className="card">
             <ComposedChart
        width={1200}
        height={400}
        data={this.state.bar_data1}
        margin={{
          top: 20, right: 80, bottom: 20, left: 20,
        }}
        padding={5}
       
      >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00046" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#1cb5e0" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorVv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#56ccf2" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#2f80ed" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorWv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9cecfb" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#0052d4" stopOpacity={0.3}/>
        </linearGradient>
      </defs>
        <CartesianGrid stroke="#ffffff" />
        <XAxis dataKey="name" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} style={{stroke:'#3a3a33a',fontSize:'12px'}}/>
        <YAxis label={{ value: '$ Mil Losses in 2050 vs 2020', angle: -90, position: 'insideLeft'  }} style={{stroke:'#3a3a33a',fontSize:'12px'}} className="yaxis" />
        <Tooltip />
        <Legend />

        <Bar dataKey="loss_2020" barSize={20} fill="#bac3d2"/>
        <Bar dataKey="RCP2.6" barSize={20} fill="#6c85bd" />
        <Bar dataKey="RCP4.5" barSize={20} fill="#60b1cc" />
        <Bar dataKey="RCP8.5" barSize={20} fill="red" />
        


        
      </ComposedChart></Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column width="3"></Grid.Column>
      <Grid.Column width="12" className="card">
             <ComposedChart
        width={1200}
        height={450}
        data={this.state.bar_data2}
        margin={{
          top: 20, right: 80, bottom: 20, left: 20,
        }}
        padding={5}
       
      >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00046" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#1cb5e0" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorVv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#56ccf2" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#2f80ed" stopOpacity={0.3}/>
        </linearGradient>
        <linearGradient id="colorWv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9cecfb" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#0052d4" stopOpacity={0.3}/>
        </linearGradient>
      </defs>
        <CartesianGrid stroke="#ffffff" />
        <XAxis dataKey="name" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} style={{stroke:'#3a3a33a',fontSize:'12px'}}/>
        <YAxis label={{  value:'Estimated % Loss Relative to 2020 Property valuations (RCP 8.5)',angle: -90, position: 'insideLeft'  }} style={{stroke:'#3a3a33a',fontSize:'9px'}}  className="yaxis"/>
        <Tooltip />
        <Legend />

        
        <Bar dataKey="2020" barSize={20} fill="#6c85bd" />
        <Bar dataKey="2030" barSize={20} fill="#60b1cc" />
        <Bar dataKey="2050" barSize={20} fill="#bac3d2" />
        


        
      </ComposedChart></Grid.Column>

      </Grid.Row>


      </Grid>
              )
  }
  
    
}
const mapStateToProps = state =>{
  return{
    errors:state.project.errors,
    detail:state.feedback.detail
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    getDetail:(formdata)=>{
      dispatch(dashboard.getDetail(formdata))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail);
