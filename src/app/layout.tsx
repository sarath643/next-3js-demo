import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: '3JS Demo Site',
  description: 'Showcasing 3D demos with Next.js and Three.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-100 text-gray-900 flex flex-col min-h-screen'>
        {/* Header */}
        <header className='bg-white shadow-md'>
          <nav className='container mx-auto flex justify-between items-center py-4 px-6'>
            <Link href='/' className='text-2xl font-bold text-blue-600'>
              3JS Demos
            </Link>
            <div className='space-x-4'>
              <Link href='/' className='hover:text-blue-600'>
                Home
              </Link>
              <Link href='/about' className='hover:text-blue-600'>
                About
              </Link>
              <Link href='/contact' className='hover:text-blue-600'>
                Contact
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className='flex-1 container mx-auto px-6 py-8'>{children}</main>

        {/* Footer */}
        <footer className='bg-gray-900 text-gray-300 py-6 mt-12'>
          <div className='container mx-auto text-center'>
            <p>© {new Date().getFullYear()} 3JS Demo Site. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
