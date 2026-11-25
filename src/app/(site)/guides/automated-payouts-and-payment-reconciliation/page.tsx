import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactDrawer } from '@/components/contact-drawer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { buildFaqSchema, type FaqItem, JsonLd } from '@/components/json-ld';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../../../constants';

export const metadata: Metadata = {
  title: 'Automating Multi-Party Payouts & Catching Payment Drift',
  description:
    'How UtahDevCo automates daily Stripe Express Connect payouts and catches dropped refund webhooks with read-only drift monitoring, based on Therapy Animal Hub.',
  alternates: { canonical: '/guides/automated-payouts-and-payment-reconciliation' },
};

const faqs: FaqItem[] = [
  {
    question: 'Why do payment webhooks drift out of sync with internal databases?',
    answer:
      'Staff often issue refunds, adjustments, or partial credits directly inside the Stripe or payment processor dashboard. If a webhook fails or times out, your internal database still shows the original paid amount, creating silent accounting discrepancies at month end.',
  },
  {
    question: 'How do you prevent an automated payout script from double-paying someone?',
    answer:
      'We combine a database-backed distributed lock (with a TTL), dry-run-by-default execution requiring an explicit --execute flag, clearance delay windows (such as 2 days for service providers and 7 days for affiliates), and charge-level checks before any transfer fires.',
  },
];

export default function PayoutsReconciliationGuidePage() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <JsonLd data={buildFaqSchema(faqs)} />
      <Header />

      <article className='w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-8'>
        <nav aria-label='Breadcrumb' className='text-sm text-neutral-600'>
          <Link href='/'>Home</Link> / <Link href='/guides'>Guides</Link> /{' '}
          <span className='text-neutral-900 font-medium'>Automated payouts and payment reconciliation</span>
        </nav>

        <header className='flex flex-col gap-4 border-b border-neutral-200 pb-6'>
          <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
            Production Blueprint · Updated November 2026
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            Automating multi-party payouts and catching Stripe webhook drift
          </h1>
          <p className='text-base sm:text-lg text-neutral-800'>
            Paying contractors, technicians, or referral partners by hand from exported CSVs breaks down fast as volume
            grows. For{' '}
            <Link className='font-bold' href='/work/therapyanimalhub-com'>
              Therapy Animal Hub
            </Link>
            , we built an automated daily payout runner and an independent read-only drift monitor that verifies our
            database against live Stripe charges.
          </p>
        </header>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>The problem</h2>
          <p className='text-sm sm:text-base text-neutral-700 leading-relaxed'>
            Therapy Animal Hub pays state-licensed clinicians daily as they complete client evaluations and pays
            multi-tier affiliates monthly based on tracked promo codes. Calculating who earned what across hundreds of
            orders, refunds, and sub-affiliate tiers in spreadsheets burns hours every week and invites costly payout
            mistakes.
          </p>
          <p className='text-sm sm:text-base text-neutral-700 leading-relaxed'>
            Even after automating payouts, relying solely on webhooks leaves a blind spot: if someone issues a refund
            from the Stripe dashboard and a webhook drops, reporting and payout balances quietly diverge.
          </p>
        </section>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>The production architecture we run</h2>
          <ul className='list-disc pl-6 flex flex-col gap-2 text-sm sm:text-base text-neutral-800'>
            <li>
              Dry-run by default with distributed locking: the payout job acquires a timed database lock, calculates
              eligible provider and affiliate payouts in integer cents, and logs structured JSON stats. Transfers only
              execute when run with an explicit live-key guard and execution flag.
            </li>
            <li>
              Built-in clearance windows: provider payouts wait 2 days and affiliate payouts wait 7 days after charge
              settlement, catching early cancellations before cash leaves the account.
            </li>
            <li>
              Read-only Stripe drift monitor: a separate scheduled cron job samples the most recent 100 charges in our
              database, retrieves the live records from Stripe (throttled cleanly under API limits), and alerts
              immediately if any refunded amount or reporting mirror falls out of sync.
            </li>
            <li>
              Automated Postgres reporting mirror: operational SQLite/Turso data syncs incrementally into Postgres with
              freshness checks so finance and operations always query accurate numbers.
            </li>
          </ul>
        </section>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl font-bold'>How this translates to Utah trades and distribution</h2>
          <p className='text-sm sm:text-base text-neutral-700 leading-relaxed'>
            Home services companies calculating technician commissions and spiffs, or distributors reconciling sales
            rep commissions against QuickBooks invoices and credit memos, face the exact same math. UtahDevCo builds
            these reconciliation pipelines under our{' '}
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
            <h2 className='text-xl font-bold'>Still reconciling payouts or commissions in Excel?</h2>
            <p className='text-sm text-neutral-300'>
              Book a free audit and we will calculate how many office hours you can eliminate in Year 1.
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
