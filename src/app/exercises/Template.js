import React from 'react';

const Template = ({ title, subtitle, description, date, children }) => {
  return (
    <div className="py-8 flex flex-col gap-y-6 justify-start items-start grow w-full ">
      <div className="flex flex-col gap-y-2">
        <p className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
          Exercise {subtitle} <span className="ml-2 border-l px-2">{date}</span>
        </p>
        <h2 className="font-semibold text-2xl text-zinc-800 dark:text-zinc-300">
          {title}
        </h2>{' '}
        {/* <p className="text-zinc-700">{description}</p> */}
      </div>
      <div className="grow border rounded flex justify-center items-center w-full bg-zinc-50">
        {children}
      </div>
    </div>
  );
};

export default Template;
