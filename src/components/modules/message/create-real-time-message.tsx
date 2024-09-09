'use client';

import React, { useRef } from 'react';
import { addNewMessage } from '@/actions/message';
import { AnimationProps, motion } from 'framer-motion';

type Coordinates = {
  x: number;
  y: number;
} | null;

interface CreateRealtimeMessageFormProps {
  coordinates: Coordinates;
  resetCoordinates: () => void;
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function CreateRealtimeMessageForm({
  coordinates,
  resetCoordinates,
}: CreateRealtimeMessageFormProps) {
  const messageRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const animate: AnimationProps['animate'] = {
    opacity: 1,
    width: 'auto',
  };

  const randomColor = getRandomColor();

  const _addNewMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const message = messageRef?.current?.value || '';
    const author = localStorage.getItem('author') || '';

    const x = coordinates?.x || 200;
    const y = coordinates?.y || 200;

    const fd = new FormData();
    fd.append('message', message);
    fd.append('author', author);
    fd.append('x', x.toString());
    fd.append('y', y.toString());
    fd.append('color', randomColor);

    await addNewMessage(fd).finally(() => {
      formRef.current?.reset();
      resetCoordinates();
    });
  };

  return (
    <motion.div
      className="fixed w-4 rounded-lg p-2 opacity-0"
      style={{
        top: coordinates?.y + 'px',
        left: coordinates?.x + 'px',
        background: randomColor,
      }}
      animate={animate}
    >
      <form onSubmit={_addNewMessage} ref={formRef} className="block">
        <input
          type="text"
          className="block h-8 rounded-md border-none bg-transparent focus-visible:outline-none"
          name="message"
          ref={messageRef}
          autoFocus
        />
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
    </motion.div>
  );
}
