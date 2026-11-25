import type { Metadata } from 'next';
import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata: Metadata = {
  title: 'Automation Guides & Production Blueprints',
  description:
    'Concrete engineering guides from UtahDevCo based on production systems we built: automating bank portals without APIs, multi-party payout reconciliation, and replacing seat-based SaaS.',
  alternates: { canonical: '/guides' },
};

const guides = [
  {
    slug: 'automating-bank-portals-without-apis',
    tag: 'Banking & Legacy Portals',
    title: 'Automating ACH batches and bank portals that have no API',
    summary:
      'How we built a Playwright automation bot for Trikin Capital to draft ACH batches in MapleMark Bank and read back settlement tracking IDs while keeping a human in control of final approval.',
  },
  {
    slug: 'automated-payouts-and-payment-reconciliation',
    tag: 'Payouts & Accounting Sync',
    title: 'Automating multi-party payouts and catching Stripe webhook drift',
    summary:
      'How we run daily Stripe Connect payouts and read-only drift checks for Therapy Animal Hub so dropped refund webhooks never sneak into month-end close.',
  },
  {
    slug: 'replacing-expensive-saas-with-custom-workflows',
    tag: 'SaaS Consolidation & Provisioning',
    title: 'Replacing seat-based support and ops SaaS with custom internal tools',
    summary:
      'How we consolidated carrier provisioning, hardware setup, billing, and HelpScout-style AI support into one platform for Wiley.',
  },
];

export default function GuidesIndexPage() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <Header />

      <article className='w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-8'>
        <header className='flex flex-col gap-3 border-b border-neutral-200 pb-6'>
          <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
            Production Automation Guides
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            How UtahDevCo automates real back-office bottlenecks
          </h1>
          <p className='text-base sm:text-lg text-neutral-800'>
            Every guide below comes from production software we actually built and run for clients, not hypothetical
            demos.
          </p>
        </header>

        <div className='flex flex-col gap-6'>
          {guides.map((guide) => (
            <article className='border-2 border-neutral-900 rounded-md p-6 flex flex-col gap-3' key={guide.slug}>
              <span className='text-xs font-bold uppercase tracking-wider text-neutral-500'>{guide.tag}</span>
              <h2 className='text-xl sm:text-2xl font-bold'>
                <Link className='no-underline hover:underline' href={`/guides/${guide.slug}`}>
                  {guide.title}
                </Link>
              </h2>
              <p className='text-sm sm:text-base text-neutral-700'>{guide.summary}</p>
              <Link className='text-sm font-bold' href={`/guides/${guide.slug}`}>
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
