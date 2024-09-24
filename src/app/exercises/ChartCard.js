'use client';
import React, { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import BaseChart from '@/app/exercises/ChartCard/BaseChart';

// Utility function to calculate average
const calculateAverage = (data) => {
  const totalSteps = data.reduce((sum, item) => sum + item.steps, 0);
  return (totalSteps / data.length).toFixed(0);
};

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
  steps: Math.floor(Math.random() * 10000 + 5000), // Random steps between 5000 and 20000
}));

const ChartHeader = ({ title, count }) => (
  <div className="flex flex-col gap-y-2">
    <div className="">
      <div className="text-zinc-600">{title}</div>
      <div className="flex items-end justify-start gap-x-2">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl text-zinc-900">
          {count.toLocaleString()}
        </h1>
        <span className="mb-0.5 text-base sm:text-lg">steps</span>
      </div>
    </div>
  </div>
);

const ChartCard = () => {
  const [value, setValue] = useState('day'); // Default value is 'day'
  const [chartWidth, setChartWidth] = useState(400); // Default chart width

  // Dynamically adjust chart width based on screen size
  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 640 ? window.innerWidth - 40 : 400);
    };

    // Set initial width
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate the average for day, week, and month data
  const dayAverage = calculateAverage(dayData);
  const weekAverage = calculateAverage(weekData);
  const monthAverage = calculateAverage(monthData);

  return (
    <div className="flex items-center justify-center px-0 sm:p-8">
      <div className="bg-white sm:border rounded-xl sm:shadow-xl h-[36rem] w-full sm:w-[28rem] p-6">
        <Tabs.Root value={value} onValueChange={setValue}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold sm:text-2xl text-zinc-900">
              Steps
            </h2>
            <Tabs.List className="flex justify-center p-1 transition-all bg-gray-100 rounded-lg w-fit">
              <Tabs.Trigger
                value="day"
                className={`px-2 py-1 sm:px-3 sm:py-1.5 text-center rounded-md leading-6 transition-all ${
                  value === 'day'
                    ? 'bg-white text-zinc-900 shadow'
                    : 'text-zinc-700'
                }`}>
                Day
              </Tabs.Trigger>
              <Tabs.Trigger
                value="week"
                className={`px-2 py-1 sm:px-3 sm:py-1.5 text-center rounded-md leading-6 transition-all ${
                  value === 'week'
                    ? 'bg-white text-zinc-900 shadow'
                    : 'text-zinc-700'
                }`}>
                Week
              </Tabs.Trigger>
              <Tabs.Trigger
                value="month"
                className={`px-2 py-1 sm:px-3 sm:py-1.5 text-center rounded-md leading-6 transition-all ${
                  value === 'month'
                    ? 'bg-white text-zinc-900 shadow'
                    : 'text-zinc-700'
                }`}>
                Month
              </Tabs.Trigger>
            </Tabs.List>
          </div>

          {/* Rendering the relevant chart based on the selected tab */}
          <Tabs.Content value="day" className="py-8 text-zinc-700">
            <ChartHeader title="Total today" count={9273} />
            <BaseChart
              data={dayData}
              xAxisKey="hour"
              chartWidth={chartWidth} // Pass responsive width
              yAxisLabel="Number of Steps"
              xAxisLabel="Hour"
              dataKey="steps"
              yAxisTickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
          </Tabs.Content>

          <Tabs.Content value="week" className="py-8 text-zinc-700">
            <ChartHeader title="Daily average this week" count={14273} />
            <BaseChart
              data={weekData}
              xAxisKey="day"
              chartWidth={chartWidth} // Pass responsive width
              yAxisLabel="Number of Steps"
              xAxisLabel="Day of the Week"
              dataKey="steps"
              yAxisTickFormatter={(value) => `${Math.round(value / 1000)}k`}
              averageValue={weekAverage} // Pass calculated average
            />
          </Tabs.Content>

          <Tabs.Content value="month" className="py-8 text-zinc-700">
            <ChartHeader title="Daily average this month" count={12356} />
            <BaseChart
              data={monthData}
              xAxisKey="day"
              chartWidth={chartWidth} // Pass responsive width
              yAxisLabel="Number of Steps"
              xAxisLabel="Day of the Month"
              dataKey="steps"
              yAxisTickFormatter={(value) => `${Math.round(value / 1000)}k`}
              averageValue={monthAverage} // Pass calculated average
            />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default ChartCard;
