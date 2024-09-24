import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-start justify-center p-3 rounded-lg shadow-lg bg-zinc-900">
        <p className="font-semibold text-white">{label}</p>
        <p className="text-zinc-300">{payload[0].value} steps</p>
      </div>
    );
  }
  return null;
};

// Reusable BaseChart component with controllable styles
const BaseChart = ({
  data,
  xAxisKey,
  yAxisLabel,
  xAxisLabel,
  chartWidth,
  dataKey,
  yAxisTickFormatter,
  averageValue,
}) => {
  // Control styles within the component
  const xAxisLineColor = '#444';
  const yAxisLineColor = '#444';
  const xAxisTickColor = '#444';
  const yAxisTickColor = '#444';
  const gridColor = '#aaa';
  const gridDashArray = '3 3';
  const barColor = '#FF5F1F';
  const referenceLineColor = '#333';
  const referenceLineLabelColor = '#333';

  return (
    <BarChart
      width={chartWidth}
      height={400}
      data={data}
      margin={{ top: 40, right: 8, left: -24, bottom: 40 }}>
      <CartesianGrid
        strokeDasharray={gridDashArray}
        stroke={gridColor}
        strokeWidth={0.5}
        vertical={false}
      />

      <XAxis
        dataKey={xAxisKey}
        tick={{ fontSize: 13, fill: xAxisTickColor }}
        axisLine={{ stroke: xAxisLineColor, strokeWidth: 0.5 }}
      />

      <YAxis
        tick={{ fontSize: 13, fill: yAxisTickColor }}
        tickFormatter={yAxisTickFormatter || ((value) => value)}
        axisLine={{ stroke: yAxisLineColor, strokeWidth: 0.5 }}
      />

      <Tooltip content={<CustomTooltip />} />

      <Bar dataKey={dataKey} fill={barColor} radius={[8, 8, 0, 0]} />

      <ReferenceLine
        y={averageValue}
        label={{
          fontSize: 14,
          fontWeight: 600,
          value: `${averageValue} steps`,
          position: 'insideTopRight',
          fill: referenceLineLabelColor,
        }}
        stroke={referenceLineColor}
        strokeWidth="0.5"
        strokeDasharray="4 2"
      />
    </BarChart>
  );
};

export default BaseChart;
