import type { MetadataRoute } from 'next';
import { getDocuments } from 'outstatic/server';

const BASE_URL = 'https://www.utahdevco.com';
const SITE_UPDATED = new Date('2026-11-24T00:00:00.000Z');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/industries/home-services`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/industries/wholesale-distribution`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/utah-custom-software-comparison`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  const portfolioProjects = await getDocuments('portfolio-projects', ['slug', 'publishedAt']);
  const workRoutes: MetadataRoute.Sitemap = portfolioProjects
    .filter((doc) => typeof doc.slug === 'string' && doc.slug.length > 0)
    .map((doc) => ({
      url: `${BASE_URL}/work/${doc.slug}`,
      lastModified: doc.publishedAt ? new Date(doc.publishedAt as string) : SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...workRoutes];
}
