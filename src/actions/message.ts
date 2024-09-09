'use server';

import { db } from '@/lib/database';
import { message as messageTable } from '@/lib/database/schema';

export async function addNewMessage(formData: FormData) {
  const message = formData.get('message');
  const author = formData.get('author');
  const x = formData.get('x');
  const y = formData.get('y');
  const color = formData.get('color');

  if (!message) {
    return {
      error: 'Message is required',
    };
  }

  await db.insert(messageTable).values({
    x: Number(x),
    y: Number(y),
    text: message as string,
    author: author as string,
    color: color as string,
  });
}
