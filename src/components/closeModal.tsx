'use client';

import React, { FC } from 'react';
import { X } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const CloseModal: FC = () => {
  const router = useRouter();

  return (
    <Button
      aria-label="close modal"
      className="size-6 rounded-md p-0"
      onClick={() => router.back()}
    >
      <X className="size-4" />
    </Button>
  );
};

export default CloseModal;
