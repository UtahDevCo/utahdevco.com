import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactDrawer } from '@/components/contact-drawer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { buildFaqSchema, type FaqItem, JsonLd } from '@/components/json-ld';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../../../constants';

export const metadata: Metadata = {
  title: 'Home Services Back-Office Automation in Utah (HVAC, Plumbing, Electrical)',
  description:
    'Custom workflow automation for Utah HVAC, plumbing, electrical, and roofing companies ($3M to $20M). Automate ServiceTitan/Jobber to QuickBooks reconciliation and job costing for $0 down and 50% of Year-1 savings.',
  alternates: { canonical: '/industries/home-services' },
};

const faqs: FaqItem[] = [
  {
    question: 'Do we have to replace ServiceTitan, Jobber, or Housecall Pro?',
    answer:
      'No. We build lightweight glue software and automated workflows around the field-service and accounting tools you already use, removing the manual exports, spreadsheet checks, and QuickBooks cleanup your office staff does every week.',
  },
  {
    question: 'How is this different from generic AI voice-bot agencies?',
    answer:
      'Most AI agencies sell one-size-fits-all missed-call chatbots. Utah Dev Co is a senior engineering studio in Draper, Utah that fixes deeper back-office bottlenecks: job costing, payroll and commission reconciliation, PO matching, and QuickBooks sync, all backed by our 50% Year-1 savings model.',
  },
  {
    question: 'How fast can a Utah home services company see results?',
    answer:
      'The $0-down Workflow & ROI Audit takes 3 to 5 business days. Most first automations go live in 2 to 4 weeks, so your office feels the time savings inside the first month.',
  },
];

export default function HomeServicesPage() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <JsonLd data={buildFaqSchema(faqs)} />
      <Header />

      <article className='w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-10'>
        <header className='flex flex-col gap-4 border-b border-neutral-200 pb-6'>
          <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
            Utah Home Services: HVAC, Plumbing, Electrical, Roofing
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            Back-office automation for Utah home services companies
          </h1>
          <p className='text-base sm:text-lg text-neutral-800'>
            If your $3M to $20M HVAC, plumbing, electrical, or roofing shop is spending 20+ hours a week reconciling
            ServiceTitan or Jobber with QuickBooks, matching supplier POs, and calculating technician commissions in
            spreadsheets, Utah Dev Co automates it for $0 down and earns 50% of your verified Year-1 savings.
          </p>
        </header>

        <section className='flex flex-col gap-4'>
          <h2 className='text-2xl sm:text-3xl font-bold'>High-ROI workflows we automate</h2>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-neutral-300 text-sm sm:text-base'>
              <thead>
                <tr className='bg-neutral-100 text-left'>
                  <th className='border border-neutral-300 p-3 font-bold'>Bottleneck</th>
                  <th className='border border-neutral-300 p-3 font-bold'>What we build</th>
                  <th className='border border-neutral-300 p-3 font-bold'>Typical annual impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border border-neutral-300 p-3 font-bold'>Field-to-accounting reconciliation</td>
                  <td className='border border-neutral-300 p-3'>
                    Automated validation and sync between ServiceTitan, Jobber, or Housecall Pro and QuickBooks Online
                    or Desktop.
                  </td>
                  <td className='border border-neutral-300 p-3'>10 to 20 office hrs/week saved ($20k to $40k/yr)</td>
                </tr>
                <tr className='bg-neutral-50'>
                  <td className='border border-neutral-300 p-3 font-bold'>Supplier PO and parts invoice matching</td>
                  <td className='border border-neutral-300 p-3'>
                    Automatic PDF invoice extraction matched against truck and job POs, with exception alerts for
                    unbilled parts.
                  </td>
                  <td className='border border-neutral-300 p-3'>8 to 15 hrs/week + recovered parts margin</td>
                </tr>
                <tr>
                  <td className='border border-neutral-300 p-3 font-bold'>Tech payroll, spiffs, and job costing</td>
                  <td className='border border-neutral-300 p-3'>
                    Auditable commission, spiff, and job-margin calculator replacing error-prone payroll spreadsheets.
                  </td>
                  <td className='border border-neutral-300 p-3'>6 to 12 hrs/week + fewer payroll disputes</td>
                </tr>
                <tr className='bg-neutral-50'>
                  <td className='border border-neutral-300 p-3 font-bold'>Unsold estimate and maintenance follow-up</td>
                  <td className='border border-neutral-300 p-3'>
                    Automated SMS and email follow-up sequences tied directly to open quotes and seasonal tune-up
                    renewals.
                  </td>
                  <td className='border border-neutral-300 p-3'>Higher close rate without adding CSR headcount</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Production financial and operational engineering</h2>
          <p className='text-sm sm:text-base text-neutral-700'>
            Our team has shipped production financial and multi-party payout platforms including{' '}
            <Link className='font-bold' href='/work/trikin-capital'>
              Trikin Capital
            </Link>{' '}
            (commission verification and audit trails) and{' '}
            <Link className='font-bold' href='/work/therapyanimalhub-com'>
              Therapy Animal Hub
            </Link>{' '}
            (automated daily and monthly Stripe payouts and intake workflows).
          </p>
        </section>

        <section className='flex flex-col gap-4'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Frequently asked questions</h2>
          <div className='flex flex-col gap-4'>
            {faqs.map((faq) => (
              <div className='border border-neutral-200 rounded-md p-5 flex flex-col gap-2' key={faq.question}>
                <h3 className='text-lg font-bold'>{faq.question}</h3>
                <p className='text-sm sm:text-base text-neutral-700'>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-md bg-secondary text-secondary-foreground'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-xl sm:text-2xl font-bold'>Book a $0-down home services audit</h2>
            <p className='text-sm text-neutral-300'>
              We can visit your Wasatch Front office or meet on Zoom and map your exact annual savings.
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
