import NextImage from 'next/image';
import Link from 'next/link';

import { ContactDrawer } from '@/components/contact-drawer';

import { CONSTANTS } from '../../constants';

export function Footer() {
  return (
    <footer className='relative flex flex-col gap-6 px-4 sm:px-6 py-8 w-full border-t border-neutral-200'>
      <NextImage
        alt='Topo map'
        className='pointer-events-none absolute bottom-[-100px] left-[-150px] sm:bottom-[-200px] sm:left-[-250px] lg:bottom-[-300px] lg:left-[-500px] z-[-1]'
        height={15 * 100}
        src='/images/graphics/topomap-black-1500x1159.webp'
        width={15 * 77}
      />
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full'>
        <Link className='no-underline' href='/'>
          <NextImage
            alt='UtahDevCo logo'
            height={80}
            src='/images/logos/udc-inverse-background-square.png'
            width={80}
          />
        </Link>

        <nav aria-label='Footer navigation' className='flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium'>
          <Link href='/how-it-works'>50% Savings Model</Link>
          <Link href='/industries/home-services'>Home Services</Link>
          <Link href='/industries/wholesale-distribution'>Wholesale &amp; Distribution</Link>
          <Link href='/utah-custom-software-comparison'>Compare Options</Link>
          <Link href='/#portfolio'>Portfolio</Link>
        </nav>

        <div className='flex flex-col gap-1 text-sm font-medium sm:text-right'>
          <ContactDrawer
            trigger={
              <button className='underline text-left sm:text-right cursor-pointer' type='button'>
                {CONSTANTS.META.CONTACT_EMAIL}
              </button>
            }
          />
          <span>Draper / Salt Lake City, Utah</span>
          <span className='text-xs text-neutral-600'>
            Founded by{' '}
            <a href='https://www.chrisesplin.com' rel='noopener noreferrer' target='_blank'>
              Chris Esplin
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
