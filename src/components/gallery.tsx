'use client';

import { useQuery } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

const MotionLink = motion(Link);

const Gallery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['post'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => data),
  });

  const LinkAnimated = {
    whileTap: { scale: 0.8 },
    whileHover: { scale: 1.2 },
  };

  if (isLoading) return <BounceLoader />;

  return (
    <div className="mx-auto grid w-full max-w-screen-lg grid-cols-3 gap-5 py-20">
      {data?.map((post: any) => (
        <React.Fragment key={post.id}>
          <MotionLink
            {...LinkAnimated}
            href={`/post/${post.id}`}
            className="col-span-1 aspect-square rounded-xl bg-zinc-50"
          >
            <p className="font-medium">{post.title}</p>
            <p>{post.body}</p>
          </MotionLink>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Gallery;
