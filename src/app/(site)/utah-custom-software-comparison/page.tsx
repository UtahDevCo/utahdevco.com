import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactDrawer } from '@/components/contact-drawer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { buildFaqSchema, type FaqItem, JsonLd } from '@/components/json-ld';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../../constants';

export const metadata: Metadata = {
  title: 'Utah Custom Software Comparison: In-House vs. Agency vs. Utah Dev Co',
  description:
    'Side-by-side comparison of hiring an in-house developer, a traditional Utah software agency, off-the-shelf SaaS, or Utah Dev Co ($0-down audit + 50% Year-1 savings).',
  alternates: { canonical: '/utah-custom-software-comparison' },
};

const faqs: FaqItem[] = [
  {
    question: 'When should a Utah business hire an in-house developer instead of Utah Dev Co?',
    answer:
      'Hire in-house if software is your core commercial product and you need 40+ hours per week of continuous feature development indefinitely. For non-tech companies automating back-office workflows, a $140,000+ full-time salary plus benefits rarely pays back.',
  },
  {
    question: 'When is off-the-shelf SaaS better than custom automation?',
    answer:
      'Off-the-shelf SaaS is best for standard accounting (QuickBooks), payroll (Gusto), or core field dispatch (ServiceTitan and Jobber). Custom automation pays off in the messy gaps between those tools, where your team currently relies on spreadsheets and manual re-keying.',
  },
];

export default function ComparisonPage() {
  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <JsonLd data={buildFaqSchema(faqs)} />
      <Header />

      <article className='w-full max-w-5xl px-4 sm:px-6 flex flex-col gap-10'>
        <header className='flex flex-col gap-4 border-b border-neutral-200 pb-6'>
          <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
            Buyer&apos;s Guide. Updated November 2026.
          </p>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            In-house developer vs. Utah dev agency vs. Utah Dev Co
          </h1>
          <p className='text-base sm:text-lg text-neutral-800'>
            Non-tech Utah businesses ($2M to $30M) rarely need a $150k/yr full-time engineer or a $75k agency discovery
            contract to eliminate manual spreadsheets. Here is how all four options compare.
          </p>
        </header>

        <section className='overflow-x-auto'>
          <table className='w-full border-collapse border border-neutral-300 text-sm'>
            <thead>
              <tr className='bg-neutral-100 text-left'>
                <th className='border border-neutral-300 p-3 font-bold'>Criteria</th>
                <th className='border border-neutral-300 p-3 font-bold'>In-house senior dev</th>
                <th className='border border-neutral-300 p-3 font-bold'>Traditional Utah agency</th>
                <th className='border border-neutral-300 p-3 font-bold'>Off-the-shelf SaaS</th>
                <th className='border border-neutral-300 p-3 font-bold bg-secondary text-secondary-foreground'>
                  Utah Dev Co
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-neutral-300 p-3 font-bold'>Upfront cost</td>
                <td className='border border-neutral-300 p-3'>$140k to $180k/yr loaded</td>
                <td className='border border-neutral-300 p-3'>$35k to $150k+ upfront</td>
                <td className='border border-neutral-300 p-3'>Low monthly, grows per seat</td>
                <td className='border border-neutral-300 p-3 font-bold bg-neutral-50'>$0-down Workflow Audit</td>
              </tr>
              <tr>
                <td className='border border-neutral-300 p-3 font-bold'>Pricing model</td>
                <td className='border border-neutral-300 p-3'>Fixed salary regardless of ROI</td>
                <td className='border border-neutral-300 p-3'>Hourly or fixed bid (no ROI tie)</td>
                <td className='border border-neutral-300 p-3'>Per-user subscription</td>
                <td className='border border-neutral-300 p-3 font-bold bg-neutral-50'>
                  50% of verified Year-1 savings (100% yours in Year 2+)
                </td>
              </tr>
              <tr>
                <td className='border border-neutral-300 p-3 font-bold'>Time to first live tool</td>
                <td className='border border-neutral-300 p-3'>2 to 4 months (hiring + ramp)</td>
                <td className='border border-neutral-300 p-3'>3 to 6 months</td>
                <td className='border border-neutral-300 p-3'>Days (if it fits your process)</td>
                <td className='border border-neutral-300 p-3 font-bold bg-neutral-50'>2 to 4 weeks</td>
              </tr>
              <tr>
                <td className='border border-neutral-300 p-3 font-bold'>Who writes the code</td>
                <td className='border border-neutral-300 p-3'>1 generalist you manage</td>
                <td className='border border-neutral-300 p-3'>Often junior devs + PM layers</td>
                <td className='border border-neutral-300 p-3'>Vendor roadmap (no custom fit)</td>
                <td className='border border-neutral-300 p-3 font-bold bg-neutral-50'>
                  Senior principal engineers (15+ yrs)
                </td>
              </tr>
              <tr>
                <td className='border border-neutral-300 p-3 font-bold'>Best fit</td>
                <td className='border border-neutral-300 p-3'>Software/SaaS product companies</td>
                <td className='border border-neutral-300 p-3'>Enterprise rebrands and large teams</td>
                <td className='border border-neutral-300 p-3'>Standard accounting, CRM, and payroll</td>
                <td className='border border-neutral-300 p-3 font-bold bg-neutral-50'>
                  Utah home services and wholesale/distribution back offices
                </td>
              </tr>
            </tbody>
          </table>
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
            <h2 className='text-xl sm:text-2xl font-bold'>Want a straight second opinion?</h2>
            <p className='text-sm text-neutral-300'>
              If an off-the-shelf tool solves your problem cheaper, we will tell you on the first call.{' '}
              <Link className='text-white font-bold' href='/how-it-works'>
                See how the $0-down audit works
              </Link>
              .
            </p>
          </div>
          <div className='flex gap-3 shrink-0'>
            <ContactDrawer
              trigger={
                <Button className='cursor-pointer bg-white text-black hover:bg-neutral-200' type='button'>
                  Contact us
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
