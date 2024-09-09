'use client';

import React, { useRef } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { addNewMessage } from '@/actions/message';

export default function CreateRealtimeMessageForm({ children }: { children?: React.ReactNode }) {
  const messageRef = useRef<HTMLInputElement>(null);

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

    await addNewMessage(fd);
  };

  return (
    <Popover open>
      <PopoverTrigger>
        {children}
        <PopoverContent>
          <form onSubmit={_addNewMessage}>
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
      </PopoverTrigger>
    </Popover>
  );
}
