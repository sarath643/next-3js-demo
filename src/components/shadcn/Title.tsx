'use client';

import { motion, Variants, Transition, useMotionValue, useTransform, animate } from 'framer-motion';
import { Circle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}>
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className='relative'>
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px] border-2 border-white/[0.15]',
            'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({ title1 = 'Elevate Your Digital Vision' }: { title1?: string }) {
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => {
      const transition: Transition = {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1], // Bezier curve easing
      };
      return {
        opacity: 1,
        y: 0,
        transition,
      };
    },
  };

  return (
    <div className='relative h-full w-full flex items-center justify-center overflow-hidden bg-[#030303]'>
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl' />

      <div className='absolute inset-0 overflow-hidden'>
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient='from-indigo-500/[0.15]'
          className='left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]'
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient='from-rose-500/[0.15]'
          className='right-[-5%] md:right-[0%] top-[70%] md:top-[75%]'
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient='from-violet-500/[0.15]'
          className='left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]'
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient='from-amber-500/[0.15]'
          className='right-[15%] md:right-[20%] top-[10%] md:top-[15%]'
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient='from-cyan-500/[0.15]'
          className='left-[20%] md:left-[25%] top-[5%] md:top-[10%]'
        />
      </div>

      <div className='container relative z-10 px-4 mx-auto md:px-6'>
        <div className='max-w-3xl gap-5 mx-auto text-center'>
          <motion.div custom={1} variants={fadeUpVariants} initial='hidden' animate='visible'>
            <p className='mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-8xl md:mb-8'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-50 to-blue-400'>
                {title1}
              </span>
            </p>
          </motion.div>

          <motion.div
            className='flex items-center justify-center text-center'
            custom={2}
            variants={fadeUpVariants}
            initial='hidden'
            animate='visible'>
            <p className='max-w-xl px-4 mx-auto mt-5 mb-8 text-base font-light leading-relaxed tracking-wide sm:text-lg md:text-xl text-white/40'>
              Crafting exceptional digital experiences through innovative design and cutting-edge
              technology.
            </p>
          </motion.div>
        </div>
      </div>

      <div className='absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none' />
    </div>
  );
}

export { HeroGeometric };
