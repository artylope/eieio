import React from 'react';
import { RotateCcw, X, Quote, StickyNote } from 'lucide-react';
import HighlightTag from './HighlightTag';
import * as Dialog from '@radix-ui/react-dialog';

const Notebook = ({
  savedTags,
  onRemoveTag,
  onClearAllTags,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}) => (
  <>
    <aside className="p-5 md:p-8 lg:w-1/3 flex-wrap justify-start items-start gap-y-3 md:gap-y-5 hidden md:flex">
      <div className="gap-y-5 flex flex-col w-full">
        <div className="w-full flex items-center justify-between">
          <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
            Notebook
          </h3>
          <button
            className="relative py-1 gap-x-1 flex flex-no-wrap justify-start items-center text-zinc-500 rounded hover:text-zinc-700"
            onClick={onClearAllTags}>
            <RotateCcw className="w-4 h-4" />{' '}
            <span className="px-1 text-sm">Clear all</span>
          </button>
        </div>
        <div className="gap-2 flex flex-wrap">
          {savedTags.map((tag, index) => (
            <HighlightTag key={index} text={tag} onRemove={onRemoveTag} />
          ))}
        </div>
      </div>
    </aside>
    <Dialog.Root open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
      <Dialog.Trigger className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 rounded-full bg-white text-zinc-600 hover:text-zinc-800 hover:-translate-y-1 hover:shadow-xl transition-all group border shadow-lg gap-x-2 flex md:hidden justify-center items-center px-4 py-2">
        <StickyNote className="text-zinc-500 group-hover:text-zinc-700 group w-5 h-5" />{' '}
        Notebook
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 md:hidden" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 bg-white p-5 rounded-t-lg md:hidden flex flex-col min-h-[24rem]">
          <Dialog.Close asChild>
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
                Notebook
              </h3>
              <button className="text-zinc-500 hover:text-zinc-700">
                <X className="w-6 h-6" />
              </button>
            </div>
          </Dialog.Close>
          <div className="flex justify-end items-center mb-4">
            {savedTags.length === 0 ? (
              ''
            ) : (
              <button
                className="relative py-1 gap-x-1 flex flex-no-wrap justify-start items-center text-zinc-500 rounded hover:text-zinc-700"
                onClick={onClearAllTags}>
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
                  Nothing saved
                </h4>
                <p className="text-zinc-600">
                  Phrases you save will be stored here
                </p>
              </div>
            ) : (
              savedTags.map((tag, index) => (
                <HighlightTag key={index} text={tag} onRemove={onRemoveTag} />
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>
);

export default Notebook;
