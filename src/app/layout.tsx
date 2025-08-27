import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: '3JS Demo Site',
  description: 'Showcasing 3D demos with Next.js and Three.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='text-gray-900 bg-gray-100 '>
        {/* Header */}

        {/* Main Content */}
        <main className=''>{children}</main>

        {/* Footer */}
        {/* <footer className='py-6 text-gray-300 bg-gray-900'>
          <div className='container mx-auto text-center'>
            <p>© {new Date().getFullYear()} 3JS Demo Site. Created by Sarath Surendran</p>
          </div>
        </footer> */}
      </body>
    </html>
  );
}
