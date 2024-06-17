import { useEffect, useState } from 'react';

const useTextSelection = () => {
  const [selectionCoords, setSelectionCoords] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelectionChange = (event) => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const highlightableElement = document.querySelector(
          '.highlightable-text'
        );
        if (
          !range.collapsed &&
          highlightableElement.contains(range.commonAncestorContainer)
        ) {
          // Remove previous highlights
          document.querySelectorAll('.custom-highlight').forEach((span) => {
            const parent = span.parentNode;
            while (span.firstChild) parent.insertBefore(span.firstChild, span);
            parent.removeChild(span);
          });

          // Apply custom background to the selected text
          const span = document.createElement('span');
          span.className = 'custom-highlight';
          range.surroundContents(span);

          const rect = span.getBoundingClientRect();
          const parentRect = span.offsetParent.getBoundingClientRect();

          setSelectionCoords({
            top: rect.top - parentRect.top,
            left: rect.left - parentRect.left + rect.width / 2, // Center the popover horizontally
            height: rect.height,
          });
          setSelectedText(selection.toString());
        } else {
          setSelectionCoords(null);
          setSelectedText('');
        }
      } else {
        setSelectionCoords(null);
        setSelectedText('');
      }
    };

    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange);
    document.addEventListener('touchend', handleSelectionChange);

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
      document.removeEventListener('touchend', handleSelectionChange);
    };
  }, []);

  return { selectedText, setSelectedText, selectionCoords };
};

export default useTextSelection;
