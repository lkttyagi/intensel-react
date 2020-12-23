import React, { PureComponent } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,ScatterChart,Scatter,Cell
} from 'recharts';
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
  { name: '2020', value:x },
  { name: '2030', value:y },
  { name: '2050', value:z }

];
console.log("xy",data);

const COLORS = ["#0088fe","#00c49f","#ffbb28"];

    return (
      <div>
        <ComposedChart
            width={300}
            height={200}
            data={data}
            margin={{
            top: 20, right: 20, bottom: 20, left: 20,
            }}
            style={{marginLeft:'60px'}}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={20} fill="#413ea0">
            {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
            </Bar>
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </ComposedChart>
      <div style={{display:'flex'}}>
      <p style={{fontSize:'12px',display:'flex'}}> 2020 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#00c49f'}}></div> $ {x.toFixed(3)} Billion </p>  
      <p style={{fontSize:'12px',display:'flex',marginLeft:'5px'}}> 2030 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#0088fe'}}></div> $ {y.toFixed(3)} Billion</p>
      </div>
      <div>
      <p style={{fontSize:'12px',display:'flex'}}> 2050 Loss <div class="box" style={{width:'10px',height:'10px',backgroundColor:'#ffbb28'}}></div> $ {z.toFixed(3)} Billion</p>
      </div>
      </div>
    
    );
  }
}
