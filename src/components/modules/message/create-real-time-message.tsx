'use client';

import React, { PropsWithChildren, useRef } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { addNewMessage } from '@/actions/message';

type Coordinates = {
  x: number;
  y: number;
} | null;

interface CreateRealtimeMessageFormProps extends PropsWithChildren {
  coordinates: Coordinates;
}

export default function CreateRealtimeMessageForm({ children }: CreateRealtimeMessageFormProps) {
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
    <Popover open>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <form onSubmit={_addNewMessage} ref={formRef}>
          <p>message</p>
          <input
            type="text"
            className="block h-8 rounded-md border"
            name="message"
            ref={messageRef}
          />
          <button type="submit">Submit</button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
