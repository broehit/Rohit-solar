import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../images/Rohit Solar Power Logo.png';

const siteUrl = 'https://rohitsolar.live';

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Rohit Solar Power | Solar Panels in Sambhajinagar',
    description: 'Rohit Solar Power provides rooftop solar panels, installation, subsidy assistance and net metering in Chhatrapati Sambhajinagar and nearby areas.',
  },
  '/installations': {
    title: 'Solar Installations in Sambhajinagar | Rohit Solar Power',
    description: 'Explore completed rooftop solar installations and customer projects by Rohit Solar Power in Sambhajinagar and nearby Maharashtra locations.',
  },
  '/equipment': {
    title: 'Solar Panels and Inverters | Rohit Solar Power',
    description: 'View the trusted solar panels, inverters and mounting equipment used by Rohit Solar Power for residential and commercial installations.',
  },
  '/testimonials': {
    title: 'Solar Customer Reviews | Rohit Solar Power',
    description: 'Read customer experiences and reviews for rooftop solar installation services from Rohit Solar Power in Sambhajinagar.',
  },
  '/calculator': {
    title: 'Solar Savings Calculator | Rohit Solar Power',
    description: 'Estimate rooftop solar savings, system size and government subsidy for your electricity bill in Sambhajinagar.',
  },
  '/contact': {
    title: 'Contact Solar Installer in Sambhajinagar | Rohit Solar Power',
    description: 'Contact Rohit Solar Power for a free rooftop solar consultation, site survey, subsidy help and net-metering assistance.',
  },
};

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? {
      title: 'Rohit Solar Power | Solar Energy Solutions',
      description: 'Rohit Solar Power delivers reliable rooftop solar solutions across Sambhajinagar and Maharashtra.',
    };
    const isAdminPage = pathname.startsWith('/admin');
    const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;

    document.title = isAdminPage ? 'Admin | Rohit Solar Power' : metadata.title;
    setMeta('description', metadata.description);
    setMeta('robots', isAdminPage ? 'noindex, nofollow' : 'index, follow');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let structuredData = document.getElementById('business-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'business-structured-data';
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#business`,
      name: 'Rohit Solar Power',
      url: siteUrl,
      logo: `${siteUrl}${logo}`,
      telephone: '+919373402907',
      description: metadata.description,
      areaServed: [
        'Chhatrapati Sambhajinagar',
        'Aurangabad',
        'Jalna',
        'Beed',
        'Maharashtra',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chhatrapati Sambhajinagar',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
      sameAs: ['https://www.linkedin.com/in/rohit-manal-b1798b313'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Solar energy services',
        itemListElement: [
          'Residential rooftop solar installation',
          'Solar subsidy assistance',
          'MSEDCL net metering assistance',
          'Solar equipment supply',
        ].map((item) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: item },
        })),
      },
    });
  }, [pathname]);

  return null;
}
