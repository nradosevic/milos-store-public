import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getCategoryBySlug } from '@/app/lib/api';
import ProductCatalogSection from '@/app/components/sections/ProductCatalogSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);
    const productCount = category.products?.total || 0;
    return {
      title: `${category.name} — Kupovina retkih predmeta`,
      description: `Pregledajte ${productCount} ${category.name} u ponudi. Originalni predmeti, detaljno opisani i fotografisani. Proveren prodavac, brza dostava.`,
      alternates: { canonical: `https://rariteti.rs/kategorija/${slug}` },
      openGraph: {
        title: `${category.name} | Rariteti.rs`,
        description: category.description || `Pregledajte ponudu u kategoriji ${category.name}`,
        url: `https://rariteti.rs/kategorija/${slug}`,
      },
    };
  } catch {
    return { title: 'Kategorija | Rariteti.rs' };
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  let category;
  try {
    category = await getCategoryBySlug(slug);
  } catch {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: 'https://rariteti.rs' },
      { '@type': 'ListItem', position: 2, name: category.name, item: `https://rariteti.rs/kategorija/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#f8f8f6' }} className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#c9a227] transition-colors">Početna</Link>
            <ChevronRight size={14} />
            <span className="font-medium" style={{ color: '#1a1a2e' }}>{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category header */}
      <div style={{ backgroundColor: '#f8f8f6' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-2 text-gray-600 max-w-2xl text-sm leading-relaxed">
              {category.description}
            </p>
          )}
          {category.products && (
            <p className="mt-2 text-xs text-gray-400">
              {category.products.total} predmeta u ponudi
            </p>
          )}
        </div>
      </div>

      {/* Product catalog with category pre-selected */}
      <Suspense fallback={<div className="py-20 text-center text-gray-400">Učitavanje ponude...</div>}>
        <ProductCatalogSection initialCategorySlug={slug} />
      </Suspense>
    </>
  );
}
