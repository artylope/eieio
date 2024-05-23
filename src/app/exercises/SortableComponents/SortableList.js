'use client';
import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { ArrowUpDown, Plus } from 'lucide-react';

const initialItems = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

const SortableList = () => {
  const [items, setItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState(null);
  const [newText, setNewText] = useState('');
  const [popoverItem, setPopoverItem] = useState(null);

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

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item !== id));
  };

  const handleDuplicateItem = (id) => {
    const newItems = [...items];
    const index = newItems.indexOf(id);
    let newItem = `${id} copy`;
    let suffix = 1;

    while (newItems.includes(newItem)) {
      newItem = `${id} copy ${suffix}`;
      suffix += 1;
    }

    newItems.splice(index + 1, 0, newItem);
    setItems(newItems);
    setPopoverItem(null); // Close the popover when item is duplicated
  };

  const handleReorderItems = () => {
    const sortedItems = [...items].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true })
    );
    setItems(sortedItems);
  };

  const handleChangeItem = (id) => {
    setEditingItem(id);
    setNewText(items.find((item) => item === id));
  };

  const handleConfirmChange = () => {
    setItems(items.map((item) => (item === editingItem ? newText : item)));
    setEditingItem(null);
  };

  const handleTogglePopover = (id) => {
    setPopoverItem(popoverItem === id ? null : id);
  };

  return (
    <div className="p-8 w-full">
      <div className="flex flex-col gap-y-2 max-w-xl mx-auto">
        <div className="w-full grow flex justify-end gap-x-2">
          <button
            className="h-12 w-fit flex bg-white text-zinc-600 shadow-sm justify-start items-center cursor-pointer rounded-md border gap-x-2 px-4 hover:text-zinc-700 hover:bg-zinc-100"
            onClick={handleReorderItems}>
            <ArrowUpDown className=" w-4 h-4" /> Reorder
          </button>
          <button
            className="h-12 w-fit flex bg-zinc-900 text-zinc-50 shadow-sm justify-start items-center cursor-pointer rounded-md border gap-x-2 px-4 hover:text-white hover:bg-zinc-800"
            onClick={handleAddItem}>
            <Plus className=" w-4 h-4" /> Add Item
          </button>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div className="grow w-full flex flex-col gap-y-2">
              {items.map((id) => (
                <SortableItem
                  key={id}
                  id={id}
                  isEditing={editingItem === id}
                  newText={newText}
                  onEditTextChange={setNewText}
                  onConfirmChange={handleConfirmChange}
                  onRemove={handleRemoveItem}
                  onDuplicate={handleDuplicateItem}
                  onChange={handleChangeItem}
                  onTogglePopover={handleTogglePopover}
                  isOpen={popoverItem === id}>
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
