import { useEffect, useState } from 'react';

const useTextSelection = () => {
  const [selectionCoords, setSelectionCoords] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      console.log('Selection:', selection); // Log selection object
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        console.log('Range:', range); // Log range object
        if (!range.collapsed) {
          const rect = range.getBoundingClientRect();
          console.log('Rect:', rect); // Log rect object
          setSelectionCoords({
            top: rect.top,
            left: rect.left,
            width: rect.width,
          });
          setSelectedText(selection.toString());
          console.log(`Highlighted text: "${selection.toString()}"`);
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

    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
    };
  }, []);

  return { selectionCoords, selectedText };
};

export default useTextSelection;
