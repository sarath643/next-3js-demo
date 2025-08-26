import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: '3JS Demo Site',
  description: 'Showcasing 3D demos with Next.js and Three.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='min-h-screen text-gray-900 bg-gray-100'>
        {/* Header */}
        <header className='absolute top-0 left-0 right-0 z-10 bg-transparent shadow-md'>
          <nav className='container px-6 py-4 mx-auto'>
            <Link href='/' className='ml-10 text-lg font-bold text-blue-900 sm:text-2xl'>
              3JS Demo
            </Link>
            <div className='space-x-4'></div>
          </nav>
        </header>

        {/* Main Content */}
        <main className='flex-1 w-screen'>{children}</main>

        {/* Footer */}
        <footer className='py-6 text-gray-300 bg-gray-900'>
          <div className='container mx-auto text-center'>
            <p>© {new Date().getFullYear()} 3JS Demo Site. Created by Sarath Surendran</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
