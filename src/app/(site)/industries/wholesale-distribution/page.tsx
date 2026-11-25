import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactDrawer } from '@/components/contact-drawer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { buildFaqSchema, type FaqItem, JsonLd } from '@/components/json-ld';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../../../constants';

export const metadata: Metadata = {
  title: 'Wholesale & Distribution Workflow Automation in Utah',
  description:
    'Automate PDF purchase orders, bills of lading, vendor invoice matching, and ERP-to-QuickBooks sync for Utah wholesale and distribution companies. $0-down audit, pay 50% of Year-1 savings.',
  alternates: { canonical: '/industries/wholesale-distribution' },
};

const faqs: FaqItem[] = [
  {
    question: 'Can you automate messy PDF purchase orders and vendor invoices without replacing our ERP?',
    answer:
      'Yes. We build document-parsing pipelines that read emailed PDFs, spreadsheets, and packing slips, validate line items and pricing against your ERP or QuickBooks, and flag only true exceptions for human review so you keep your existing ERP.',
  },
  {
    question: 'What ERPs and accounting systems do you integrate with?',
    answer:
      'We integrate with QuickBooks Online and Desktop, NetSuite, Fishbowl, Acumatica, Epicor/Eclipse, and custom SQL or CSV-based legacy systems common across Utah distribution and light manufacturing.',
  },
  {
    question: 'How big are typical Year-1 savings for a distributor?',
    answer:
      'Mid-sized distributors ($5M to $30M) routinely spend $60,000 to $150,000+ per year on manual order entry, 3-way PO/BOL/invoice matching, and customer status inquiries. Under our 50% Year-1 savings split, you keep half in Year 1 and 100% from Year 2 onward.',
  },
];

export default function WholesaleDistributionPage() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <JsonLd data={buildFaqSchema(faqs)} />
      <Header />

      <article className='w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-10'>
        <header className='flex flex-col gap-4 border-b border-neutral-200 pb-6'>
          <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
            Utah I-15 Corridor: Wholesale, Distribution, Light Manufacturing
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            Workflow and order-entry automation for Utah wholesale and distribution
          </h1>
          <p className='text-base sm:text-lg text-neutral-800'>
            If your team spends hours every day re-keying emailed PDF purchase orders, matching bills of lading to
            vendor invoices, or manually syncing inventory between your ERP and QuickBooks, UtahDevCo automates the
            pipeline for $0 down and earns 50% of your verified Year-1 savings.
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
                  <td className='border border-neutral-300 p-3 font-bold'>Emailed PDF order and PO entry</td>
                  <td className='border border-neutral-300 p-3'>
                    Automated extraction of SKUs, quantities, pricing, and ship-to addresses straight into your ERP or
                    order queue with human-in-the-loop exception checks.
                  </td>
                  <td className='border border-neutral-300 p-3'>1 to 2 full-time clerk equivalents ($50k to $110k/yr)</td>
                </tr>
                <tr className='bg-neutral-50'>
                  <td className='border border-neutral-300 p-3 font-bold'>3-way PO, BOL, and invoice matching</td>
                  <td className='border border-neutral-300 p-3'>
                    Automated cross-checking of purchase orders, receiving docs, and vendor invoices before AP approval.
                  </td>
                  <td className='border border-neutral-300 p-3'>15 to 25 AP hrs/week + caught overbilling</td>
                </tr>
                <tr>
                  <td className='border border-neutral-300 p-3 font-bold'>ERP to QuickBooks and inventory sync</td>
                  <td className='border border-neutral-300 p-3'>
                    Scheduled syncs, reorder-point alerts, and margin dashboards without paying for bloated middleware
                    licenses.
                  </td>
                  <td className='border border-neutral-300 p-3'>Eliminates manual CSV exports and stockout surprises</td>
                </tr>
                <tr className='bg-neutral-50'>
                  <td className='border border-neutral-300 p-3 font-bold'>Self-serve dealer or customer portal</td>
                  <td className='border border-neutral-300 p-3'>
                    Simple web portal for repeat buyers to reorder, download invoices, and check shipment status without
                    calling your inside sales desk.
                  </td>
                  <td className='border border-neutral-300 p-3'>Cuts inside-sales admin calls by 40%+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className='flex flex-col gap-3'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Audit-grade software built by senior engineers</h2>
          <p className='text-sm sm:text-base text-neutral-700'>
            Wholesale back offices need financial precision: integer-cent math, append-only audit logs, and clear error
            handling. See how we built strict financial state machines and approval workflows for{' '}
            <Link className='font-bold' href='/work/trikin-capital'>
              Trikin Capital
            </Link>{' '}
            and multi-system provisioning and billing orchestration for{' '}
            <Link className='font-bold' href='/work/wiley'>
              Wiley
            </Link>
            .
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
            <h2 className='text-xl sm:text-2xl font-bold'>Book a $0-down distribution workflow audit</h2>
            <p className='text-sm text-neutral-300'>
              Show us one week of PDF orders or AP matching and we will quantify your Year-1 savings for free.
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
