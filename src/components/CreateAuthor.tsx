'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

const CreateAuthor = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const author = localStorage.getItem('author');

    if (!author) {
      setOpen(true);
    }
  }, []);

  const saveAuthorToLocalStorage = (fd: FormData) => {
    const author = fd.get('author');

    if (author?.toString().length === 0) return;

    localStorage.setItem('author', author as string);

    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setOpen(true);
    else {
      const author = localStorage.getItem('author');
      if (author) setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Author</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you{"'"}re done.
          </DialogDescription>
        </DialogHeader>
        <form className="block" action={saveAuthorToLocalStorage}>
          <Input name="author" placeholder="Enter your name..." />
          <Button type="submit" className="mt-4 w-full">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAuthor;
