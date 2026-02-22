import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getCategories, getTestimonials, getFaq } from '@/app/lib/api';
import HeroSection from '@/app/components/sections/HeroSection';
import TrustSection from '@/app/components/sections/TrustSection';
import AboutSellerSection from '@/app/components/sections/AboutSellerSection';
import CategoryGridSection from '@/app/components/sections/CategoryGridSection';
import ProductCatalogSection from '@/app/components/sections/ProductCatalogSection';
import TestimonialsSection from '@/app/components/sections/TestimonialsSection';
import FaqSection from '@/app/components/sections/FaqSection';
import ContactSection from '@/app/components/sections/ContactSection';
import { SELLER_INFO } from '@/app/lib/constants';

export const metadata: Metadata = {
  title: 'Rariteti.rs — Retke knjige, markice i kolekcionarski predmeti | Beograd',
  description:
    'Preko 15.000 retkih i kolekcionarskih predmeta: knjige, markice, satovi, nakit, dokumenti. Proveren prodavac sa 1.279 pozitivnih ocena.',
  alternates: { canonical: 'https://rariteti.rs' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Store'],
  name: 'Rariteti.rs',
  description: 'Specijalizovana prodavnica retkih knjiga, markica, satova i kolekcionarskih predmeta',
  url: 'https://rariteti.rs',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Beograd',
    addressRegion: 'Savski venac',
    addressCountry: 'RS',
  },
  telephone: SELLER_INFO.contact.phone,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: String(SELLER_INFO.positiveRatings),
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [SELLER_INFO.platformProfileUrl],
};

export default async function HomePage() {
  const [categoriesResult, testimonialsResult, faqResult] = await Promise.allSettled([
    getCategories(),
    getTestimonials(),
    getFaq(),
  ]);

  return (
    <>
      {/* JSON-LD: LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <HeroSection />
      <TrustSection />
      <AboutSellerSection />
      <CategoryGridSection
        categories={categoriesResult.status === 'fulfilled' ? categoriesResult.value : undefined}
      />
      <Suspense fallback={<div className="py-20 text-center text-gray-400">Učitavanje ponude...</div>}>
        <ProductCatalogSection />
      </Suspense>
      <TestimonialsSection
        testimonials={testimonialsResult.status === 'fulfilled' ? testimonialsResult.value : undefined}
      />
      <FaqSection
        items={faqResult.status === 'fulfilled' ? faqResult.value : undefined}
      />
      <ContactSection />
    </>
  );
}
