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
                  <h1 className='font-extrabold italic text-[13rem] leading-[10rem] tracking-tight w-1/3 font-sans'>
                    LET'S DO IT.
                  </h1>
                </motion.div>

                <div className='relative -top-1/4 left-[300px] w-[350px] mb-12'>
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
                    <p className='mb-12 leading-6'>
                      Create your unique and exclusive shirt with our{' '}
                      <strong>brand-new 3D customization tool.</strong>
                    </p>
                    <button
                      className='flex items-center gap-4 px-8 py-4 font-bold text-white uppercase transition-all duration-300 bg-orange-600 rounded hover:scale-110'
                      style={{ background: snap.color }}
                      onClick={() => (state.intro = false)}>
                      CUSTOMIZE IT <AiOutlineHighlight size='1.3em' />
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
            className='transition-transform duration-500 border-2 border-white rounded-full cursor-pointer w-7 h-7 hover:scale-125'
            style={{ background: color }}
            onClick={() => (state.color = color)}
          />
        ))}
      </div>

      <div className='absolute left-12 bottom-10'>
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
        className='absolute flex items-center gap-3 px-6 py-4 font-bold uppercase transition-all duration-300 rounded bottom-10 right-10 hover:scale-110'
        style={{ background: snap.color }}
        onClick={handleDownload}>
        DOWNLOAD <AiFillCamera size='1.3em' />
      </button>

      <button
        className='absolute flex items-center gap-3 px-6 py-4 font-bold text-white uppercase transition-all duration-300 bg-black rounded top-10 right-10 hover:scale-110'
        style={{ background: snap.color }}
        onClick={() => (state.intro = true)}>
        GO BACK <AiOutlineArrowLeft size='1.3em' />
      </button>
    </div>
  );
};
