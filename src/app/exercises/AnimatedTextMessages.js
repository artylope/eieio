'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, spring } from 'framer-motion';

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

const MessageContainer = ({ message, dateTime, isReply }) => {
  // Replace newline characters with <br /> tags
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
        className={`flex w-full ${isReply ? 'justify-end ' : 'justify-start'}`}>
        <div
          className={`relative text-zinc-800 rounded-lg p-4 max-w-sm leading-tight
             ${
               isReply
                 ? 'bg-green-300 message-reply ml-16'
                 : 'bg-zinc-100 message-default mr-16'
             } `}>
          <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedTextMessages = () => {
  const [ref, isIntersecting] = useInView({
    threshold: 0.1, // Adjust this value as needed
  });

  const ThreadedContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  return (
    <div className="bg-white w-full flex justify-center items-center rounded p-2 py-8">
      <motion.div
        ref={ref}
        variants={ThreadedContainerVariants}
        initial="initial"
        animate={isIntersecting ? 'animate' : 'initial'}
        className="flex flex-col gap-y-2">
        <MessageContainer
          message={`On my own, pretending he's beside me`}
          dateTime="11 June, 10:29 AM"
        />
        <MessageContainer
          message={`All the shine of a thousand spotlights. All the stars we steal from the night sky.`}
          isReply={true}
        />
        <MessageContainer
          message={`You want to meet at the library later`}
          dateTime="Today, 9:01 AM"
        />
        <MessageContainer
          message={`Yea sure! See you there at 11`}
          isReply={true}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedTextMessages;
