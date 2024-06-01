import React from 'react';
import { X } from 'lucide-react';

const HighlightTag = ({ text }) => {
  return (
    <div className="bg-zinc-100 rounded text-zinc-800 flex justify-start items-center gap-x-0.5 py-1 px-2 hover:bg-zinc-50">
      <p className="px-1"> {text}</p>
      <button className="flex justify-center items-center text-zinc-400 group-hover:text-zinc-500">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default HighlightTag;
