'use client';
import { motion } from 'framer-motion';

const MessageContainer = ({ message, dateTime, isReply }) => {
  // Replace newline characters with <br /> tags
  const formattedMessage = message.replace(/\n/g, '<br />');

  return (
    <div className="flex flex-col  gap-y-2 w-[26rem]">
      {dateTime && (
        <div className="w-full flex justify-center items-center mt-2">
          <span className="text-xs text-zinc-400">{dateTime}</span>
        </div>
      )}
      <div
        className={`flex w-full ${isReply ? 'justify-end ' : 'justify-start'}`}>
        <div
          className={`bg-zinc-100 text-zinc-800 rounded-lg p-4 w-[20rem] ${
            isReply ? 'bg-green-300 ' : ''
          }`}>
          <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
        </div>{' '}
      </div>
    </div>
  );
};

const AnimatedTextMessages = () => {
  const MessageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: 'easeOut',
        delay: 0.1,
      },
    },
  };
  const ThreadedContainerVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <div className=" bg-white w-full flex justify-center items-center py-8">
      <motion.div
        variants={ThreadedContainerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col gap-y-2">
        <motion.div
          variants={MessageVariants}
          initial="initial"
          animate="animate">
          <MessageContainer
            message={`On my own \n pretending he's beside me`}
            dateTime="11 June, 10:29 AM"
          />
        </motion.div>

        <motion.div
          variants={MessageVariants}
          initial="initial"
          animate="animate">
          <MessageContainer
            message={`All the shine of a thousand spotlights \n All the stars we steal from the night sky`}
            isReply={true}
          />
        </motion.div>
        <motion.div
          variants={MessageVariants}
          initial="initial"
          animate="animate">
          <MessageContainer
            message={`You want to meet at the library later`}
            dateTime="Today, 9:01 AM"
          />
        </motion.div>
        <motion.div
          variants={MessageVariants}
          initial="initial"
          animate="animate">
          <MessageContainer
            message={`Yea sure! See you there at 11`}
            isReply={true}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedTextMessages;
