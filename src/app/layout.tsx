import type { Metadata } from 'next';
import { Chivo, Righteous } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';

const chivo = Chivo({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UtahDevCo',
  description: 'Built for startups',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className='hidden-scroll'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
      </head>
      <body className={clsx(chivo.className, 'flex flex-col items-center')}>{children}</body>
    </html>
  );
}
