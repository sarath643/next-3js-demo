import LamboCanvas from '@/components/Lambo/LamboCanvas';
import { HeroGeometric } from '@/components/shadcn/Title';
import { Overlay } from '@/components/Shirt/Overlay';
import { ShirtCanvas } from '@/components/Shirt/ShirtCanvas';
import FullScreenCanvas from '@/components/TestCanvas';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='w-screen h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth'>
      <section className='relative flex-shrink-0 w-full h-screen snap-start snap-always'>
        <header className='absolute top-0 left-0 right-0 z-10 bg-transparent shadow-md'>
          <nav className='container px-6 py-4 mx-auto'>
            <Link href='/' className='ml-10 text-lg font-bold text-blue-900 sm:text-2xl'>
              3JS Demo
            </Link>
            <div className='space-x-4'></div>
          </nav>
        </header>
        <HeroGeometric />
      </section>
      <section className='flex-shrink-0 w-full h-screen snap-start snap-always'>
        <LamboCanvas />
      </section>
      <section className='relative flex-shrink-0 w-full h-screen snap-start snap-always'>
        <ShirtCanvas />
        <Overlay />
      </section>
    </div>
  );
}
