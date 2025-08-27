'use client';

// import { Logo } from '@pmndrs/branding';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight } from 'react-icons/ai';
import { useSnapshot } from 'valtio';
import { state } from '@/lib/store';
import { useInView } from 'react-intersection-observer';

export const Overlay: React.FC = () => {
  const snap = useSnapshot(state);

  const { ref, inView } = useInView({
    threshold: 0.1, // 10% of the component is visible
    triggerOnce: true,
  });

  const transition = { type: 'spring' as const, duration: 0.8, delay: inView ? 2 : 0 };
  const transition2 = { type: 'spring' as const, duration: 0.8 };

  const config: MotionProps = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition },
    exit: { x: -100, opacity: 0, transition: { ...transition2, delay: 0 } },
  };

  return (
    <div ref={ref} className='absolute inset-0'>
      {inView && (
        <AnimatePresence>
          {snap.intro ? (
            <motion.section
              key='main'
              {...config}
              className='absolute inset-0 flex flex-col items-center justify-center'>
              <div className='mt-[5vh] ml-[5vw]'>
                <motion.div
                  key='title'
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 5,
                    stiffness: 40,
                    restDelta: 0.001,
                    duration: 0.3,
                  }}>
                  <h1 className='font-extrabold italic text-5xl sm:text-[13rem] leading-20 sm:leading-[10rem] tracking-tight w-1/3 font-sans text-white'>
                    LET'S DO IT.
                  </h1>
                </motion.div>

                <div className='relative top-1/4 sm:-top-1/4 left-0 sm:left-[300px] w-60 sm:w-[350px] mb-12'>
                  <motion.div
                    key='p'
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      damping: 7,
                      stiffness: 30,
                      restDelta: 0.001,
                      duration: 0.6,
                      delay: 0.2,
                      delayChildren: 0.2,
                    }}>
                    <p style={{ color: 'white' }} className='leading-6 text-white md-0 sm:mb-12'>
                      Create your unique and exclusive shirt with our{' '}
                      <strong>brand-new 3D customization tool.</strong>
                    </p>
                    <button
                      className='flex items-center gap-4 px-2 py-2 text-xs font-bold text-white uppercase transition-all duration-300 bg-orange-600 rounded sm:text-xl sm:px-8 sm:py-4 hover:scale-110'
                      style={{ background: snap.color }}
                      onClick={() => (state.intro = false)}>
                      CUSTOMIZE IT <AiOutlineHighlight size='1em' />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key='custom'
              {...config}
              className='absolute inset-0 flex items-center justify-center'>
              <Customizer />
            </motion.section>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Customizer: React.FC = () => {
  const snap = useSnapshot(state);

  const handleDownload = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.setAttribute('download', 'canvas.png');
    link.setAttribute(
      'href',
      canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    );
    link.click();
  };

  return (
    <div className='relative flex flex-col items-center justify-end w-full h-full mb-6'>
      <div className='flex gap-2.5 mb-5 flex-wrap md:flex-row md:static md:top-auto md:right-auto md:transform-none'>
        {snap.colors.map((color: string) => (
          <div
            key={color}
            className='w-5 h-5 transition-transform duration-500 border-2 border-white rounded-full cursor-pointer sm:w-7 sm:h-7 hover:scale-125'
            style={{ background: color }}
            onClick={() => (state.color = color)}
          />
        ))}
      </div>

      <div className='absolute left-auto bottom-12 sm:left-12 sm:bottom-10'>
        <div className='flex items-center gap-5'>
          {snap.decals.map((decal: string) => (
            <div key={decal} className='cursor-pointer' onClick={() => (state.decal = decal)}>
              <img
                src={decal + '.png'}
                alt='brand'
                className='object-cover w-10 transition-all duration-200 hover:scale-125'
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className='absolute flex items-center gap-3 p-2 text-xs font-bold uppercase transition-all duration-300 rounded sm:text-xl sm:px-6 sm:py-4 bottom-24 right-2 sm:bottom-10 sm:right-10 hover:scale-110'
        style={{ background: snap.color }}
        onClick={handleDownload}>
        DOWNLOAD <AiFillCamera size='1em' />
      </button>

      <button
        className='absolute flex items-center gap-3 p-2 text-xs font-bold text-white uppercase transition-all duration-300 bg-black rounded sm:text-xl sm:px-6 sm:py-4 top-5 right-5 sm:top-10 sm:right-10 hover:scale-110'
        style={{ background: snap.color }}
        onClick={() => (state.intro = true)}>
        GO BACK <AiOutlineArrowLeft size='1.3em' />
      </button>
    </div>
  );
};
