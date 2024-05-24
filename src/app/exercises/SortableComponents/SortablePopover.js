import React from 'react';
import { X, Copy, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const SortablePopover = ({ onRemove, onDuplicate, onClose }) => {
  const popoverVariants = {
    hidden: {
      opacity: 0,
      x: 0,
      y: 0,
      transition: { type: 'spring', bounce: 0.25, duration: 0.5 },
      scale: 0.1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', bounce: 0.25, duration: 0.5 },
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: { type: 'spring', bounce: 0.25, duration: 0.5 },
      scale: 0.1,
    },
  };
  return (
    <motion.div
      variants={popoverVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="z-50 origin-top-right lg:origin-top-left absolute top-9 -left-[12rem] lg:left-0 bg-white border shadow-md w-[12rem] rounded p-2 flex flex-col justify-start gap-y-2">
      <button
        className="px-3 py-2 w-full flex justify-start items-center  cursor-pointer rounded text-zinc-500 hover:bg-zinc-100 gap-x-2"
        onClick={() => {
          onRemove();
          onClose();
        }}>
        <X className=" w-4 h-4" /> Delete
      </button>
      <button
        className="px-3 py-2 w-full flex justify-start items-center  cursor-pointer rounded text-zinc-500 hover:bg-zinc-100 gap-x-2"
        onClick={() => {
          onDuplicate();
          onClose();
        }}>
        <Copy className=" w-4 h-4" /> Duplicate
      </button>
    </motion.div>
  );
};

export default SortablePopover;
