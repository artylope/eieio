import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

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

  const inputRef = useRef(null);

  useEffect(() => {
    if (props.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.isEditing]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex justify-center items-center border rounded-md bg-white shadow-sm  text-slate-700 w-full ${
        isDragging ? 'border-indigo-500 border-2' : ''
      }`}>
      <div
        className={`flex grow justify-start items-center gap-2 relative p-2`}>
        {' '}
        <button
          className="z-50 h-8 w-8 flex justify-center items-center cursor-grab rounded hover:bg-slate-100 "
          {...attributes}
          {...listeners}>
          <GripVertical className="text-slate-400 w-4 h-4 border-none" />
        </button>
        <div
          className={`border-b p-1 w-full grow ${
            props.isEditing ? ' border-slate-300' : 'border-transparent'
          }`}>
          {props.isEditing ? (
            <input
              className="grow focus:outline-none w-full "
              ref={inputRef}
              value={props.newText}
              onChange={(e) => props.onEditTextChange(e.target.value)}
              onBlur={props.onConfirmChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  props.onConfirmChange();
                }
              }}
            />
          ) : (
            <span className="grow" onClick={() => props.onChange(props.id)}>
              {props.children}
            </span>
          )}
        </div>
      </div>

      <button
        className="z-50 h-8 w-8 flex justify-center items-center mr-2 text-transparent cursor-pointer rounded hover:text-slate-400 hover:bg-slate-100"
        onClick={() => {
          props.onRemove(props.id);
        }}>
        <X className=" w-4 h-4" />
      </button>
    </div>
  );
}
