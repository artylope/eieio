// pages/index.js
'use client';
import { useState, useEffect, useRef } from 'react';
import useTextSelection from './TextHighlighter/utils/useTextSelection';
import HighlightPopover from './TextHighlighter/highlightPopover';
import HighlightTag from './TextHighlighter/HighlightTag';

const TextHighlighter = () => {
  const { selectionCoords, selectedText, setSelectedText } = useTextSelection();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const popoverRef = useRef(null);

  // Function to check if clicked outside of popover
  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsPopoverVisible(false);
      setSelectedText(''); // unhighlight the selected text
    }
  };

  // Add event listener for clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedText) {
      setIsPopoverVisible(true);
    } else {
      setIsPopoverVisible(false);
    }
  }, [selectedText]);

  return (
    <div className="p-8">
      <div className="bg-white rounded-md flex flex-col w-full border shadow-sm relative">
        <section className="border-b p-8">
          {/* instructions section */}
          <p className="font-semibold">Highlight the phrases you want to tag</p>
        </section>
        <div className="flex flex-col lg:flex-row">
          <article className="p-8 border-b lg:border-r lg:border-b-transparent flex grow lg:w-2/3 relative">
            <div className="leading-loose">
              <p className="highlight:bg-yellow-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu
                enim non nisl ultricies mollis sed et ante. In viverra lacinia
                ante a auctor. Nulla pellentesque ac dolor quis sollicitudin.
                Sed semper fermentum elementum. Donec maximus placerat erat, a
                facilisis lorem pharetra nec. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. Aliquam dapibus vel nunc nec porta. Vestibulum
                tristique orci sit amet dolor porta, eu condimentum velit
                imperdiet. Nunc in auctor nibh, a vehicula est. Donec faucibus
                maximus finibus. Vestibulum ac malesuada enim, a pellentesque
                ex.
              </p>
            </div>
            {isPopoverVisible && (
              <div ref={popoverRef}>
                <HighlightPopover
                  coords={selectionCoords}
                  text={selectedText}
                />
              </div>
            )}
          </article>
          <aside className="p-8 flex lg:w-1/3 gap-2">
            {/* side panel for highlighted text */}
            <HighlightTag text="Important text" />
            <HighlightTag text="some other things to note" />
            <HighlightTag text="lorem ipsum parllayis" />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TextHighlighter;
