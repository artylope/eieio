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

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-start justify-center p-3 bg-white border rounded-lg shadow-lg">
        <p className="font-semibold text-zinc-900">{label}</p>
        <p className=" text-zinc-600">{payload[0].value} steps</p>
      </div>
    );
  }

  return null;
};

// Reusable BaseChart component
const BaseChart = ({
  data,
  xAxisKey,
  yAxisLabel,
  xAxisLabel,
  barColor,
  dataKey,
  gridConfig,
  yAxisTickFormatter,
}) => {
  return (
    <BarChart
      width={396}
      height={400}
      data={data}
      margin={{ top: 40, right: 0, left: -24, bottom: 40 }}>
      <CartesianGrid
        strokeDasharray={'4 4'}
        stroke={'#ccc'}
        strokeWidth={0.5}
        vertical={false}
        horizontal={true}
      />

      <XAxis
        dataKey={xAxisKey}
        tick={{ fontSize: 13, fill: '#555' }}
        axisLine={{ stroke: '#555', strokeWidth: 0.5 }}>
        {/* <Label
          value={xAxisLabel}
          offset={-12}
          position="insideBottom"
          style={{ fontSize: 12, fill: '#555' }}
        /> */}
      </XAxis>
      <YAxis
        tick={{ fontSize: 13, fill: '#555' }}
        tickFormatter={yAxisTickFormatter || ((value) => value)} // Use passed formatter or default
        axisLine={{ stroke: '#555', strokeWidth: 0.5 }}>
        {/* <Label
          value={yAxisLabel}
          angle={-90}
          offset={-12}
          position="outsideRight"
          style={{ fontSize: 12, fill: '#555' }}
        /> */}
      </YAxis>

      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey={dataKey} fill="#FF5F1F" radius={[8, 8, 0, 0]}>
        {/* <LabelList dataKey={dataKey} position="top" /> */}
      </Bar>
    </BarChart>
  );
};

export default BaseChart;
