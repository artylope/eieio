import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  LabelList,
} from 'recharts';

// Reusable BaseChart component
const BaseChart = ({
  data,
  xAxisKey,
  yAxisLabel,
  xAxisLabel,
  barColor,
  dataKey,
}) => {
  return (
    <BarChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisKey}>
        <Label
          value={xAxisLabel}
          offset={-5}
          position="insideBottom"
          style={{ fontSize: 14, fill: '#555' }}
        />
      </XAxis>
      <YAxis>
        <Label
          value={yAxisLabel}
          angle={-90}
          position="insideLeft"
          style={{ fontSize: 14, fill: '#555' }}
        />
      </YAxis>
      <Tooltip />
      <Bar dataKey={dataKey} fill={barColor}>
        <LabelList dataKey={dataKey} position="top" />
      </Bar>
    </BarChart>
  );
};

export default BaseChart;
