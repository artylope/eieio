'use client';
import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';
import BaseChart from '@/app/exercises/ChartCard/BaseChart';

// Data for the "Day" chart (hourly data)
const dayData = [
  { hour: '12 AM', steps: 200 },
  { hour: '1 AM', steps: 300 },
  { hour: '2 AM', steps: 180 },
  { hour: '3 AM', steps: 400 },
  { hour: '4 AM', steps: 350 },
  { hour: '5 AM', steps: 200 },
  { hour: '6 AM', steps: 1200 },
  { hour: '7 AM', steps: 800 },
  { hour: '8 AM', steps: 750 },
  { hour: '9 AM', steps: 1000 },
  { hour: '10 AM', steps: 2000 },
  { hour: '11 AM', steps: 1500 },
  { hour: '12 PM', steps: 1900 },
  { hour: '1 PM', steps: 1400 },
  { hour: '2 PM', steps: 1100 },
  { hour: '3 PM', steps: 900 },
  { hour: '4 PM', steps: 1300 },
  { hour: '5 PM', steps: 800 },
  { hour: '6 PM', steps: 700 },
  { hour: '7 PM', steps: 650 },
  { hour: '8 PM', steps: 500 },
  { hour: '9 PM', steps: 600 },
  { hour: '10 PM', steps: 400 },
  { hour: '11 PM', steps: 300 },
];

// Data for the "Week" chart (steps per day in a week)
const weekData = [
  { day: 'Mon', steps: 8000 },
  { day: 'Tue', steps: 10000 },
  { day: 'Wed', steps: 9500 },
  { day: 'Thu', steps: 12000 },
  { day: 'Fri', steps: 11000 },
  { day: 'Sat', steps: 13000 },
  { day: 'Sun', steps: 9273 }, // Today
];

// Data for the "Month" chart (steps per day in September)
const monthData = Array.from({ length: 30 }, (v, i) => ({
  day: `${i + 1} Sep`,
  steps: Math.floor(Math.random() * 15000 + 5000), // Random steps between 5000 and 20000
}));

const Chart = ({ type, title, count, data }) => (
  <div className="flex flex-col py-4 gap-y-2">
    <div className="">
      <div>{title}</div>
      <div className="flex items-end justify-start gap-x-2">
        <h1 className="text-6xl font-semibold tracking-tight text-zinc-900">
          {count.toLocaleString()}
        </h1>
        <span className="mb-0.5">steps</span>
      </div>
    </div>
    <div className="py-8 -ml-3 text-xs text-zinc-500">
      {type === 'day' && (
        <BarChart width={400} height={300} data={dayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="steps" fill="#8884d8">
            <LabelList dataKey="steps" position="top" />
          </Bar>
        </BarChart>
      )}
      {type === 'week' && (
        <BarChart width={400} height={300} data={weekData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="steps" fill="#82ca9d">
            <LabelList dataKey="steps" position="top" />
          </Bar>
        </BarChart>
      )}
      {type === 'month' && (
        <BarChart width={400} height={300} data={monthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="steps" fill="#ffc658">
            <LabelList dataKey="steps" position="top" />
          </Bar>
        </BarChart>
      )}
    </div>
  </div>
);

const ChartCard = () => {
  const [value, setValue] = useState('day'); // Default value is 'day'

  // Mapping constant for chart data/components based on the selected tab
  const chartComponents = {
    day: <Chart type="day" title="Total today" count={9273} data={dayData} />,
    week: (
      <Chart
        type="week"
        title="Daily average this week"
        count={14273}
        data={weekData}
      />
    ),
    month: (
      <Chart
        type="month"
        title="Daily average this month"
        count={12356}
        data={monthData}
      />
    ),
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="bg-white border rounded-xl shadow-xl h-[36rem] w-[28rem] p-6">
        <Tabs.Root value={value} onValueChange={setValue} className="">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-zinc-900">Steps</h2>
            <Tabs.List className="flex justify-center p-1 transition-all bg-gray-100 rounded-lg w-fit">
              <Tabs.Trigger
                value="day"
                className={`px-3 py-1 text-center rounded-md leading-6 transition-all  ${
                  value === 'day'
                    ? 'bg-white text-zinc-900 shadow'
                    : 'text-zinc-700'
                }`}>
                Day
              </Tabs.Trigger>
              <Tabs.Trigger
                value="week"
                className={`px-3 py-1 text-center rounded leading-6 transition-all  ${
                  value === 'week'
                    ? 'bg-white text-zinc-900 shadow'
                    : 'text-zinc-700'
                }`}>
                Week
              </Tabs.Trigger>
              <Tabs.Trigger
                value="month"
                className={`px-3 py-1 text-center rounded  leading-6 transition-all ${
                  value === 'month'
                    ? 'bg-white text-zinc-900 shadow'
                    : 'text-zinc-700'
                }`}>
                Month
              </Tabs.Trigger>
            </Tabs.List>
          </div>

          {/* Rendering the relevant chart based on the selected tab */}
          <Tabs.Content value="day" className="py-4 text-zinc-700">
            <BaseChart
              data={dayData}
              xAxisKey="hour"
              yAxisLabel="Number of Steps"
              xAxisLabel="Hour"
              barColor="#8884d8"
              dataKey="steps"
            />
          </Tabs.Content>

          <Tabs.Content value="week" className="py-4 text-zinc-700">
            <BaseChart
              data={weekData}
              xAxisKey="day"
              yAxisLabel="Number of Steps"
              xAxisLabel="Day of the Week"
              barColor="#82ca9d"
              dataKey="steps"
            />
          </Tabs.Content>

          <Tabs.Content value="month" className="py-4 text-zinc-700">
            <BaseChart
              data={monthData}
              xAxisKey="day"
              yAxisLabel="Number of Steps"
              xAxisLabel="Day of the Month"
              barColor="#ffc658"
              dataKey="steps"
            />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default ChartCard;
