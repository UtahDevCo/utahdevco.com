import clsx from 'clsx';
import { Righteous } from 'next/font/google';
import NextImage from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocuments } from 'outstatic/server';

import { BrandLogos } from '@/components/brand-logos';
import { ContactDrawer } from '@/components/contact-drawer';
import { Corners } from '@/components/corners';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ReadMore } from '@/components/read-more';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../constants';

const righteous = Righteous({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen border-solid border-l-primary border-r-primary'>
      <Header />
      <FirstHero />
      <SavingsModelOverview />
      <IndustryTracks />
      <Heroes />
      <CTA />
      <Portfolio />
      <Footer />
    </main>
  );
}

function FirstHero() {
  return (
    <section className='flex flex-col items-center justify-center gap-6 pt-6 sm:pt-10 pb-6 px-4 w-full max-w-4xl text-center'>
      <p className='text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-600'>
        Draper and Salt Lake City, Utah. Back-office software and workflow automation.
      </p>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold border-2 border-primary-foreground rounded-xs py-3 px-4 leading-tight'>
        Cut manual back-office work.
        <br />
        Pay only 50% of what you save in Year 1.
      </h1>
      <p className='text-base sm:text-lg md:text-xl text-neutral-800 max-w-2xl'>
        Utah Dev Co replaces repetitive spreadsheets, manual data entry, and disconnected software for Utah home
        services and wholesale/distribution companies. Every engagement starts with a $0-down Workflow &amp; ROI Audit.
        If we cannot save you verifiable money, you pay nothing.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 pt-2'>
        <Button asChild className='w-56 md:text-base md:py-6 no-underline' variant='cta'>
          <a href={CONSTANTS.META.BOOKING_URL} rel='noopener noreferrer' target='_blank'>
            Book your $0-down audit
          </a>
        </Button>
        <Button asChild className='w-56 md:text-base md:py-6 no-underline' variant='outline'>
          <Link href='/how-it-works'>See the 50% savings math</Link>
        </Button>
      </div>
    </section>
  );
}

function SavingsModelOverview() {
  return (
    <section className='w-full px-4 sm:px-6 max-w-5xl'>
      <div className='border-2 border-secondary rounded-md p-6 sm:p-8 flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl sm:text-3xl font-bold'>How the $0-down, 50% Year-1 savings model works</h2>
          <p className='text-sm sm:text-base text-neutral-700'>
            Most software agencies charge $40,000+ upfront before your team sees a result. We tie our fee to
            measurable operational savings that both sides sign off on before we write code.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-neutral-50 border border-neutral-200'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>Step 1: $0 down</span>
            <h3 className='text-lg font-bold'>Free workflow and ROI audit</h3>
            <p className='text-sm text-neutral-700'>
              We shadow your office or warehouse workflows, measure the hours and hard dollars being lost, and give you
              a written Baseline &amp; Savings Worksheet.
            </p>
          </div>

          <div className='flex flex-col gap-2 p-4 rounded-md bg-neutral-50 border border-neutral-200'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>Step 2: 2 to 4 weeks</span>
            <h3 className='text-lg font-bold'>We build and deploy</h3>
            <p className='text-sm text-neutral-700'>
              Senior engineers build custom internal tools, QuickBooks, ERP, and ServiceTitan integrations, and
              automated document pipelines, then roll them out directly with your staff.
            </p>
          </div>

          <div className='flex flex-col gap-2 p-4 rounded-md bg-neutral-50 border border-neutral-200'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>Step 3: Year 1 only</span>
            <h3 className='text-lg font-bold'>50/50 savings split</h3>
            <p className='text-sm text-neutral-700'>
              You pay 50% of the agreed, verifiable Year-1 savings (billed monthly or quarterly). Starting in Year 2,
              you keep 100% of the savings.
            </p>
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-200 text-sm'>
          <p className='text-neutral-700'>
            Who qualifies: $2M+ operational businesses with at least 15 hours a week of repetitive back-office work.
          </p>
          <Link className='font-bold' href='/how-it-works'>
            Read full terms and example math
          </Link>
        </div>
      </div>
    </section>
  );
}

function IndustryTracks() {
  return (
    <section className='w-full px-4 sm:px-6 max-w-5xl flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-2xl sm:text-3xl font-bold'>Built for non-tech Utah operators</h2>
        <p className='text-sm sm:text-base text-neutral-700'>
          We focus on two high-volume industries where manual back-office work often costs six figures a year.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <article className='flex flex-col justify-between gap-4 p-6 rounded-md border-2 border-neutral-900 bg-white'>
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
              HVAC, Plumbing, Electrical, Roofing
            </span>
            <h3 className='text-xl sm:text-2xl font-bold'>Home services back-office automation</h3>
            <p className='text-sm sm:text-base text-neutral-700'>
              Stop double-entering data between ServiceTitan or Jobber and QuickBooks, automate job costing and margin
              alerts, and cut manual dispatch and estimate follow-up.
            </p>
          </div>
          <Link className='font-bold text-sm sm:text-base' href='/industries/home-services'>
            See home services workflows and ROI math
          </Link>
        </article>

        <article className='flex flex-col justify-between gap-4 p-6 rounded-md border-2 border-neutral-900 bg-white'>
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
              Wholesale, Distribution, Light Manufacturing
            </span>
            <h3 className='text-xl sm:text-2xl font-bold'>Wholesale and distribution automation</h3>
            <p className='text-sm sm:text-base text-neutral-700'>
              Stop paying office staff to re-key PDF purchase orders, bills of lading, and vendor invoices. We connect
              your ERP, QuickBooks, and spreadsheets into one auditable pipeline.
            </p>
          </div>
          <Link className='font-bold text-sm sm:text-base' href='/industries/wholesale-distribution'>
            See wholesale and distribution workflows and ROI math
          </Link>
        </article>
      </div>
    </section>
  );
}

async function Heroes() {
  const heroes = await getDocuments('heroes', ['title', 'content']);

  return (
    <section
      className='flex flex-col bg-secondary w-full'
      style={{
        backgroundImage: `url(/_next/image?url=${encodeURIComponent('/images/graphics/topomap-repeat-white-50.png')}&w=256&q=100)`,
      }}
    >
      <div className='flex flex-col items-start justify-start p-4 mx-5 mt-5 gap-2 bg-primary rounded-md height-full'>
        <h2 className='text-center text-2xl sm:text-3xl font-bold py-1 px-0 w-full'>
          Based in Draper and Salt Lake City, Utah
          <br />
          Senior engineering without agency bloat
        </h2>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 p-5'>
        {heroes.map((hero) => (
          <div
            className='flex flex-col items-start justify-start p-4 gap-2 bg-primary rounded-md h-full'
            key={hero.title}
          >
            <h3 className='text-2xl sm:text-3xl font-bold py-1 px-0'>{hero.title}</h3>
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
    <section className='flex flex-col items-center justify-center gap-8 py-5 sm:py-8 px-4'>
      <div className='flex flex-col items-center justify-center gap-4 text-center max-w-2xl'>
        <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold py-1 px-2'>Start with a $0-down audit</h2>
        <p className='text-sm sm:text-lg md:text-xl text-neutral-800'>
          Show us the spreadsheets or software bottlenecks slowing your team down. We will tell you plainly whether
          custom automation can save you $40,000+ over the next 12 months.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 md:gap-8 py-4'>
          <ContactDrawer
            trigger={
              <Button className='w-48 sm:w-52 md:text-lg md:py-6 cursor-pointer' type='button' variant='default'>
                Request free audit
              </Button>
            }
          />
          <Button asChild className='w-48 sm:w-52 md:text-lg md:py-6 no-underline' variant='cta'>
            <a href={CONSTANTS.META.BOOKING_URL} rel='noopener noreferrer' target='_blank'>
              Schedule a 20-min call
            </a>
          </Button>
        </div>
        <p className='text-xs sm:text-sm text-neutral-600'>
          Weighing an in-house hire against a traditional dev agency or Utah Dev Co?{' '}
          <Link className='font-bold text-neutral-900' href='/utah-custom-software-comparison'>
            Read our side-by-side comparison
          </Link>
        </p>
      </div>
    </section>
  );
}

async function Portfolio() {
  const portfolioProjects = await getDocuments('portfolio-projects', ['title', 'slug', 'coverImage', 'content']);

  return (
    <section
      className='flex flex-col items-center justify-center gap-10 w-full py-6 sm:py-8 px-4 bg-secondary text-secondary-foreground'
      id='portfolio'
    >
      <h2 className={clsx(righteous.className, 'text-4xl sm:text-6xl font-bold pt-2 px-2')}>Portfolio</h2>
      {portfolioProjects.map((project) => {
        const slug = project.slug as string;
        return (
          <article
            className='relative flex flex-col sm:flex-row bg-primary text-primary-foreground rounded-md p-8 sm:p-12 gap-8 sm:gap-10 w-full'
            key={slug}
          >
            <Corners className='' />

            <div className='relative z-10 flex flex-col items-center gap-4 min-w-[200px]'>
              <h3 className='text-center text-lg font-bold'>{project.title}</h3>
              <NextImage alt={project.title} height={100} src={project.coverImage as string} width={100} />
              <Link className='text-sm font-bold' href={`/work/${slug}`}>
                Full case study
              </Link>
            </div>
            <ReadMore className='mdx relative z-10 flex flex-col gap-4 w-full' maxHeight={200}>
              <MDXRemote source={project.content} />
            </ReadMore>
          </article>
        );
      })}
    </section>
  );
}
