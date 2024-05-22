'use client';
import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from './DragAndDropComponents/Draggable';
import { Droppable } from './DragAndDropComponents/Droppable';

const DragAndDrop = () => {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable">Go ahead, drag me.</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === 'droppable' ? draggable : 'Drop here'}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
};

export default DragAndDrop;
