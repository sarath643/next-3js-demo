'use client';

import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface GooeyMarqueeProps {
  text: string;
  className?: string;
  speed?: number; // total duration in seconds
}

export function GooeyMarquee({ text, className = '', speed = 16 }: GooeyMarqueeProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ x: ['70%', '0%'] }); // animate to center
    }
  }, [inView, controls]);

  return (
    <div
      ref={ref}
      className={`relative w-full h-32 ml-5 text-8xl flex items-center justify-center overflow-hidden ${className}`}>
      {/* Blur layer with gooey effect */}
      <div
        className='absolute inset-0 items-center justify-center hidden dark:flex'
        style={{
          backgroundColor: 'transparent',
          backgroundImage: `
            linear-gradient(to right, transparent, 1rem, transparent 50%),
            linear-gradient(to left, transparent, 1rem, transparent 50%)
          `,
          filter: 'contrast(15)',
        }}>
        <motion.p
          className='absolute min-w-full whitespace-nowrap'
          animate={controls}
          transition={{ duration: speed, ease: 'linear' }}
          style={{ filter: 'blur(0.07em)' }}>
          {text}
        </motion.p>
      </div>

      <div
        className='absolute inset-0 flex items-center justify-center dark:hidden'
        style={{
          backgroundColor: 'white',
          backgroundImage: `
            linear-gradient(to right, transparent,  1rem, transparent 50%),
            linear-gradient(to left, transparent,  1rem, transparent 50%)
          `,
          filter: 'contrast(15)',
        }}>
        <motion.p
          className='absolute min-w-full whitespace-nowrap'
          animate={controls}
          transition={{ duration: speed, ease: 'linear' }}
          style={{ filter: 'blur(0.07em)' }}>
          {text}
        </motion.p>
      </div>

      {/* Clear text layer on top */}
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        animate={controls}
        transition={{ duration: speed, ease: 'linear' }}>
        <p className='absolute min-w-full whitespace-nowrap'>{text}</p>
      </motion.div>
    </div>
  );
}
