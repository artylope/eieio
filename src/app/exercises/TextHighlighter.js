// pages/index.js
'use client';
import { useState, useEffect, useRef } from 'react';
import useTextSelection from './TextHighlighter/utils/useTextSelection';
import HighlightPopover from './TextHighlighter/HighlightPopover';
import HighlightTag from './TextHighlighter/HighlightTag';
import { StickyNote, RotateCcw, X, Quote } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const TextHighlighter = () => {
  const { selectionCoords, selectedText, setSelectedText } = useTextSelection();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const popoverRef = useRef(null);

  const [savedTags, setSavedTags] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Function to check if clicked outside of popover
  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsPopoverVisible(false);
      setSelectedText(''); // unhighlight the selected text

      // Remove the highlight
      document.querySelectorAll('.custom-highlight').forEach((span) => {
        const parent = span.parentNode;
        while (span.firstChild) parent.insertBefore(span.firstChild, span);
        parent.removeChild(span);
      });

      window.getSelection().removeAllRanges(); // Clear the selection
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
      setIsBottomSheetOpen(true);

      // Remove the highlight
      document.querySelectorAll('.custom-highlight').forEach((span) => {
        const parent = span.parentNode;
        while (span.firstChild) parent.insertBefore(span.firstChild, span);
        parent.removeChild(span);
      });

      window.getSelection().removeAllRanges(); // Clear the selection
    }
  };

  const handleRemoveTag = (text) => {
    setSavedTags(savedTags.filter((tag) => tag !== text));
  };

  const handleClearAllTags = () => {
    setSavedTags([]);
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
    const highlightableElement = document.querySelector('.highlightable-text');
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
          <article className="px-5 py-8 md:p-8 border-b lg:border-r lg:border-b-transparent flex grow lg:w-2/3 relative flex-col gap-y-3  md:gap-y-5">
            <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
              Highlight to save phrases
            </h3>
            <div className="leading-loose">
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
          <aside className="p-5 md:p-8 lg:w-1/3 flex-wrap justify-start items-start gap-y-3 md:gap-y-5 hidden md:flex">
            <div className="gap-y-5 flex flex-col w-full">
              <div className="w-full flex items-center justify-between">
                <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
                  Phrases you saved
                </h3>

                <button
                  className="relative py-1 gap-x-1 flex flex-no-wrap justify-start items-center text-zinc-500 rounded hover:text-zinc-700"
                  onClick={handleClearAllTags}>
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

      <Dialog.Root open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <Dialog.Trigger className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 rounded-full  bg-white text-zinc-600 border shadow-lg gap-x-2 flex md:hidden justify-center items-center px-4 py-2">
          <StickyNote className="w-5 h-5" /> Show saved phrases
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 md:hidden" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 bg-white p-5 rounded-t-lg md:hidden flex  flex-col  min-h-[24rem]">
            <Dialog.Close asChild>
              <div className="flex justify-between items-center mb-8">
                {' '}
                <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
                  Phrases you saved
                </h3>
                <button className="text-zinc-500 hover:text-zinc-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </Dialog.Close>
            <div className="flex justify-end items-center mb-4 ">
              {savedTags.length === 0 ? (
                ''
              ) : (
                <button
                  className="relative py-1 gap-x-1 flex flex-no-wrap justify-start items-center text-zinc-500 rounded hover:text-zinc-700"
                  onClick={handleClearAllTags}>
                  <RotateCcw className="w-4 h-4" />{' '}
                  <span className="px-1 text-sm">Clear all</span>
                </button>
              )}
            </div>
            <div className="gap-2 flex flex-wrap mt-3 justify-start">
              {savedTags.length === 0 ? (
                <div className="flex flex-col grow justify-center items-center h-full w-full gap-y-2 mt-4">
                  <Quote className="w-6 h-6 text-zinc-600 mb-2" />
                  <h4 className="text-zinc-800 text-xl font-semibold">
                    No phrases saved yet
                  </h4>
                  <p className="text-zinc-600">
                    Saved phrases will show up here
                  </p>
                </div>
              ) : (
                savedTags.map((tag, index) => (
                  <HighlightTag
                    key={index}
                    text={tag}
                    onRemove={handleRemoveTag}
                  />
                ))
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default TextHighlighter;
