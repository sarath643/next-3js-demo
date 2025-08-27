'use client';

import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';

interface GooeyMarqueeProps {
  text: string;
  className?: string;
  speed?: number; // duration in seconds
}

export function GooeyMarquee({ text, className = '', speed = 4 }: GooeyMarqueeProps) {
  const controls = useAnimation();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate only once to center
          controls.start({ x: '20%', transition: { duration: speed, ease: 'easeOut' } });
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [controls, speed]);

  return (
    <div
      ref={ref}
      className={`relative w-full h-32 text-2xl sm:text-8xl flex items-center justify-center overflow-hidden ${className}`}>
      {/* Blur layer */}
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
          initial={{ x: '100%' }}
          animate={controls}
          style={{ filter: 'blur(0.07em)' }}>
          {text}
        </motion.p>
      </div>

      {/* Light mode */}
      <div
        className='absolute inset-0 flex items-center justify-center dark:hidden'
        style={{
          backgroundColor: 'white',
          backgroundImage: `
            linear-gradient(to right, transparent, 1rem, transparent 50%),
            linear-gradient(to left, transparent, 1rem, transparent 50%)
          `,
          filter: 'contrast(15)',
        }}>
        <motion.p
          className='absolute min-w-full whitespace-nowrap'
          initial={{ x: '100%' }}
          animate={controls}
          style={{ filter: 'blur(0.07em)' }}>
          {text}
        </motion.p>
      </div>

      {/* Clear text on top */}
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        initial={{ x: '100%' }}
        animate={controls}>
        <p className='absolute min-w-full whitespace-nowrap'>{text}</p>
      </motion.div>
    </div>
  );
}
