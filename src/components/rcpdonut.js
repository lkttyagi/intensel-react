import React, { PureComponent } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,ScatterChart,Scatter,Cell
} from 'recharts';
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
    let x=0
    let y=0
    let z=0

    if(this.state.piedata){
      for(let i=0;i<this.state.piedata.length;i++){
          x+=this.state.piedata[i]['70']["Total Loss RCP 2.6"]
          y+=this.state.piedata[i]['70']["Total Loss RCP 4.5"]
          z+=this.state.piedata[i]['70']["Total Loss RCP 8.5"]
    }

    }
    
    const data = [
  { name: 'RCP 2.6', value:x.toFixed(3) },
  { name: 'RCP 4.5', value:y.toFixed(3) },
  { name: 'RCP 8.5', value:z.toFixed(3) }

];
console.log("xy",data);

const COLORS = ["#0088fe","#00c49f","#ffbb28"];

    return (
      <div>
      <Grid.Row>
      <Grid.Column style={{width:'60%'}}>
        <ComposedChart
            width={300}
            height={200}
            data={data}
            margin={{
            top: 20, right: 20, bottom: 20, left: 20,
            }}

            
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" label={{ value: 'RCP', position: 'insideBottomRight', offset: 0 }} stroke="#3a3a3a" />
            <YAxis label={{ value: 'Loss in Million($)', angle: -90, position: 'insideLeft'  }} stroke="#3a3a3a"  />
            <Tooltip />
            
            <Bar dataKey="value" barSize={20} fill="#413ea0">
            {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
            </Bar>
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </ComposedChart>
      </Grid.Column>
      <Grid.Column style={{width:'40%',marginTop:'10%'}}>
      
      <p style={{fontSize:'12px',display:'flex'}}> RCP 2.6 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#0088fe'}}></div> $ {x.toFixed(2)} Million </p>  
      <p style={{fontSize:'12px',display:'flex'}}> RCP 4.5 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#00c49f'}}></div> $ {y.toFixed(2)} Million</p>
      
      
      <p style={{fontSize:'12px',display:'flex'}}> RCP 8.5 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#ffbb28'}}></div> $ {z.toFixed(2)} Million</p>
      
      </Grid.Column>
      </Grid.Row>
      </div>
    
    );
  }
}
