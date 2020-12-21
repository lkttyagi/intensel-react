import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector,Cell } from 'recharts';
import {Grid} from 'semantic-ui-react';





export default class SingleDonut extends PureComponent {
  

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
    
    this.state.piedata=this.props.data[0]
    let x=''
    let y=''

    if(this.state.piedata){
      x=parseFloat(this.state.piedata.net_loss_value.slice(1,4));
      y=this.state.piedata.loss_bars['Asset Flood Damage'][0]+this.state.piedata.loss_bars['Asset Storm Damage'][0]+this.state.piedata.loss_bars['Operational Flood Loss'][0]+this.state.piedata.loss_bars['Operational Storm Surge Loss'][0]
    }
    
    const data = [
  { name: 'Total Property Cost', value:y },
  { name: 'Total Loss', value:x },
  

];
console.log("single data",data)


const COLORS = ["#0088fe","#00c49f"];

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

      <div style={{display:'flex'}}><p style={{fontSize:'12px',display:'flex'}}>Total Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#00c49f',marginTop:'4px',marginLeft:'5px'}}></div> $ {x} Million </p>  
      <p style={{fontSize:'12px',display:'flex'}}>Property cost <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#0088fe',marginTop:'4px',marginLeft:'5px'}}></div> $ {y} Billion</p>
      </div>
      </div>
    
    );
  }
}
