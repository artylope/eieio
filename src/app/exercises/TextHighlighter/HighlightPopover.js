// components/HighlightPopover.js
import React from 'react';
import { Save } from 'lucide-react';

const HighlightPopover = ({ coords, text, onSave }) => {
  if (!coords) return null;

  const popoverStyle = {
    top: `${coords.top - 64}px`, // 1rem above the span
    left: `${coords.left}px`,
    transform: 'translateX(-50%)', // Center horizontally
    zIndex: 1000,
  };

  return (
    <div
      className="absolute bg-white border rounded-md shadow-md h-11 w-20 flex justify-center items-center z-90"
      style={popoverStyle}>
      <div className="">
        <button
          className="flex justify-center items-center grow text-zinc-700 hover:text-zinc-800 px-4 py-1"
          onClick={onSave}
          onTouchStart={onSave} // Ensure touch events are handled
        >
          <span className=""> Save</span>
        </button>
      </div>
    </div>
  );
};

export default HighlightPopover;
