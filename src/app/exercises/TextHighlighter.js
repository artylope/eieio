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

  const highlightableRef = useRef(null);

  useEffect(() => {
    if (selectedText) {
      setIsPopoverVisible(true);
    } else {
      setIsPopoverVisible(false);
    }
  }, [selectedText]);

  useEffect(() => {
    setIsPopoverVisible(false);
    setSelectedText('');
  }, [isBottomSheetOpen]);

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
    setSelectedText('');
    setIsPopoverVisible(false);
  };

  // Prevent default iOS menu only when text is selected
  const preventDefaultMenu = (event) => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      event.preventDefault();
    }
  };

  // Add event listener to prevent default iOS menu
  useEffect(() => {
    const highlightableElement = highlightableRef.current;
    if (highlightableElement) {
      highlightableElement.addEventListener('contextmenu', preventDefaultMenu);
      highlightableElement.addEventListener('touchstart', preventDefaultMenu);
      highlightableElement.addEventListener('touchend', preventDefaultMenu);
      highlightableElement.addEventListener('touchmove', preventDefaultMenu);
    }

    return () => {
      if (highlightableElement) {
        highlightableElement.removeEventListener(
          'contextmenu',
          preventDefaultMenu
        );
        highlightableElement.removeEventListener(
          'touchstart',
          preventDefaultMenu
        );
        highlightableElement.removeEventListener(
          'touchend',
          preventDefaultMenu
        );
        highlightableElement.removeEventListener(
          'touchmove',
          preventDefaultMenu
        );
      }
    };
  }, []);

  return (
    <div className="bg-white rounded relative">
      <div className="flex flex-col w-full relative">
        <div className="flex flex-col lg:flex-row">
          <article
            ref={highlightableRef}
            className="px-5 py-8 md:p-8 lg:border-r lg:border-b-transparent flex grow lg:w-2/3 relative flex-col gap-y-3  md:gap-y-5">
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
