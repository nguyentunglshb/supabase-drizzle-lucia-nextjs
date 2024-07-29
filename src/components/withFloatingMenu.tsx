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
      className="flex items-center mx-auto bg-white"
    >
      {children}
    </motion.div>
  );
};

export default FloatingMenu;
