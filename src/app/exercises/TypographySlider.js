'use client';

import React, { useState } from 'react';

// load slider from Radix UI primitive
import * as Slider from '@radix-ui/react-slider';

const TypographySlider = () => {
  const [textSize, setTextSize] = useState(48);
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
      <div className="flex flex-col lg:flex-row grow w-full bg-white dark:bg-zinc-900  rounded ">
        <div className="flex flex-col justify-between border-b lg:border-b-transparent lg:border-r dark:border-zinc-800 gap-y-12 lg:w-[40rem]  lg:min-w-96 p-8">
          <div className="flex flex-col gap-y-4">
            <label className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
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
              <Slider.Track className="relative bg-zinc-200 h-1 grow rounded-full dark:bg-zinc-700">
                <Slider.Range className="absolute  bg-zinc-900 h-full rounded-full dark:bg-zinc-200" />
              </Slider.Track>
              <Slider.Thumb
                className="flex bg-zinc-900 dark:bg-zinc-200 w-4 h-4 -translate-y-1.5 rounded-full"
                aria-label="Volume"
              />
            </Slider.Root>
            <div className="flex justify-between items-center">
              <span className="font-semibold">{textSize}</span>
              <span className="text-zinc-500">px</span>
            </div>{' '}
          </div>{' '}
          <div className="flex flex-col gap-y-1 grow w-full">
            {' '}
            <label className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
              Sample Text
            </label>
            <input
              className="px-1 py-2 border-b-2 bg-transparent w-full text-wrap font-semibold dark:border-zinc-700"
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

export default TypographySlider;
