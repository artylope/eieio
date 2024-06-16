// pages/index.js
'use client';
import { useState, useEffect, useRef } from 'react';
import useTextSelection from './TextHighlighter/utils/useTextSelection';
import HighlightPopover from './TextHighlighter/HighlightPopover';
import HighlightTag from './TextHighlighter/HighlightTag';

const TextHighlighter = () => {
  const { selectionCoords, selectedText, setSelectedText } = useTextSelection();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const popoverRef = useRef(null);

  const [savedTags, setSavedTags] = useState([]);

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

  const handleSaveTag = () => {
    if (selectedText && !savedTags.includes(selectedText)) {
      setSavedTags([...savedTags, selectedText]);
      setSelectedText(''); // clear the selected text after saving
      setIsPopoverVisible(false); // hide the popover
    }
  };

  const handleRemoveTag = (text) => {
    setSavedTags(savedTags.filter((tag) => tag !== text));
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-md flex flex-col w-full border shadow-sm relative">
        <section className="border-b p-8 flex flex-col gap-y-4">
          {/* instructions section */}

          <p className="font-semibold">
            Highlight the phrases you want to save
          </p>
        </section>
        <div className="flex flex-col lg:flex-row">
          <article className="p-8 border-b lg:border-r lg:border-b-transparent flex grow lg:w-2/3 relative flex-col">
            <div className="leading-loose">
              <p className="highlight:bg-yellow-200">
                But our attention is limited. There’s no way we can process the
                tidal waves of information flowing past us constantly.
                Therefore, the only zeroes and ones that break through and catch
                our attention are the truly exceptional pieces of information.
                This flood of extreme information has conditioned us to believe
                that exceptionalism is the new normal. The deluge of exceptional
                information drives us to feel pretty damn insecure and
                desperate. We can be truly successful only at something we’re
                willing to fail at. We need some sort of existential crisis to
                take an objective look at how we’ve been deriving our meaning in
                our life, and then consider a changing course. Our culture today
                confuses great attention and great success, assuming them to be
                the same thing.
              </p>
            </div>
            <span className="italic text-zinc-500 mt-8">
              Excerpts from The Subtle Art of Not Giving A Fuck by Mark Manson
            </span>

            {isPopoverVisible && (
              <div ref={popoverRef}>
                <HighlightPopover
                  coords={selectionCoords}
                  text={selectedText}
                  onSave={handleSaveTag}
                />
              </div>
            )}
          </article>
          <aside className="p-8 flex lg:w-1/3  flex-wrap justify-start items-start">
            {/* side panel for highlighted text */}
            <div className="gap-2 flex flex-wrap">
              {' '}
              {savedTags.map((tag, index) => (
                <HighlightTag
                  key={index}
                  text={tag}
                  onRemove={handleRemoveTag}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TextHighlighter;
