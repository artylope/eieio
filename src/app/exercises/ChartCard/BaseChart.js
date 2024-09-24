import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-start justify-center p-3 rounded-lg shadow-lg bg-zinc-900">
        <p className="font-semibold text-white">{label}</p>
        <p className=" text-zinc-300">{payload[0].value} steps</p>
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
  chartWidth, // Add chartWidth as a prop
  dataKey,
  yAxisTickFormatter,
}) => {
  return (
    <BarChart
      width={chartWidth} // Dynamically set width
      height={400}
      data={data}
      margin={{ top: 40, right: 0, left: -24, bottom: 40 }}>
      <CartesianGrid
        strokeDasharray="4 4"
        stroke="#ccc"
        strokeWidth={0.5}
        vertical={false}
      />
      <XAxis
        dataKey={xAxisKey}
        tick={{ fontSize: 13, fill: '#555' }}
        axisLine={{ stroke: '#555', strokeWidth: 0.5 }}
      />
      <YAxis
        tick={{ fontSize: 13, fill: '#555' }}
        tickFormatter={yAxisTickFormatter || ((value) => value)}
        axisLine={{ stroke: '#555', strokeWidth: 0.5 }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey={dataKey} fill="#FF5F1F" radius={[8, 8, 0, 0]} />
    </BarChart>
  );
};

export default BaseChart;
