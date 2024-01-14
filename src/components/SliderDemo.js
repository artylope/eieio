'use client';

import React, { useState } from 'react';

// load slider from Radix UI primitive
import * as Slider from '@radix-ui/react-slider';

const SliderDemo = () => {
  const [textSize, setTextSize] = useState(88);
  const [sampleText, setSampleText] = useState(
    'The quick brown fox jumps over the lazy dog'
  );

  function handleTextSizeChange(newValue) {
    console.log('change', newValue);
    setTextSize(newValue);
  }

  function handleSampleTextChange(newValue) {
    setSampleText(newValue);
  }

  return (
    <div className="flex flex-col grow w-full gap-y-4 ">
      <div className="flex flex-col lg:flex-row grow w-full bg-white dark:bg-neutral-900 border rounded dark:border-slate-800">
        <div className="flex flex-col justify-between border-b lg:border-r dark:border-slate-800 gap-y-12 lg:w-[40rem]  lg:min-w-96 p-8">
          <div className="flex flex-col gap-y-4">
            <label className="font-semibold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wide">
              Text size
            </label>
            <Slider.Root
              className="relative flex align-center w-full h-2 rounded-full"
              value={[textSize]}
              step={4}
              max={120}
              min={4}
              onValueChange={(newValue) => {
                handleTextSizeChange(newValue);
              }}>
              <Slider.Track className="relative bg-slate-200 h-1 grow rounded-full dark:bg-slate-700">
                <Slider.Range className="absolute  bg-slate-900 h-full rounded-full dark:bg-slate-200" />
              </Slider.Track>
              <Slider.Thumb
                className="flex bg-slate-900 dark:bg-slate-200 w-4 h-4 -translate-y-1.5 rounded-full"
                aria-label="Volume"
              />
            </Slider.Root>
            <div className="flex justify-between items-center">
              <span className="font-semibold">{textSize}</span>
              <span className="text-slate-500">px</span>
            </div>{' '}
          </div>{' '}
          <div className="flex flex-col gap-y-1 grow w-full">
            {' '}
            <label className="font-semibold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wide">
              Sample Text
            </label>
            <input
              className="px-1 py-2 border-b-2 bg-transparent w-full text-wrap font-semibold dark:border-slate-700"
              value={sampleText}
              onChange={(e) => {
                handleSampleTextChange(e.target.value);
              }}
            />
          </div>
        </div>

        <div className=" flex flex-col w-full grow justify-start items-center p-8 gap-y-8">
          {' '}
          <p
            style={{ fontSize: `${textSize}px` }}
            className="w-full leading-none">
            {sampleText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SliderDemo;
