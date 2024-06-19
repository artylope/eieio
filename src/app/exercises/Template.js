'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, Check } from 'lucide-react';

const Template = ({ id, title, description, date, children, libraries }) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const LibraryLinks = ({ libraries }) => {
    return (
      <>
        {libraries.map((library, index) => (
          <div
            key={index}
            className="bg-zinc-100 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 flex justify-start items-center px-2 py-1 text-sm rounded">
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
    setIsCopied(true);

    // Revert back to the original state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
          <p className="text-zinc-500 max-w-2xl leading-relaxed">
            {description}
          </p>{' '}
          <div className="text-zinc-500 flex gap-2 w-full justify-between">
            <div className="flex gap-x-2 flex-rows">
              {' '}
              <LibraryLinks libraries={libraries} />{' '}
            </div>
            <div className="relative">
              <button
                className={`relative py-1 gap-x-1 flex flex-no-wrap justify-start items-center  rounded  ${
                  isCopied
                    ? 'bg-zinc-800 text-white px-2 hover:text-white'
                    : 'text-zinc-500 hover:text-zinc-700'
                } `}
                onClick={handleShareButton}>
                {isCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}{' '}
                <span className="px-1 text-sm">
                  {isCopied ? 'Copied' : 'Copy Link'}
                </span>
              </button>
            </div>
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
