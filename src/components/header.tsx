import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className='flex flex-col md:flex-row items-center justify-between gap-3 py-3 px-4 sm:px-6 bg-secondary text-secondary-foreground w-full'>
      <Link className='no-underline shrink-0' href='/'>
        <Image alt='UtahDevCo Logo' height={30} src='/images/logos/udc-background-logo.png' width={192} />
      </Link>
      <nav aria-label='Primary navigation' className='flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2 text-xs sm:text-sm font-medium'>
        <Link className='no-underline hover:underline' href='/how-it-works'>
          How It Works
        </Link>
        <Link className='no-underline hover:underline' href='/industries/home-services'>
          Home Services
        </Link>
        <Link className='no-underline hover:underline' href='/industries/wholesale-distribution'>
          Wholesale
        </Link>
        <Link className='no-underline hover:underline' href='/guides'>
          Guides
        </Link>
        <Link className='no-underline hover:underline' href='/utah-custom-software-comparison'>
          Compare
        </Link>
        <Link className='no-underline hover:underline' href='/#portfolio'>
          Work
        </Link>
      </nav>
    </header>
  );
}
