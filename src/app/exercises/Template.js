import React from 'react';

const Template = ({
  title,
  subtitle,
  description,
  date,
  children,
  libraries,
}) => {
  const LibraryLinks = ({ libraries }) => {
    return (
      <>
        {libraries.map((library, index) => (
          <div
            key={index}
            className="bg-zinc-100 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 flex justify-center item-center px-2 py-1 text-sm rounded">
            <a href={library.link} target="_blank" rel="noopener noreferrer">
              {library.name}
            </a>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="py-8 flex flex-col gap-y-6 justify-start items-start grow w-full ">
      <div className="flex flex-col gap-y-3">
        <p className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
          Exercise {subtitle} <span className="ml-2 border-l px-2">{date}</span>
        </p>
        <h2 className="font-semibold text-2xl text-zinc-800 dark:text-zinc-300">
          {title}
        </h2>{' '}
        <div>
          {' '}
          <p className="text-zinc-500">{description}</p>{' '}
          <div className="text-zinc-500 flex gap-x-2 mt-3 ">
            <LibraryLinks libraries={libraries} />
          </div>
        </div>
      </div>
      <div className="grow border rounded flex justify-center items-center w-full bg-zinc-50">
        {children}
      </div>
    </div>
  );
};

export default Template;
