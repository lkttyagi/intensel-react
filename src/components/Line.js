import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 0, uv: 40, pv: 24, amt: 24,
  },
  {
    name: 2, uv: 30, pv: 13, amt: 22,
  },
  {
    name: 4, uv: 20, pv: 38, amt: 22,
  },
  {
    name: 6, uv: 27, pv: 39, amt: 20,
  },
  {
    name: 8, uv: 18, pv: 48, amt: 21,
  }
];

export default class LineExample extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <LineChart
        width={700}
        height={500}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Depth" stroke="#8884d8" activeDot={{ r: 8 }} />
        
      </LineChart>
    );
  }
}
