import { Header } from '@/components/header';
import { getDocuments } from 'outstatic/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CONSTANTS } from '../../constants';
import { Righteous } from 'next/font/google';
import clsx from 'clsx';
import NextImage from 'next/image';
import { Corners } from '@/components/corners';
import { ReadMore } from '@/components/read-more';

const righteous = Righteous({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen border-solid border-l-primary border-r-primary bg-primary'>
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
          Built for startups
        </h2>
        <p className='text-sm sm:text-base text-center'>
          Strike the balance between <br /> <b>cost</b>, <b>quality</b>, and <b>speed to market</b>
        </p>
      </div>

      <div className='overflow-hidden rounded-md'>
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/t2M_7PHxngk?si=CLAGo4Jdp3q4SYi4'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

async function Heroes() {
  const heroes = await getDocuments('heroes', ['title', 'content']);

  return (
    <section className='flex flex-col sm:flex-row items-stretch justify-center gap-5 p-5 bg-secondary'>
      {heroes.map((hero) => (
        <div
          key={hero.title}
          className='flex flex-col items-start justify-start p-4 gap-2 bg-primary rounded-md height-full'
        >
          <h2 className='text-2xl sm:text-3xl font-bold py-1 px-0'>{hero.title}</h2>
          <div className='flex flex-col gap-4 text-sm sm:text-base'>
            <MDXRemote source={hero.content} />
          </div>
        </div>
      ))}
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
            className='relative flex flex-col sm:flex-row bg-primary text-primary-foreground rounded-md p-12 gap-10'
            key={project.title}
          >
            <Corners className='' />

            <div className='relative z-10 flex flex-col items-center gap-6'>
              <h4 className='text-base font-bold'>{project.title}</h4>

              <NextImage src={project.coverImage as string} alt={project.title} width={100} height={100} />
            </div>
            <ReadMore className='mdx relative z-10 flex flex-col gap-4' maxHeight={200}>
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
    <footer className='flex flex-col sm:flex-row items-center justify-between gap-5 px-4 py-5 w-full'>
      <NextImage alt='UtahDevCo logo' src='/images/logos/udc-logo-square.svg' width={100} height={100} />
      <div className='flex flex-col gap-1 text-sm sm:text-base font-medium text-right'>
        <a href={CONSTANTS.META.CONTACT_URL}>hey@utahdevco.com</a>
        <span>Draper, Utah</span>
      </div>
    </footer>
  );
}
