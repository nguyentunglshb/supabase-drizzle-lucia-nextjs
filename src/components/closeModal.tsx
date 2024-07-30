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
      className="h-6 w-6 p-0 rounded-md"
      onClick={() => router.back()}
    >
      <X className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
