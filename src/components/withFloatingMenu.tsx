'use client';

import type { FC, PropsWithChildren } from 'react';
import React from 'react';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

type FloatingMenuProps = PropsWithChildren;

const FloatingMenu: FC<FloatingMenuProps> = ({ children }) => {
  const scroll = useScroll();

  const smooth = useSpring(scroll.scrollYProgress, {
    mass: 0.5,
  });

  const y = useTransform(smooth, (value) => (value - scroll.scrollYProgress.get()) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
      style={{ y }}
      className=" mx-auto
        flex h-12 items-center rounded-full border bg-white/60 px-1 pl-4 shadow-[5px_5px_30px_rgba(190,190,190,0.15),-5px_-5px_30px_rgba(255,255,255,0.15)] backdrop-blur-md 
      "
    >
      {children}
    </motion.div>
  );
};

export default FloatingMenu;
