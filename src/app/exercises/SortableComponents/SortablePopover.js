import React from 'react';
import { X, Copy } from 'lucide-react';

const SortablePopover = ({ onRemove, onDuplicate, onClose }) => {
  return (
    <div className="z-50 absolute top-9 left-0 bg-white border shadow-md w-[12rem] rounded p-2 flex flex-col justify-start gap-y-2">
      <button
        className="px-2 py-2 w-full flex justify-start items-center  cursor-pointer rounded text-zinc-500 hover:bg-zinc-100 gap-x-2"
        onClick={() => {
          onRemove();
          onClose();
        }}>
        <X className=" w-4 h-4" /> Delete
      </button>
      <button
        className="px-2 py-2 w-full flex justify-start items-center  cursor-pointer rounded text-zinc-500 hover:bg-zinc-100 gap-x-2"
        onClick={() => {
          onDuplicate();
          onClose();
        }}>
        <Copy className=" w-4 h-4" /> Duplicate
      </button>
    </div>
  );
};

export default SortablePopover;
