import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector,Cell } from 'recharts';
import {Grid} from 'semantic-ui-react';





export default class RCPDonut extends PureComponent {
  

  state = {
    activeIndex: 0,
    piedata:''
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
      piedata:''
    });
  };
 

  render() {
    console.log("piemdkdsmks",this.props.data)
    this.state.piedata=this.props.data
    let x=''
    let y=''
    let z=''

    if(this.state.piedata){
      x=this.state.piedata[0]['70']["Total Loss RCP 2.6"]
      y=this.state.piedata[0]['70']["Total Loss RCP 4.5"]
      z=this.state.piedata[0]['70']["Total Loss RCP 8.5"]
    }
    
    const data = [
  { name: 'RCP 2.6', value:x },
  { name: 'RCP 4.5', value:y },
  { name: 'RCP 8.5', value:z }

];
console.log("xy",data);

const COLORS = ["#0088fe","#00c49f","#ffbb28"];

    return (
      <div>
      <PieChart width={320} height={140}>
        <Pie
          
          
          data={data}
          cx={160}
          cy={50}
          innerRadius={40}
          outerRadius={50}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={5}
          
        >
      {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
          </Pie>
      </PieChart>
      <div style={{display:'flex'}}>
      <p style={{fontSize:'12px',display:'flex'}}>RCP 2.6 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#00c49f',padding:'5px'}}></div> $ {x} Billion </p>  
      <p style={{fontSize:'12px',display:'flex'}}>RCP 4.5 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#0088fe'}}></div> $ {y} Billion</p>
      </div>
      <div>
      <p style={{fontSize:'12px',display:'flex'}}>RCP 8.5 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#ffbb28'}}></div> $ {y} Billion</p>
      </div>
      </div>
    
    );
  }
}
