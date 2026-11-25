import type { Metadata } from 'next';
import NextImage from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getDocumentBySlug, getDocuments } from 'outstatic/server';

import { ContactDrawer } from '@/components/contact-drawer';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { JsonLd } from '@/components/json-ld';
import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../../../../constants';

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getDocuments('portfolio-projects', ['slug']);
  return projects
    .filter((doc) => typeof doc.slug === 'string' && doc.slug.length > 0)
    .map((doc) => ({ slug: doc.slug as string }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getDocumentBySlug('portfolio-projects', slug, ['title', 'description', 'publishedAt']);

  if (!project) {
    return { title: 'Case Study Not Found' };
  }

  const description =
    (project.description as string) ||
    `${project.title} custom software and architecture case study by UtahDevCo in Draper, Utah.`;

  return {
    title: `${project.title} — Case Study`,
    description,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function WorkCaseStudyPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getDocumentBySlug('portfolio-projects', slug, [
    'title',
    'slug',
    'coverImage',
    'content',
    'publishedAt',
    'description',
  ]);

  if (!project) {
    notFound();
  }

  const publishedAt = (project.publishedAt as string) || '2026-11-01T00:00:00.000Z';
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.title} — UtahDevCo Case Study`,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      '@type': 'Person',
      name: 'Chris Esplin',
      url: 'https://www.chrisesplin.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UtahDevCo',
      url: 'https://www.utahdevco.com',
    },
    mainEntityOfPage: `https://www.utahdevco.com/work/${slug}`,
  };

  return (
    <main className='flex flex-col gap-10 items-center min-h-screen max-w-viewport w-screen'>
      <JsonLd data={articleSchema} />
      <Header />

      <article className='w-full max-w-4xl px-4 sm:px-6 flex flex-col gap-8'>
        <nav aria-label='Breadcrumb' className='text-sm text-neutral-600'>
          <Link href='/'>Home</Link> / <Link href='/#portfolio'>Portfolio</Link> /{' '}
          <span className='text-neutral-900 font-medium'>{project.title}</span>
        </nav>

        <header className='flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-neutral-200 pb-6'>
          {project.coverImage ? (
            <NextImage alt={project.title} height={88} src={project.coverImage as string} width={88} />
          ) : null}
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
              UtahDevCo Case Study · Updated {formattedDate}
            </p>
            <h1 className='text-3xl sm:text-4xl font-bold'>{project.title}</h1>
          </div>
        </header>

        <div className='mdx flex flex-col gap-4 text-base leading-relaxed text-neutral-800'>
          <MDXRemote source={project.content} />
        </div>

        <section className='flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-md bg-secondary text-secondary-foreground'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-xl font-bold'>Have a manual workflow slowing your team down?</h2>
            <p className='text-sm text-neutral-300'>
              Start with our $0-down Workflow &amp; ROI Audit and pay only 50% of verified Year-1 savings.
            </p>
          </div>
          <div className='flex gap-3 shrink-0'>
            <ContactDrawer
              trigger={
                <Button className='cursor-pointer bg-white text-black hover:bg-neutral-200' type='button'>
                  Request Audit
                </Button>
              }
            />
            <Button asChild className='no-underline' variant='cta'>
              <a href={CONSTANTS.META.BOOKING_URL} rel='noopener noreferrer' target='_blank'>
                Schedule Call
              </a>
            </Button>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
