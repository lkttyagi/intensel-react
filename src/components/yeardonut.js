import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector,Cell } from 'recharts';
import {Grid} from 'semantic-ui-react';





export default class YEARDonut extends PureComponent {
  

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
      x=this.state.piedata[0]['20']["Total Loss RCP 0.0"]
      y=this.state.piedata[0]['50']["Total Loss RCP 8.5"]
      z=this.state.piedata[0]['70']["Total Loss RCP 8.5"]
    }
    
    const data = [
  { name: 'Loss 2020', value:x },
  { name: 'Loss 2030', value:y },
  { name: 'Loss 2050', value:z }

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
      <p style={{fontSize:'12px',display:'flex'}}> 2020 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#00c49f'}}></div> $ {x} Billion </p>  
      <p style={{fontSize:'12px',display:'flex'}}> 2030 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#0088fe'}}></div> $ {y} Billion</p>
      </div>
      <div>
      <p style={{fontSize:'12px',display:'flex'}}> 2050 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#ffbb28'}}></div> $ {y} Billion</p>
      </div>
      </div>
    
    );
  }
}
