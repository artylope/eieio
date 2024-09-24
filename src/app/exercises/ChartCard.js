'use client';
import React, { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import BaseChart from '@/app/exercises/ChartCard/BaseChart';

// Utility function to calculate average
const calculateTotal = (data) => {
  const totalSteps = data.reduce((sum, item) => sum + item.steps, 0);
  return totalSteps;
};
const calculateAverage = (data) => {
  const totalSteps = data.reduce((sum, item) => sum + item.steps, 0);
  return (totalSteps / data.length).toFixed(0);
};

// Data for the "Day" chart (hourly data)
const dayData = [
  { hour: '12 AM', steps: 0 },
  { hour: '1 AM', steps: 0 },
  { hour: '2 AM', steps: 0 },
  { hour: '3 AM', steps: 0 },
  { hour: '4 AM', steps: 0 },
  { hour: '5 AM', steps: 0 },
  { hour: '6 AM', steps: 23 },
  { hour: '7 AM', steps: 767 },
  { hour: '8 AM', steps: 67 },
  { hour: '9 AM', steps: 3299 },
  { hour: '10 AM', steps: 1534 },
  { hour: '11 AM', steps: 213 },
  { hour: '12 PM', steps: 323 },
  { hour: '1 PM', steps: 1327 },
  { hour: '2 PM', steps: 323 },
  { hour: '3 PM', steps: 213 },
  { hour: '4 PM', steps: 88 },
  { hour: '5 PM', steps: 211 },
  { hour: '6 PM', steps: 345 },
  { hour: '7 PM', steps: 1651 },
  { hour: '8 PM', steps: 365 },
  { hour: '9 PM', steps: 23 },
  { hour: '10 PM', steps: 29 },
  { hour: '11 PM', steps: 0 },
];

// Data for the "Week" chart (steps per day in a week)
const weekData = [
  { day: 'Mon', steps: 8324 },
  { day: 'Tue', steps: 12354 },
  { day: 'Wed', steps: 9347 },
  { day: 'Thu', steps: 12034 },
  { day: 'Fri', steps: 11656 },
  { day: 'Sat', steps: 13129 },
  { day: 'Today', steps: 9273 }, // Today
];

// Data for the "Month" chart (steps per day in September)
const monthData = [
  { day: '1 Sep', steps: 12344 },
  { day: '2 Sep', steps: 9280 },
  { day: '3 Sep', steps: 12123 },
  { day: '4 Sep', steps: 11023 },
  { day: '5 Sep', steps: 10923 },
  { day: '6 Sep', steps: 8923 },
  { day: '7 Sep', steps: 11234 },
  { day: '8 Sep', steps: 14561 },
  { day: '9 Sep', steps: 18349 },
  { day: '10 Sep', steps: 10213 },
  { day: '11 Sep', steps: 8664 },
  { day: '12 Sep', steps: 12355 },
  { day: '13 Sep', steps: 13045 },
  { day: '14 Sep', steps: 15812 },
  { day: '15 Sep', steps: 12853 },
  { day: '16 Sep', steps: 12391 },
  { day: '17 Sep', steps: 11250 },
  { day: '18 Sep', steps: 17932 },
  { day: '19 Sep', steps: 18973 },
  { day: '20 Sep', steps: 9234 },
  { day: '21 Sep', steps: 7645 },
  { day: '22 Sep', steps: 9123 },
  { day: '23 Sep', steps: 12342 },
  { day: '24 Sep', steps: 12089 },
  { day: '25 Sep', steps: 8721 },
  { day: '26 Sep', steps: 12600 },
  { day: '27 Sep', steps: 14531 },
  { day: '28 Sep', steps: 15324 },
  { day: '29 Sep', steps: 9401 },
  { day: '30 Sep', steps: 8234 },
];

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
  const dayTotal = calculateTotal(dayData);
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
            <ChartHeader title="Total today" count={dayTotal} />
            <BaseChart
              data={dayData}
              xAxisKey="hour"
              chartWidth={chartWidth} // Pass responsive width
              yAxisLabel="Number of Steps"
              xAxisLabel="Hour"
              dataKey="steps"
              yAxisTickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              today={true}
            />
          </Tabs.Content>

          <Tabs.Content value="week" className="py-8 text-zinc-700">
            <ChartHeader
              title="Daily average this week"
              count={Number(weekAverage).toLocaleString()}
            />
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
            <ChartHeader
              title="Daily average this month"
              count={Number(monthAverage).toLocaleString()}
            />
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
