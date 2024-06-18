import React from 'react';
import { RotateCcw, X, Quote, StickyNote } from 'lucide-react';
import HighlightTag from './HighlightTag';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';

const Notebook = ({
  savedTags,
  onRemoveTag,
  onClearAllTags,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}) => {
  const bottomSheetVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <>
      <aside className="lg:w-1/3 flex-wrap justify-start items-start gap-y-3 md:gap-y-5 hidden md:flex md:max-h-[24rem] md:overflow-y-auto">
        <div className="gap-y-5 flex flex-col w-full">
          <div className="w-full flex items-center justify-between sticky top-0 bg-gradient-to-b from-white via-white to-transparent dark:via-gray-900 dark:from-gray-900 dark:to-transparent  z-10 p-5 md:px-8 md:pt-8 md:pb-8">
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
          <div className="gap-2 flex flex-wrap h-full overflow-y-auto px-5 md:px-8 md:pb-8 md:-mt-8">
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
        <AnimatePresence>
          {isBottomSheetOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 md:hidden" />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={bottomSheetVariants}
                className="fixed left-0 right-0 bottom-0 w-full overflow-y-scroll max-h-full">
                <Dialog.Content className="bg-white p-5 rounded-t-lg md:hidden flex flex-col max-h-[75vh] overflow-y-auto">
                  <Dialog.Close asChild>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase text-xs tracking-wide">
                        Notebook
                      </h3>
                      <button className="text-zinc-500 hover:text-zinc-700 w-8 h-8 flex justify-center items-center hover:bg-zinc-50 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </Dialog.Close>

                  <div className="grow pb-8">
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
                      <div className="gap-2 flex flex-wrap mt-3 justify-start">
                        {savedTags.map((tag, index) => (
                          <HighlightTag
                            key={index}
                            text={tag}
                            onRemove={onRemoveTag}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center items-center w-full pb-8">
                    {savedTags.length === 0 ? (
                      ''
                    ) : (
                      <button
                        className="relative border px-4 w-full py-2 gap-x-1 flex flex-no-wrap justify-center items-center text-zinc-500 rounded hover:text-zinc-700"
                        onClick={onClearAllTags}>
                        <RotateCcw className="w-4 h-4" />{' '}
                        <span className="px-1 text-sm">Clear all</span>
                      </button>
                    )}
                  </div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
};

export default Notebook;
