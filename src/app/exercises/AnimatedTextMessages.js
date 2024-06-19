'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const useInView = (options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

const MessageContainer = ({ message, dateTime, isOutgoing }) => {
  const formattedMessage = message.replace(/\n/g, '<br />');

  const MessageVariants = {
    initial: { opacity: 0, y: 80 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -80,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.div
      variants={MessageVariants}
      className="flex flex-col gap-y-2 w-full">
      {dateTime && (
        <div className="w-full flex justify-center items-center mt-2">
          <span className="text-xs text-zinc-400">{dateTime}</span>
        </div>
      )}
      <div
        className={`flex w-full ${
          isOutgoing ? 'justify-end ' : 'justify-start'
        }`}>
        <div
          className={`relative rounded-lg p-4 max-w-xs leading-tight ${
            isOutgoing
              ? 'bg-green-300 text-gray-950 message-outgoing ml-16'
              : 'bg-zinc-100 text-zinc-950 message-incoming mr-16'
          }`}>
          <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedTextMessages = () => {
  const [ref, isIntersecting] = useInView({
    threshold: 0.1,
  });
  const [animationKey, setAnimationKey] = useState(0);
  const [visible, setVisible] = useState(true);

  const ThreadedContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        staggerDirection: 1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleReplay = () => {
    setVisible(false);
    setTimeout(() => {
      setAnimationKey((prevKey) => prevKey + 1);
      setVisible(true);
    }, 400); // Ensure this duration matches the exit transition duration
  };

  return (
    <div className="bg-white w-full flex justify-center items-center rounded p-2 pt-4 pb-16 md:pt-8 relative">
      <AnimatePresence>
        {visible && (
          <motion.div
            key={animationKey}
            ref={ref}
            variants={ThreadedContainerVariants}
            initial="initial"
            animate={isIntersecting ? 'animate' : 'initial'}
            exit="exit"
            className="flex flex-col gap-y-2">
            <MessageContainer
              key="1"
              message={`On my own, pretending he's beside me`}
              dateTime="11 June, 10:29 AM"
            />
            <MessageContainer
              key="2"
              message={`All the shine of a thousand spotlights. All the stars we steal from the night sky.`}
              isOutgoing={true}
            />
            <MessageContainer
              key="3"
              message={`You want to meet at the library later`}
              dateTime="Today, 9:01 AM"
            />
            <MessageContainer
              key="4"
              message={`Yea sure! See you there at 11`}
              isOutgoing={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 lg:bottom-8 lg:right-8">
        <button
          onClick={handleReplay}
          className="bg-zinc-900 rounded-full w-12 h-12 text-white flex justify-center items-center shadow-lg transition-all hover:-translate-y-1 hover:bg-zinc-800">
          <Play className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnimatedTextMessages;
