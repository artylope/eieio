// components/HighlightPopover.js
import React from 'react';

const HighlightPopover = ({ coords, text }) => {
  if (!coords) return null;

  const popoverStyle = {
    top: `${coords.top - coords.height - 36}px`, // 1rem above the span
    left: `${coords.left}px`,
    transform: 'translateX(-50%)', // Center horizontally
    zIndex: 1000,
  };

  return (
    <div
      className="absolute bg-white border rounded-md shadow-md h-12 w-16"
      style={popoverStyle}>
      <div className="flex justify-center items-center grow w-full h-full">
        Save
      </div>
    </div>
  );
};

export default HighlightPopover;
