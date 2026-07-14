import { about, contact, faqSection, services } from './content'

// Central SEO config.
// SITE_URL is a placeholder until production hosting is decided — once the real domain is live,
// update it here AND in client/public/robots.txt AND client/public/sitemap.xml (search the repo
// for this exact string to find all three).
export const SITE_URL = 'https://www.pomeloagency.com'
export const SITE_NAME = 'Pomelo Casting'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildOrganizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo-512.png'),
    image: DEFAULT_OG_IMAGE,
    description: about.body,
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '120m Road, Ankawa',
      addressLocality: 'Erbil',
      addressRegion: 'Kurdistan Region',
      addressCountry: 'IQ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.mapCoords.lat,
      longitude: contact.mapCoords.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00:00',
        closes: '17:00:00',
      },
    ],
    sameAs: [contact.instagramHref],
    makesOffer: services.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.title,
        description: item.description,
      },
    })),
  }
}

export function buildWebsiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl('/'),
  }
}

export function buildFaqPageLd() {
  const allFaqs = [...faqSection.items, ...contact.faq]
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildBreadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
