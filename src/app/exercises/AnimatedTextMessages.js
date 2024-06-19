import React from 'react';

const MessageContainer = ({ message, date }) => (
  <div className="flex flex-col justify-start gap-y-1">
    <span className="text-xs text-zinc-500">{date}</span>
    <div className="bg-zinc-100 text-zinc-100 rounded p-4 max-w-sm">
      {message}
    </div>
  </div>
);
const AnimatedTextMessages = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <MessageContainer message="hello is me" />
      <MessageContainer message="hello is me" />
    </div>
  );
};

export default AnimatedTextMessages;
