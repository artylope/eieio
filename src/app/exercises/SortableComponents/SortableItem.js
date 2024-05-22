import { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { X } from 'lucide-react';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex  justify-center items-center m-1 border rounded-md bg-white shadow-sm  text-slate-700 w-full ${
        isDragging ? 'border-indigo-500 border-2' : ''
      }`}>
      <div
        className={`px-2 py-2 flex grow justify-start items-center gap-2 relative`}>
        {' '}
        <button
          className="z-50 h-8 w-8 flex justify-center items-center cursor-grab "
          data-no-dnd="true"
          {...attributes}
          {...listeners}>
          <GripVertical className="text-slate-400 w-4 h-4 border-none" />
        </button>
        <span className="grow " data-no-dnd="true">
          {props.children}{' '}
        </span>{' '}
      </div>
      <button
        className="z-50 h-8 w-8 flex justify-center items-center mr-2"
        data-no-dnd="true"
        onClick={() => {
          console.log('click');
        }}>
        <X className="text-slate-400 w-4 h-4" />
      </button>
    </div>
  );
}
