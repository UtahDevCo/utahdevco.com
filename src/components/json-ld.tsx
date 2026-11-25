type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ data }: JsonLdProps) {
  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type='application/ld+json' />;
}

export type FaqItem = {
  question: string;
  answer: string;
};

export function buildFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness', 'Organization'],
  '@id': 'https://www.utahdevco.com/#organization',
  name: 'UtahDevCo',
  alternateName: 'Utah Dev Co',
  url: 'https://www.utahdevco.com',
  logo: 'https://www.utahdevco.com/images/logos/udc-background-square.png',
  image: 'https://www.utahdevco.com/images/logos/udc-background-square.png',
  priceRange: '50% of verified Year-1 savings ($0-down audit)',
  email: 'hey@utahdevco.com',
  description:
    'Utah custom software and back-office workflow automation studio for non-tech businesses. $0-down Workflow & ROI Audit and 50% Year-1 verified savings pricing.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Draper',
    addressRegion: 'UT',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Salt Lake City' },
    { '@type': 'City', name: 'Draper' },
    { '@type': 'City', name: 'Lehi' },
    { '@type': 'City', name: 'Provo' },
    { '@type': 'City', name: 'Ogden' },
    { '@type': 'State', name: 'Utah' },
  ],
  founder: {
    '@type': 'Person',
    '@id': 'https://www.chrisesplin.com/#person',
    name: 'Chris Esplin',
    url: 'https://www.chrisesplin.com',
    jobTitle: 'Founder & Principal Software Architect',
  },
  sameAs: [
    'https://www.chrisesplin.com',
    'https://github.com/UtahDevCo',
    'https://www.youtube.com/ChrisEsplin',
    'https://clutch.co/profile/utahdevco',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'UtahDevCo Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: '$0-Down Workflow & ROI Audit',
        price: '0',
        priceCurrency: 'USD',
        description:
          'Free operational workflow audit for qualifying $2M+ businesses that produces a signed baseline and projected annual savings worksheet.',
        url: 'https://www.utahdevco.com/how-it-works',
      },
      {
        '@type': 'Offer',
        name: 'Custom Workflow Automation (50% Year-1 Savings Split)',
        description:
          'Custom internal tools, bank/ERP/QuickBooks/ServiceTitan integrations, and practical AI document automation paid as 50% of verified Year-1 cost and labor savings.',
        url: 'https://www.utahdevco.com/how-it-works',
      },
      {
        '@type': 'Offer',
        name: 'Home Services Back-Office Automation',
        description:
          'ServiceTitan, Jobber, and QuickBooks reconciliation, job costing, and dispatch workflow automation for Utah HVAC, plumbing, electrical, and roofing companies.',
        url: 'https://www.utahdevco.com/industries/home-services',
      },
      {
        '@type': 'Offer',
        name: 'Wholesale & Distribution Workflow Automation',
        description:
          'Automated PDF purchase order, invoice, and BOL parsing plus ERP-to-QuickBooks sync for Utah distributors and wholesalers.',
        url: 'https://www.utahdevco.com/industries/wholesale-distribution',
      },
    ],
  },
};
