import React from 'react';

const HighlightPopover = ({ coords, text }) => {
  if (!coords) return null;
  console.log();

  const popoverStyle = {
    top: coords.top, // Adjust the position to be above the selection
    left: coords.left,
    zIndex: 1000,
  };

  return (
    <div
      className={`leading-normal absolute bg-white border rounded-md max-w-sm shadow-md p-4  -top-${popoverStyle.top} left-${popoverStyle.left}`}>
      {text}
    </div>
  );
};

export default HighlightPopover;
