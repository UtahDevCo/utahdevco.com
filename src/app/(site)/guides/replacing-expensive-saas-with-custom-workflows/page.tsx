import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactDrawer } from '@/components/contact-drawer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { buildFaqSchema, type FaqItem, JsonLd } from '@/components/json-ld';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../../../constants';

export const metadata: Metadata = {
  title: 'Replacing Seat-Based SaaS & Manual Provisioning With Custom Tools',
  description:
    'How UtahDevCo consolidated multi-vendor telecom provisioning, recurring billing, and native AI-backed support to retire HelpScout for Wiley.',
  alternates: { canonical: '/guides/replacing-expensive-saas-with-custom-workflows' },
};

const faqs: FaqItem[] = [
  {
    question: 'When does it make financial sense to replace a SaaS tool with custom software?',
    answer:
      'Keep standard tools like QuickBooks or Gusto. Replace seat-based support desks, add-on middleware, or disconnected ops portals when per-seat fees cross $25,000+ per year or when staff still spend hours every week copying data between systems.',
  },
  {
    question: 'How does retrieval-backed AI support work without hallucinating answers?',
    answer:
      'Instead of dumping an entire manual into a prompt, we store embeddings of your vetted internal knowledge base in your existing database (Firestore or Postgres) and retrieve only the relevant articles before drafting a response.',
  },
];

export default function ReplacingSaasGuidePage() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <JsonLd data={buildFaqSchema(faqs)} />
      <Header />

      <article className='w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-8'>
        <nav aria-label='Breadcrumb' className='text-sm text-neutral-600'>
          <Link href='/'>Home</Link> / <Link href='/guides'>Guides</Link> /{' '}
          <span className='text-neutral-900 font-medium'>Replacing seat-based SaaS with custom tools</span>
        </nav>

        <header className='flex flex-col gap-4 border-b border-neutral-200 pb-6'>
          <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
            Production Blueprint · Updated November 2026
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            Replacing seat-based support and ops SaaS with custom internal tools
          </h1>
          <p className='text-base sm:text-lg text-neutral-800'>
            Growing operations often end up paying for four or five disconnected SaaS tools while staff still glue them
            together by hand. On{' '}
            <Link className='font-bold' href='/work/wiley'>
              Wiley
            </Link>
            , we unified four separate telecom and billing backends into one portal and built a native help center with
            retrieval-backed AI support to retire HelpScout.
          </p>
        </header>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>The problem</h2>
          <p className='text-sm sm:text-base text-neutral-700 leading-relaxed'>
            Every new Wiley phone customer required coordinating four separate external systems: Altaworx/NetSapiens for
            PBX domains and call rules, Bandwidth for carrier phone numbers and E911 registration, Grandstream Zero
            Touch Provisioning for physical phone speed dials, and Rev.io for recurring billing. On top of that, customer
            support relied on a separate HelpScout subscription disconnected from the live customer database.
          </p>
        </section>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>What we built instead</h2>
          <ul className='list-disc pl-6 flex flex-col gap-2 text-sm sm:text-base text-neutral-800'>
            <li>
              Single-flow provisioning pipeline: customer onboarding automatically orchestrates carrier number ordering,
              E911 registration, PBX configuration, hardware provisioning, and subscription billing from one screen.
            </li>
            <li>
              Native help center on the existing database: articles live in the same Firestore database as customer
              accounts, with full admin authoring and category browsing, removing the need for an external CMS or
              HelpScout Beacon.
            </li>
            <li>
              Grounded AI support chat: using Gemini embeddings and retrieval over the vetted knowledge base, customers
              get accurate setup answers tied directly to real documentation.
            </li>
          </ul>
        </section>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>Cutting software bloat with $0 upfront</h2>
          <p className='text-sm sm:text-base text-neutral-700 leading-relaxed'>
            When you replace $40,000+ a year in seat-based SaaS or manual provisioning work with a focused internal
            tool, the savings are straightforward to measure. Under UtahDevCo&apos;s{' '}
            <Link className='font-bold' href='/how-it-works'>
              50% Year-1 savings model
            </Link>
            , you pay $0 for the audit, split the verified Year-1 savings 50/50, and keep 100% of the savings from Year
            2 onward.
          </p>
        </section>

        <section className='flex flex-col gap-4'>
          <h2 className='text-2xl font-bold'>Frequently asked questions</h2>
          {faqs.map((faq) => (
            <div className='border border-neutral-200 rounded-md p-5 flex flex-col gap-2' key={faq.question}>
              <h3 className='text-lg font-bold'>{faq.question}</h3>
              <p className='text-sm sm:text-base text-neutral-700'>{faq.answer}</p>
            </div>
          ))}
        </section>

        <section className='flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-md bg-secondary text-secondary-foreground'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-xl font-bold'>Paying for SaaS tools your team still copies out of?</h2>
            <p className='text-sm text-neutral-300'>
              Let&apos;s audit your stack for $0 down and see what can be consolidated cleanly.
            </p>
          </div>
          <div className='flex gap-3 shrink-0'>
            <ContactDrawer
              trigger={
                <Button className='cursor-pointer bg-white text-black hover:bg-neutral-200' type='button'>
                  Request audit
                </Button>
              }
            />
            <Button asChild className='no-underline' variant='cta'>
              <a href={CONSTANTS.META.BOOKING_URL} rel='noopener noreferrer' target='_blank'>
                Schedule call
              </a>
            </Button>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
