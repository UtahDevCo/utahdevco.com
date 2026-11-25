import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['OAI-SearchBot', 'GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', '*'],
        allow: '/',
        disallow: ['/outstatic/', '/api/'],
      },
    ],
    sitemap: 'https://www.utahdevco.com/sitemap.xml',
  };
}
