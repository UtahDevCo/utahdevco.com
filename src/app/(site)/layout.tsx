import clsx from 'clsx';
import type { Metadata } from 'next';
import { Chivo } from 'next/font/google';
import './globals.css';

const chivo = Chivo({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'UtahDevCo',
  description: 'Built for startups',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className='hidden-scroll' lang='en'>
      <head>
        <meta content='width=device-width, initial-scale=1.0' name='viewport'></meta>
      </head>
      <body className={clsx(chivo.className, 'flex flex-col items-center overflow-hidden')}>{children}</body>
    </html>
  );
}
