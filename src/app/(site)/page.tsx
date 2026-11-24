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
        Draper &amp; Salt Lake City, Utah — Back-Office Software &amp; Workflow Automation
      </p>
      <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold border-2 border-primary-foreground rounded-xs py-3 px-4 leading-tight'>
        Cut Manual Back-Office Work.
        <br />
        Pay Only 50% of What You Save in Year One.
      </h1>
      <p className='text-base sm:text-lg md:text-xl text-neutral-800 max-w-2xl'>
        <b>Bottom line:</b> Utah Dev Co replaces repetitive spreadsheets, manual data entry, and disconnected software
        for Utah <b>home services</b> and <b>wholesale/distribution</b> companies. We start with a{' '}
        <b>$0-down Workflow &amp; ROI Audit</b>—if we don&apos;t save you verifiable money, you pay us nothing.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 pt-2'>
        <Button asChild className='w-56 md:text-base md:py-6 no-underline' variant='cta'>
          <a href={CONSTANTS.META.BOOKING_URL} rel='noopener noreferrer' target='_blank'>
            Book Your $0-Down Audit
          </a>
        </Button>
        <Button asChild className='w-56 md:text-base md:py-6 no-underline' variant='outline'>
          <Link href='/how-it-works'>See the 50% Savings Math</Link>
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
          <h2 className='text-2xl sm:text-3xl font-bold'>How the $0-Down, 50% Year-1 Savings Model Works</h2>
          <p className='text-sm sm:text-base text-neutral-700'>
            Most software agencies charge $40,000+ upfront and disappear before your team ever sees a return. We align
            our fee directly with measurable operational savings signed off before we write a line of code.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-neutral-50 border border-neutral-200'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>Step 1 · $0 Down</span>
            <h3 className='text-lg font-bold'>Free Workflow &amp; ROI Audit</h3>
            <p className='text-sm text-neutral-700'>
              We shadow your office or warehouse workflows, quantify the exact hours and hard dollars being lost, and
              hand you a written Baseline &amp; Savings Worksheet.
            </p>
          </div>

          <div className='flex flex-col gap-2 p-4 rounded-md bg-neutral-50 border border-neutral-200'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>Step 2 · Weeks, Not Quarters</span>
            <h3 className='text-lg font-bold'>We Build &amp; Deploy</h3>
            <p className='text-sm text-neutral-700'>
              Senior engineers build custom internal tools, QuickBooks/ERP/ServiceTitan integrations, and automated
              document pipelines—reviewed line by line and rolled out with your staff.
            </p>
          </div>

          <div className='flex flex-col gap-2 p-4 rounded-md bg-neutral-50 border border-neutral-200'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>Step 3 · Year 1 Only</span>
            <h3 className='text-lg font-bold'>50/50 Savings Split</h3>
            <p className='text-sm text-neutral-700'>
              You pay 50% of the agreed, verifiable Year-1 savings (billed monthly or quarterly). Starting in Year 2,
              you keep 100% of the savings.
            </p>
          </div>
        </div>

        <div className='flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-200 text-sm'>
          <p className='text-neutral-700'>
            <b>Who qualifies:</b> $2M+ operational businesses with 15+ hours/week of repetitive back-office work.
          </p>
          <Link className='font-bold' href='/how-it-works'>
            Read full terms &amp; example math →
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
        <h2 className='text-2xl sm:text-3xl font-bold'>Built for Non-Tech Utah Operators</h2>
        <p className='text-sm sm:text-base text-neutral-700'>
          We focus on two high-volume operational industries where manual back-office bottlenecks quietly eat six
          figures a year.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <article className='flex flex-col justify-between gap-4 p-6 rounded-md border-2 border-neutral-900 bg-white'>
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
              HVAC · Plumbing · Electrical · Roofing
            </span>
            <h3 className='text-xl sm:text-2xl font-bold'>Home Services Back-Office Automation</h3>
            <p className='text-sm sm:text-base text-neutral-700'>
              Eliminate double-entry between ServiceTitan or Jobber and QuickBooks, automate job costing and margin
              alerts, and stop losing revenue to manual dispatch and estimate follow-up.
            </p>
          </div>
          <Link className='font-bold text-sm sm:text-base' href='/industries/home-services'>
            See Home Services workflows &amp; ROI math →
          </Link>
        </article>

        <article className='flex flex-col justify-between gap-4 p-6 rounded-md border-2 border-neutral-900 bg-white'>
          <div className='flex flex-col gap-2'>
            <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>
              Wholesale · Distribution · Light Manufacturing
            </span>
            <h3 className='text-xl sm:text-2xl font-bold'>Wholesale &amp; Distribution Automation</h3>
            <p className='text-sm sm:text-base text-neutral-700'>
              Stop paying office staff to re-key PDF purchase orders, bills of lading, and vendor invoices. We connect
              your ERP, QuickBooks, and spreadsheets into an auditable pipeline.
            </p>
          </div>
          <Link className='font-bold text-sm sm:text-base' href='/industries/wholesale-distribution'>
            See Wholesale &amp; Distribution workflows &amp; ROI math →
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
          Based in Draper &amp; Salt Lake City, Utah
          <br />
          Senior Engineering Without Agency Bloat
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
        <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold py-1 px-2'>Start With a $0-Down Audit</h2>
        <p className='text-sm sm:text-lg md:text-xl text-neutral-800'>
          Show us the spreadsheets or software bottlenecks slowing your team down. We&apos;ll tell you honestly whether
          custom automation can save you $40,000+ in the next 12 months.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 md:gap-8 py-4'>
          <ContactDrawer
            trigger={
              <Button className='w-48 sm:w-52 md:text-lg md:py-6 cursor-pointer' type='button' variant='default'>
                Request Free Audit
              </Button>
            }
          />
          <Button asChild className='w-48 sm:w-52 md:text-lg md:py-6 no-underline' variant='cta'>
            <a href={CONSTANTS.META.BOOKING_URL} rel='noopener noreferrer' target='_blank'>
              Schedule a 20-Min Call
            </a>
          </Button>
        </div>
        <p className='text-xs sm:text-sm text-neutral-600'>
          Not sure whether to hire in-house, use a traditional dev agency, or work with us?{' '}
          <Link className='font-bold text-neutral-900' href='/utah-custom-software-comparison'>
            Read our side-by-side comparison →
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
                Full case study →
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
