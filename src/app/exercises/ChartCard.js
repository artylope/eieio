'use client';
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

// Dummy components for charts (or data)
const DayChart = () => <div className="">Today</div>;
const WeekChart = () => <div className="">This Week</div>;
const MonthChart = () => <div className="">This Month</div>;
const Chart = ({ type, title, count }) => (
  <div className="flex flex-col py-4 gap-y-2">
    {/* <h3 className="text-zinc-600">{title}</h3> */}
    <div className="">
      <div>{title}</div>
      <div className="flex items-end justify-start gap-x-2">
        <h1 className="text-6xl font-semibold tracking-tight text-zinc-900">
          {count.toLocaleString()}
        </h1>
        <span className="mb-0.5">steps</span>
      </div>
    </div>
  </div>
);

const ChartCard = () => {
  const [value, setValue] = useState('day'); // Default value is 'day'

  // Mapping constant for chart data/components based on the selected tab
  const chartComponents = {
    day: <Chart type="day" title="Total today" count={9273} />,
    week: <Chart type="week" title="Average this week" count={14273} />,
    month: <Chart type="month" title="Average this month" count={12356} />,
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
                className={`px-3 py-1 text-center rounded-md  transition-all  ${
                  value === 'day'
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-700'
                }`}>
                Day
              </Tabs.Trigger>
              <Tabs.Trigger
                value="week"
                className={`px-3 py-1 text-center rounded  transition-all  ${
                  value === 'week'
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-700'
                }`}>
                Week
              </Tabs.Trigger>
              <Tabs.Trigger
                value="month"
                className={`px-3 py-1 text-center rounded   transition-all ${
                  value === 'month'
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-700'
                }`}>
                Month
              </Tabs.Trigger>
            </Tabs.List>
          </div>

          {/* Rendering the relevant chart based on the selected tab */}
          <Tabs.Content value={value} className="py-4 text-zinc-700">
            {chartComponents[value]}{' '}
            {/* This renders the corresponding chart for Day, Week, or Month */}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default ChartCard;
