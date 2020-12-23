import React, { PureComponent } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,ScatterChart,Scatter
} from 'recharts';
import {Grid} from 'semantic-ui-react';





export default class Donut extends PureComponent {
  

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
    
    this.state.piedata=this.props.data
    let x=''
    let y=''

    if(this.state.piedata){
      x=parseFloat(this.state.piedata.net_loss_value.slice(1,4));
      y=this.state.piedata.loss_bars['Asset Flood Damage'][0]+this.state.piedata.loss_bars['Asset Storm Damage'][0]+this.state.piedata.loss_bars['Operational Flood Loss'][0]+this.state.piedata.loss_bars['Operational Storm Surge Loss'][0]
    }
    
    const data = [
  { name: 'Total Property Value', value:y },
  { name: 'Total Loss', value:x },
  

];


const COLORS = ["#0088fe","#00c49f"];

    return (
      <div>
          <ComposedChart
            width={200}
            height={200}
            data={data}
            margin={{
            top: 20, right: 20, bottom: 20, left: 20,
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </ComposedChart>

      <div style={{display:'flex'}}><p style={{fontSize:'12px',display:'flex'}}>Total Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#00c49f',marginTop:'4px',marginLeft:'5px'}}></div> $ {x} Billion </p>  
      <p style={{fontSize:'12px',display:'flex',marginLeft:'5px'}}>Property Value <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#0088fe',marginTop:'4px',marginLeft:'5px'}}></div> $ {y} Billion</p>
      </div>
      </div>
    
    );
  }
}
