import clsx from 'clsx';
import type { Metadata } from 'next';
import { Chivo } from 'next/font/google';

import { JsonLd, organizationSchema } from '@/components/json-ld';

import './globals.css';

const chivo = Chivo({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.utahdevco.com'),
  title: {
    default: 'Utah Dev Co — Back-Office Automation & Custom Software | Pay 50% of Year-1 Savings',
    template: '%s | Utah Dev Co',
  },
  description:
    'Utah custom software and back-office workflow automation for home services and wholesale/distribution companies. Start with a $0-down Workflow & ROI Audit and pay only 50% of verified Year-1 savings.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.utahdevco.com',
    siteName: 'Utah Dev Co',
    title: 'Utah Dev Co — Cut Manual Back-Office Work, Pay Only 50% of Year-1 Savings',
    description:
      'Based in Draper / Salt Lake City, Utah. We automate manual spreadsheets, invoicing, and ERP/QuickBooks workflows with a $0-down audit and 50% Year-1 savings pricing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utah Dev Co — Pay Only 50% of What You Save in Year One',
    description:
      '$0-down workflow audit and custom automation for Utah home services and wholesale/distribution businesses.',
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className='hidden-scroll' lang='en'>
      <head>
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <JsonLd data={organizationSchema} />
      </head>
      <body className={clsx(chivo.className, 'flex flex-col items-center overflow-x-hidden')}>{children}</body>
    </html>
  );
}
