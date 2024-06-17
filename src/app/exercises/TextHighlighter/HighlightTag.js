import React from 'react';
import { X } from 'lucide-react';

const HighlightTag = ({ text, onRemove }) => {
  return (
    <div className="h-fit bg-zinc-100 rounded text-zinc-800 flex justify-start items-start gap-x-0.5 py-1 px-2 group hover:bg-red-50">
      <p className="px-1"> {text}</p>
      <div className="h-6 flex justify-center items-center">
        {' '}
        <button
          onClick={() => onRemove(text)}
          className="flex justify-center items-center text-zinc-400 ">
          <X className=" w-4 h-4 group-hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default HighlightTag;
