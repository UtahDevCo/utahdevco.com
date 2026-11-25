import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactDrawer } from '@/components/contact-drawer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { buildFaqSchema, type FaqItem, JsonLd } from '@/components/json-ld';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../../../constants';

export const metadata: Metadata = {
  title: 'Automating ACH Batches & Bank Portals Without an API',
  description:
    'How UtahDevCo automates legacy bank portals and ACH batch uploads using Playwright and human-in-the-loop approval, based on our production MapleMark Bank bot for Trikin Capital.',
  alternates: { canonical: '/guides/automating-bank-portals-without-apis' },
};

const faqs: FaqItem[] = [
  {
    question: 'Is it safe to automate a bank portal that has no API?',
    answer:
      'Yes, when you separate drafting from final approval. In our production MapleMark Bank automation for Trikin Capital, the bot drafts the ACH batch and reads back settlement tracking IDs, while a human executive still reviews and approves the transfer inside the bank.',
  },
  {
    question: 'What happens if the bank changes its login screen or asks for 2FA?',
    answer:
      'The bot runs inside a trusted browser profile and checks every field and page state before clicking submit. If a field does not accept the expected value or the bank prompts for 2FA, the bot stops immediately and alerts an operator instead of guessing.',
  },
  {
    question: 'Can this pattern work for vendor portals, ERPs, or shipping portals without APIs?',
    answer:
      'Yes. The same accessible-selector browser automation pattern works for legacy distributor ERPs, supplier invoice portals, warranty portals, and freight sites that never built a REST API.',
  },
];

export default function BankPortalsGuidePage() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <JsonLd data={buildFaqSchema(faqs)} />
      <Header />

      <article className='w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-8'>
        <nav aria-label='Breadcrumb' className='text-sm text-neutral-600'>
          <Link href='/'>Home</Link> / <Link href='/guides'>Guides</Link> /{' '}
          <span className='text-neutral-900 font-medium'>Automating bank portals without APIs</span>
        </nav>

        <header className='flex flex-col gap-4 border-b border-neutral-200 pb-6'>
          <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
            Production Blueprint · Updated November 2026
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            Automating ACH batches and bank portals that have no API
          </h1>
          <p className='text-base sm:text-lg text-neutral-800'>
            Regional business banks and legacy vendor portals rarely offer modern APIs. When we built the operations
            platform for{' '}
            <Link className='font-bold' href='/work/trikin-capital'>
              Trikin Capital
            </Link>
            , we automated ACH batch uploads and settlement tracking against MapleMark Bank using Playwright while
            keeping a human in control of final release.
          </p>
        </header>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>The problem</h2>
          <p className='text-sm sm:text-base text-neutral-700 leading-relaxed'>
            Every time Trikin funded a leasing agent&apos;s commission receivable, an operations person had to export a
            batch file, log into MapleMark Bank, pick the next valid business settlement date around weekends and bank
            holidays, upload the file, copy the bank&apos;s tracking ID back into Trikin, and check the Activity Center
            every day until the batch moved from Drafted to Processed.
          </p>
          <p className='text-sm sm:text-base text-neutral-700 leading-relaxed'>
            That same manual loop shows up across Utah wholesale distributors and home services offices: uploading
            ACH vendor runs, pulling daily settlement reports, or keying invoices into a supplier portal that has no
            API.
          </p>
        </section>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>How we built it safely</h2>
          <ul className='list-disc pl-6 flex flex-col gap-2 text-sm sm:text-base text-neutral-800'>
            <li>
              Human-in-the-loop dual approval: the bot only drafts the ACH batch in the bank. Money never moves until an
              authorized signer reviews and clicks approve inside MapleMark Bank.
            </li>
            <li>
              Accessible-name selectors instead of brittle CSS classes: every click targets semantic roles and labels
              (such as buttons, tabs, and ARIA snapshots), so minor styling updates at the bank do not break the script.
            </li>
            <li>
              Strict pre-submit verification: before clicking Log In or Upload, the bot verifies that each input holds
              the exact expected value and that the chosen settlement date falls within 5 days (catching holiday or
              calendar glitches automatically).
            </li>
            <li>
              Closed-loop Activity Center sync: the bot paginates the bank&apos;s Single Transactions table, parses each
              row&apos;s tracking ID, approval count, and status (Drafted, Processed, or Cancelled), and writes those
              statuses straight back to Trikin&apos;s ledger.
            </li>
          </ul>
        </section>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>Where this applies in home services and wholesale</h2>
          <p className='text-sm sm:text-base text-neutral-700 leading-relaxed'>
            If your accounting or ops team spends 10 to 25 hours a week logging into bank portals, state tax portals,
            manufacturer warranty sites, or distributor portals with no API, you do not have to wait for the vendor to
            modernize. We can wrap the portal in a guarded browser worker that drafts entries and reconciles statuses
            automatically under our{' '}
            <Link className='font-bold' href='/how-it-works'>
              $0-down audit and 50% Year-1 savings model
            </Link>
            .
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
            <h2 className='text-xl font-bold'>Stuck clicking through a portal with no API?</h2>
            <p className='text-sm text-neutral-300'>
              Show us the workflow on a 20-minute call and we will tell you whether we can automate it safely.
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
