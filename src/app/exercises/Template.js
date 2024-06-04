'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Share2 } from 'lucide-react';

const Template = ({ id, title, description, date, children, libraries }) => {
  const router = useRouter();

  const LibraryLinks = ({ libraries }) => {
    return (
      <>
        {libraries.map((library, index) => (
          <div
            key={index}
            className="bg-zinc-100 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 flex  justify-start items-center px-2 py-1 text-sm rounded w-fit">
            <a href={library.link} target="_blank" rel="noopener noreferrer">
              {library.name}
            </a>
          </div>
        ))}
      </>
    );
  };

  function handleShareButton() {
    console.log('clicked');
    const currentPath = window.location.origin; // Get the full URL
    let url = `${currentPath}/#exercise${id}`;
    console.log(url);
    navigator.clipboard.writeText(url);
  }

  return (
    <div
      id={`exercise${id}`}
      className="py-8 flex flex-col gap-y-6 justify-start items-start grow w-full ">
      <div className="flex flex-col gap-y-3 w-full">
        <p className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
          Exercise {id} <span className="ml-2 border-l px-2">{date}</span>
        </p>
        <div className="flex justify-start items-start gap-x-8">
          <h2 className="font-semibold text-2xl text-zinc-800 dark:text-zinc-300">
            {title}
          </h2>{' '}
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          {' '}
          <p className="text-zinc-500 max-w-xl">{description}</p>{' '}
          <div className="text-zinc-500 flex flex-col md:flex-row gap-2 w-full">
            <div className="flex gap-x-2 grow flex-col sm:flex-row gap-2 w-full ">
              {' '}
              <LibraryLinks libraries={libraries} />{' '}
            </div>
            <button
              className="px-2 py-1 flex justify-start items-center text-zinc-500 rounded hover:bg-zinc-100 hover:text-zinc-700"
              onClick={handleShareButton}>
              <Share2 className="w-5 h-5" />{' '}
              <span className="px-2"> Share</span>
            </button>
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
