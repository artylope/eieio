'use client';
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const initialItems = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
];

const SortableList = () => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddItem = () => {
    let newItem = 'untitled';
    let suffix = 1;

    while (items.includes(newItem)) {
      newItem = `untitled ${suffix}`;
      suffix += 1;
    }

    setItems([...items, newItem]);
  };

  const handleReorderItems = () => {
    const sortedItems = [...items].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
    setItems(sortedItems);
  };

  return (
    <div className="py-20">
      <div className="max-w-md flex flex-col m-1">
        <div className="flex gap-x-4 grow w-full">
          <button
            className="justify-start items-center m-1  text-slate-700 w-80 h-11"
            onClick={handleAddItem}>
            Add Item
          </button>
          <button
            className="justify-start items-center m-1  text-slate-700 w-80 h-11"
            onClick={handleReorderItems}>
            Reorder Items
          </button>
        </div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className=" flex flex-col">
              {items.map((id) => (
                <SortableItem key={id} id={id}>
                  {id}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default SortableList;
