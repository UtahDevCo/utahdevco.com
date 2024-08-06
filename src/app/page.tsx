import clsx from 'clsx';
import { Righteous } from 'next/font/google';
import NextImage from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocuments } from 'outstatic/server';

import { Corners } from '@/components/corners';
import { Header } from '@/components/header';
import { ReadMore } from '@/components/read-more';
import { Button } from '@/components/ui/button';
import * as LogoSvgs from '@/components/logos';

import { CONSTANTS } from '../../constants';
import { BrandLogos } from '@/components/brand-logos';

const righteous = Righteous({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen border-solid border-l-primary border-r-primary'>
      <Header />
      <FirstHero />
      <Heroes />
      <CTA />
      <Portfolio />
      <Footer />
    </main>
  );
}

function FirstHero() {
  return (
    <section className='flex flex-col items-center justify-center gap-10 pt-5 sm:pt-10 pb-10'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h2 className='text-2xl sm:text-3xl font-bold border-2 border-primary-foreground rounded-sm py-1 px-2'>
          App Development Experts
        </h2>
        <p className='text-sm sm:text-base text-center'>
          Strike the balance between <br /> <b>cost</b>, <b>quality</b>, and <b>speed to market</b>
        </p>
      </div>

      <div className='overflow-hidden rounded-md'>
        <iframe
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          frameBorder='0'
          height='315'
          referrerPolicy='strict-origin-when-cross-origin'
          src='https://www.youtube.com/embed/t2M_7PHxngk?si=CLAGo4Jdp3q4SYi4'
          title='YouTube video player'
          width='560'
        ></iframe>
      </div>
    </section>
  );
}

async function Heroes() {
  const heroes = await getDocuments('heroes', ['title', 'content']);

  return (
    <section
      className='flex flex-col bg-secondary'
      style={{
        backgroundImage: `url(/_next/image?url=${encodeURIComponent('/images/graphics/topomap-repeat-white-50.png')}&w=256&q=100)`,
      }}
    >
      <div className='flex flex-col items-start justify-start p-4 mx-5 mt-5 gap-2 bg-primary rounded-md height-full'>
        <h2 className='text-center text-2xl sm:text-3xl font-bold py-1 px-0 w-full'>
          Based in Salt Lake City, Utah
          <br />
          Deploying worldwide
        </h2>
      </div>
      <div className='flex flex-col sm:flex-row items-stretch justify-center gap-5 p-5'>
        {heroes.map((hero) => (
          <div
            className='flex flex-col items-start justify-start p-4 gap-2 bg-primary rounded-md height-full'
            key={hero.title}
          >
            <h2 className='text-2xl sm:text-3xl font-bold py-1 px-0'>{hero.title}</h2>
            <div className='flex flex-col gap-4 text-sm sm:text-base'>
              <MDXRemote source={hero.content} />
            </div>
          </div>
        ))}
      </div>

      <BrandLogos />
    </section>
  );
}

function CTA() {
  return (
    <section className='flex flex-col items-center justify-center gap-10 py-5 sm:py-10 px-4'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h2 className='text-2xl sm:text-3xl font-bold py-1 px-2'>Let&apos;s Talk</h2>
        <p className='text-sm sm:text-base text-center'>Building a business can be lonely. We&apos;re here for you.</p>
        <div className='flex flex-col sm:flex-row gap-4 py-4'>
          <Link href={CONSTANTS.META.CONTACT_URL}>
            <Button className='w-32 sm:w-48' variant='default'>
              Contact Us
            </Button>
          </Link>
          <Link href={CONSTANTS.META.BOOKING_URL}>
            <Button className='w-32 sm:w-48' variant='cta'>
              Schedule a call
            </Button>
          </Link>
        </div>
        <p className='text-sm sm:text-base text-center'>
          Let&apos;s kick around <b>product ideas</b>,
          <br />
          talk about <b>project scope</b>,
          <br />
          or <b>start a quotation</b>,
        </p>
      </div>
    </section>
  );
}

async function Portfolio() {
  const portfolioProjects = await getDocuments('portfolio-projects', ['title', 'coverImage', 'content']);

  return (
    <section className='flex flex-col items-center justify-center gap-10 w-full py-3 sm:py-5 px-4 bg-secondary text-secondary-foreground'>
      <h2 className={clsx(righteous.className, 'text-4xl sm:text-6xl font-bold pt-2 px-2')}>Portfolio</h2>
      {portfolioProjects.map((project) => {
        return (
          <div
            className='relative flex flex-col sm:flex-row bg-primary text-primary-foreground rounded-md p-12 gap-10 w-full'
            key={project.title}
          >
            <Corners className='' />

            <div className='relative z-10 flex flex-col items-center gap-6'>
              <h4 className='text-center text-base font-bold min-w-[200px]'>{project.title}</h4>

              <NextImage alt={project.title} height={100} src={project.coverImage as string} width={100} />
            </div>
            <ReadMore className='mdx relative z-10 flex flex-col gap-4 w-full' maxHeight={200}>
              <MDXRemote source={project.content} />
            </ReadMore>
          </div>
        );
      })}
    </section>
  );
}

function Footer() {
  return (
    <footer className='relative flex flex-col sm:flex-row items-center justify-between gap-5 px-4 py-5 w-full'>
      <NextImage alt='UtahDevCo logo' height={100} src='/images/logos/udc-inverse-background-square.png' width={100} />
      <NextImage
        alt='Topo map'
        className='absolute bottom-[-100px] left-[-150px] sm:bottom-[-200px] sm:left-[-250px] lg:bottom-[-300px] lg:left-[-500px] z-[-1]'
        height={15 * 100}
        src='/images/graphics/topomap-black-1500x1159.webp'
        width={15 * 77}
      />
      <div className='flex flex-col gap-1 text-sm sm:text-base font-medium text-right'>
        <a href={CONSTANTS.META.CONTACT_URL}>hey@utahdevco.com</a>
        <span>Draper, Utah</span>
      </div>
    </footer>
  );
}
