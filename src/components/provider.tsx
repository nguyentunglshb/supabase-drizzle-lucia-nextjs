'use client';

import { ThemeProvider } from 'next-themes';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Toaster />
      <Sonner />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default Provider;
