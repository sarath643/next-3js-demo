import DemoCube from '@/components/DemoCube';

export default function Home() {
  return (
    <div className='space-y-12'>
      <section className='text-center'>
        <h1 className='text-4xl font-bold text-blue-600'>Welcome to 3JS Demos</h1>
        <p className='mt-4 text-gray-600'>
          Explore interactive 3D models built with Three.js & Next.js.
        </p>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-4'>Demo 1: Spinning Cube</h2>
        <DemoCube />
      </section>
    </div>
  );
}
