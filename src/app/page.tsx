import LamboCanvas from '@/components/Lambo/LamboCanvas';
import { HeroGeometric } from '@/components/shadcn/Title';
import { Overlay } from '@/components/Shirt/Overlay';
import { ShirtCanvas } from '@/components/Shirt/ShirtCanvas';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className='absolute top-0 left-0 right-0 z-10 bg-transparent shadow-md'>
        <nav className='container px-6 py-4 mx-auto'>
          <Link href='/' className='ml-10 text-lg font-bold text-blue-900 sm:text-2xl'>
            3JS Demo
          </Link>
          <div className='space-x-4'></div>
        </nav>
      </header>

      <div className='w-screen h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth'>
        <section className='h-screen snap-start'>
          <HeroGeometric />
        </section>
        <section className='h-screen snap-start'>
          <LamboCanvas />
        </section>
        <section className='relative h-screen snap-start'>
          <ShirtCanvas />
          <Overlay />
        </section>
      </div>
    </>
  );
}
