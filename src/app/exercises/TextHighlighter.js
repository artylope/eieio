'use client';
import { useState, useEffect, useRef } from 'react';
import useTextSelection from './TextHighlighter/utils/useTextSelection';
import HighlightPopover from './TextHighlighter/HighlightPopover';
import Notebook from './TextHighlighter/Notebook';

const TextHighlighter = () => {
  const { selectionCoords, selectedText, setSelectedText } = useTextSelection();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const popoverRef = useRef(null);

  const [savedTags, setSavedTags] = useState(['Our attention is limited.']);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
      setIsPopoverVisible(false);
      setSelectedText('');
      setIsBottomSheetOpen(true);
    }
  };

  const handleRemoveTag = (text) => {
    setSavedTags(savedTags.filter((tag) => tag !== text));
  };

  const handleClearAllTags = () => {
    setSavedTags([]);
  };

  return (
    <div className="bg-white rounded relative">
      <div className="flex flex-col w-full relative">
        <div className="flex flex-col lg:flex-row">
          <article className="px-5 py-8 md:p-8 lg:border-r lg:border-b-transparent flex grow lg:w-2/3 relative flex-col gap-y-3  md:gap-y-5">
            <div className="leading-loose highlightable-text">
              <p>
                Our attention is limited. There’s no way we can process the
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
            <span className="italic text-zinc-500 mt-4 text-sm">
              Edited excerpts from The Subtle Art of Not Giving A *uck by Mark
              Manson
            </span>
            <div>
              {isPopoverVisible && (
                <div ref={popoverRef}>
                  <HighlightPopover
                    coords={selectionCoords}
                    text={selectedText}
                    onSave={handleSaveTag}
                  />
                </div>
              )}
            </div>
          </article>
          <Notebook
            savedTags={savedTags}
            onRemoveTag={handleRemoveTag}
            onClearAllTags={handleClearAllTags}
            isBottomSheetOpen={isBottomSheetOpen}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default TextHighlighter;
