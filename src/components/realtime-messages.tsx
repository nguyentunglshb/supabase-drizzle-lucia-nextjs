'use client';

import supabase from '@/lib/supabase';
import React, { FC, useEffect, useState } from 'react';
import CreateRealtimeMessageForm from './modules/message/create-real-time-message';
import { toast } from 'sonner';
import { formatDate } from '@/lib/dayjs';
import CreateAuthor from './CreateAuthor';
import SingleMessage from './modules/message/message';
// import { useMouseCoordinates } from '@/hooks/useMouseCoordinates';

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

  // const { selectMouseCoordinates } = useMouseCoordinates();

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
            description: formatDate(payload.new?.created_at),
          });
        }
      )
      .subscribe((status, err) => {
        if (err) console.error('SUBSCRIPTION ERROR:', err);
        else console.log('SUBSCRIPTION STATUS CHANGED:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <CreateRealtimeMessageForm />
      <CreateAuthor />
      {messages.map((message) => (
        <SingleMessage key={message.id} {...message} />
      ))}
      {messages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
    </div>
  );
};

export default RealTimeMessages;
