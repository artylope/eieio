// pages/index.js
'use client';
import { useState, useEffect, useRef } from 'react';
import useTextSelection from './TextHighlighter/utils/useTextSelection';
import HighlightPopover from './TextHighlighter/HighlightPopover';
import HighlightTag from './TextHighlighter/HighlightTag';

import { Delete, RotateCcw } from 'lucide-react';

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
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
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
      setIsPopoverVisible(false); // hide the popover
      setSelectedText('');

      // Remove the highlight
      document.querySelectorAll('.custom-highlight').forEach((span) => {
        const parent = span.parentNode;
        while (span.firstChild) parent.insertBefore(span.firstChild, span);
        parent.removeChild(span);
      });
    }
  };

  const handleRemoveTag = (text) => {
    setSavedTags(savedTags.filter((tag) => tag !== text));
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col w-full relative">
        <section className="border-b p-8 flex flex-col gap-y-4">
          {/* instructions section */}
          <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
            Highlight to save phrases
          </h3>
        </section>
        <div className="flex flex-col lg:flex-row">
          <article className="p-8 border-b lg:border-r lg:border-b-transparent flex grow lg:w-2/3 relative flex-col">
            <div className="leading-loose" id="selectable-text">
              <p className="highlight:bg-yellow-200 highlightable-text">
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
            <span className="italic text-zinc-500 mt-8 text-sm">
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
          <aside className="p-8 lg:w-1/3  flex  flex-wrap justify-start items-start gap-y-5">
            <div className="gap-y-5 flex flex-col w-full ">
              <div className="w-full flex items-center justify-between ">
                <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
                  Phrases you saved
                </h3>

                <button
                  className="relative py-1 gap-x-1 flex flex-no-wrap justify-start items-center text-zinc-500 rounded  hover:text-zinc-700"
                  onClick={() => setSavedTags([])}>
                  <RotateCcw className="w-4 h-4" />{' '}
                  <span className="px-1 text-sm">Clear all</span>
                </button>
              </div>

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
            </div>
            {/* side panel for highlighted text */}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TextHighlighter;
