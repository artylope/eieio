import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, EllipsisVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SortablePopover from './SortablePopover';

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

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

  useEffect(() => {
    if (props.isOpen) {
      setShowPopover(true);
    } else {
      setShowPopover(false);
    }
  }, [props.isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
        props.onTogglePopover(null);
      }
    };

    if (showPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover, props]);

  const togglePopover = () => {
    if (!showPopover) {
      props.onTogglePopover(props.id);
    } else {
      setShowPopover(false);
      props.onTogglePopover(null);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex justify-center items-center border rounded-md bg-white shadow-sm  text-zinc-700 w-full ${
        isDragging ? 'border-zinc-900 border-2' : ''
      }`}>
      <div
        className={`flex grow justify-start items-center gap-2 relative p-2`}>
        {' '}
        <button
          className="z-50 h-8 w-8 flex justify-center items-center cursor-grab rounded hover:bg-zinc-100 "
          {...attributes}
          {...listeners}>
          <GripVertical className="text-zinc-400 w-4 h-4 border-none" />
        </button>
        <div
          className={`border-b p-1 w-full grow cursor-text ${
            props.isEditing ? ' border-zinc-300' : 'border-transparent'
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
            <span
              className="grow w-full flex"
              onClick={() => props.onChange(props.id)}>
              {props.children}
            </span>
          )}
        </div>
      </div>

      <div className="mr-2 relative">
        <button
          className="z-50 h-8 w-8 flex justify-center items-center  cursor-pointer rounded text-zinc-400 hover:bg-zinc-100"
          onClick={togglePopover}>
          <EllipsisVertical className=" w-4 h-4" />
        </button>
        {/* Popover component */}
        {showPopover && (
          <div ref={popoverRef}>
            <SortablePopover
              onRemove={() => {
                props.onRemove(props.id);
                setShowPopover(false);
                props.onTogglePopover(null);
              }}
              onDuplicate={() => {
                props.onDuplicate(props.id);
                setShowPopover(false);
                props.onTogglePopover(null);
              }}
              onClose={() => {
                setShowPopover(false);
                props.onTogglePopover(null);
              }}
            />{' '}
          </div>
        )}
      </div>
    </div>
  );
}
