'use client';

import supabase from '@/lib/supabase';
import React, { FC, useEffect, useState } from 'react';
import CreateRealtimeMessageForm from './modules/message/create-real-time-message';
import { toast } from 'sonner';
import { formatDate } from '@/lib/dayjs';
import CreateAuthor from './CreateAuthor';
import SingleMessage from './modules/message/message';
import { useMouseCoordinates } from '@/hooks/useMouseCoordinates';

type Message = {
  id: string;
  text: string | null;
  created_at?: Date;
  x: number;
  y: number;
  author: string;
};

type Payload = {
  new: Message;
};

interface RealTimeMessagesProps {
  serverMessages: Array<Message>;
}

const RealTimeMessages: FC<RealTimeMessagesProps> = ({ serverMessages }) => {
  const [messages, setMessages] = useState<Array<Message>>(serverMessages);

  const { mouseCoordinates, setMouseCoordinates, selectMouseCoordinates } = useMouseCoordinates();

  useEffect(() => {
    const channel = supabase
      .channel('realtime_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
        },
        (payload: Payload) => {
          setMessages((prev) => [...prev, payload.new]);

          console.log(payload.new);

          toast(payload.new.text, {
            description: formatDate(payload.new?.created_at) + ' - ' + payload.new?.author,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {mouseCoordinates && <CreateRealtimeMessageForm coordinates={mouseCoordinates} />}
      <CreateAuthor />
      {messages.map((message) => (
        <SingleMessage key={message.id} {...message} />
      ))}
      <div
        className="absolute inset-0"
        onClick={selectMouseCoordinates}
        onContextMenu={(e) => {
          e.preventDefault();
          setMouseCoordinates(null);
        }}
      ></div>
    </div>
  );
};

export default RealTimeMessages;
