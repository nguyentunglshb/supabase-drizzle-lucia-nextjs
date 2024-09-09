'use client';

import React, { useRef } from 'react';
import { addNewMessage } from '@/actions/message';

type Coordinates = {
  x: number;
  y: number;
} | null;

interface CreateRealtimeMessageFormProps {
  coordinates: Coordinates;
}

export default function CreateRealtimeMessageForm({ coordinates }: CreateRealtimeMessageFormProps) {
  const messageRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const _addNewMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const message = messageRef?.current?.value || '';
    const author = localStorage.getItem('author') || '';

    const x = 100;
    const y = 100;

    const fd = new FormData();
    fd.append('message', message);
    fd.append('author', author);
    fd.append('x', x.toString());
    fd.append('y', y.toString());

    await addNewMessage(fd).finally(() => {
      formRef.current?.reset();
    });
  };

  return (
    <div
      className="fixed"
      style={{
        top: coordinates?.y + 'px',
        left: coordinates?.x + 'px',
      }}
    >
      <form onSubmit={_addNewMessage} ref={formRef}>
        <p>message</p>
        <input
          type="text"
          className="block h-8 rounded-md border"
          name="message"
          ref={messageRef}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
