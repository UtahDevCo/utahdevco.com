import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactDrawer } from '@/components/contact-drawer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { buildFaqSchema, type FaqItem, JsonLd } from '@/components/json-ld';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../../constants';

export const metadata: Metadata = {
  title: '$0-Down Workflow Audit & 50% Year-1 Savings Model',
  description:
    'How UtahDevCo automates back-office workflows for $0 down and earns 50% of verifiable Year-1 savings. See worked ROI math, qualification criteria, and FAQs.',
  alternates: { canonical: '/how-it-works' },
};

const faqs: FaqItem[] = [
  {
    question: 'What does the $0-down Workflow & ROI Audit include?',
    answer:
      'We spend 3 to 5 business days reviewing your manual back-office workflows, interviewing staff, and mapping where hours and dollars leak. You get a written Baseline & Savings Worksheet showing the bottlenecks, proposed automation, and projected 12-month savings. You keep that worksheet at $0 cost even if you do not hire us.',
  },
  {
    question: 'How are Year-1 savings calculated so there are no disputes?',
    answer:
      'We do not tie fees to top-line revenue or overall P&L. Before any code is written, both sides sign off on a simple unit formula: either hard cost cuts (eliminated software subscriptions, overtime, or outsourced data entry) or verified labor hours saved multiplied by an agreed loaded hourly rate.',
  },
  {
    question: 'What happens after Year 1?',
    answer:
      'Starting in Month 13, you keep 100% of the ongoing savings and own the custom software and automations we built. If you want ongoing monitoring, updates, or new workflows, we offer an optional maintenance retainer.',
  },
  {
    question: 'Who qualifies for the $0-down, 50% savings model?',
    answer:
      'Qualifying businesses are typically $2M+ revenue operational companies (especially Utah home services or wholesale/distribution operators) with at least 15 to 20 hours per week of repetitive back-office work and direct sponsorship from the owner or operations lead.',
  },
  {
    question: 'What if our business prefers a traditional fixed-scope fee?',
    answer:
      'We also offer traditional fixed-scope implementation sprints for companies that prefer a one-time project fee or want to buy out the Year-1 savings share upfront at a discount.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <JsonLd data={buildFaqSchema(faqs)} />
      <Header />

      <article className='w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-10'>
        <header className='flex flex-col gap-4 border-b border-neutral-200 pb-6'>
          <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
            Performance-based software and automation. Updated November 2026.
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            $0-down workflow audit. Pay only 50% of what you save in Year 1.
          </h1>
          <p className='text-base sm:text-lg text-neutral-800'>
            Qualifying Utah businesses pay $0 upfront for a hands-on Workflow &amp; ROI Audit. If we build the
            automation, UtahDevCo earns 50% of the pre-agreed, verifiable Year-1 savings and you keep the other 50%,
            then 100% every year after.
          </p>
        </header>

        <section className='flex flex-col gap-4'>
          <h2 className='text-2xl sm:text-3xl font-bold'>What the math looks like</h2>
          <p className='text-sm sm:text-base text-neutral-700'>
            We measure savings against a baseline worksheet signed off before development starts, rather than noisy
            top-line revenue.
          </p>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse border border-neutral-300 text-sm sm:text-base'>
              <thead>
                <tr className='bg-neutral-100 text-left'>
                  <th className='border border-neutral-300 p-3 font-bold'>Workflow example</th>
                  <th className='border border-neutral-300 p-3 font-bold'>Verified Year-1 savings</th>
                  <th className='border border-neutral-300 p-3 font-bold'>You keep (Year 1)</th>
                  <th className='border border-neutral-300 p-3 font-bold'>UtahDevCo (50%)</th>
                  <th className='border border-neutral-300 p-3 font-bold'>You keep (Year 2+)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border border-neutral-300 p-3'>
                    Home services: automated ServiceTitan to QuickBooks reconciliation and job costing (22 hrs/wk at
                    $38/hr loaded)
                  </td>
                  <td className='border border-neutral-300 p-3 font-bold'>$43,472</td>
                  <td className='border border-neutral-300 p-3'>$21,736</td>
                  <td className='border border-neutral-300 p-3'>$21,736</td>
                  <td className='border border-neutral-300 p-3 font-bold'>$43,472 / yr</td>
                </tr>
                <tr className='bg-neutral-50'>
                  <td className='border border-neutral-300 p-3'>
                    Wholesale and distribution: automated PDF PO, BOL, and vendor invoice entry into ERP (1.5 FTEs
                    avoided)
                  </td>
                  <td className='border border-neutral-300 p-3 font-bold'>$84,000</td>
                  <td className='border border-neutral-300 p-3'>$42,000</td>
                  <td className='border border-neutral-300 p-3'>$42,000</td>
                  <td className='border border-neutral-300 p-3 font-bold'>$84,000 / yr</td>
                </tr>
                <tr>
                  <td className='border border-neutral-300 p-3'>
                    Software bloat cut: replacing legacy seat-based tools with a custom internal portal
                  </td>
                  <td className='border border-neutral-300 p-3 font-bold'>$52,000</td>
                  <td className='border border-neutral-300 p-3'>$26,000</td>
                  <td className='border border-neutral-300 p-3'>$26,000</td>
                  <td className='border border-neutral-300 p-3 font-bold'>$52,000 / yr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className='flex flex-col gap-4'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Who qualifies</h2>
          <p className='text-sm sm:text-base text-neutral-700'>
            Because we put our own engineering time in upfront, we only take $0-down engagements where the savings are
            large enough to pay off for both sides:
          </p>
          <ul className='list-disc pl-6 flex flex-col gap-2 text-sm sm:text-base text-neutral-800'>
            <li>$2M+ in annual revenue (typically 10 to 150 employees).</li>
            <li>At least 15 to 20 hours a week of repetitive back-office labor, or $40,000+/yr in measurable cost leakage.</li>
            <li>Direct involvement from the owner, GM, or controller to verify the baseline and roll out the tool with staff.</li>
          </ul>
          <p className='text-sm text-neutral-700'>
            Industry playbooks:{' '}
            <Link className='font-bold' href='/industries/home-services'>
              Home Services
            </Link>{' '}
            and{' '}
            <Link className='font-bold' href='/industries/wholesale-distribution'>
              Wholesale &amp; Distribution
            </Link>
            .
          </p>
        </section>

        <section className='flex flex-col gap-5'>
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
            <h2 className='text-xl sm:text-2xl font-bold'>Ready to see your baseline numbers?</h2>
            <p className='text-sm text-neutral-300'>
              Book a 20-minute qualification call or send us the workflow that slows your office down most.
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
