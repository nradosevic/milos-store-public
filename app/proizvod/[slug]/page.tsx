import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Phone, Tag, CheckCircle } from 'lucide-react';
import { FaWhatsapp, FaViber } from 'react-icons/fa';
import { getProductBySlug, getImageUrl } from '@/app/lib/api';
import { CONDITION_SCHEMA_MAP, SELLER_INFO } from '@/app/lib/constants';
import ProductCard from '@/app/components/ui/ProductCard';
import ContactSection from '@/app/components/sections/ContactSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('sr-RS', {
    style: 'currency',
    currency: 'RSD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    const mainImage = product.images?.find((img) => img.isMain) || product.images?.[0];
    const imageUrl = mainImage ? getImageUrl(mainImage.s3Key) : undefined;

    const priceText = product.priceOnRequest
      ? ''
      : product.price
        ? ` | ${formatPrice(product.price)}`
        : '';
    const conditionText = product.condition ? ` | Stanje: ${product.condition}` : '';
    const description = (
      product.shortDescription ||
      product.description?.replace(/<[^>]+>/g, '').slice(0, 160) ||
      product.title
    ) + ` Proveren prodavac sa 5.0 ocenom.`;

    const title = `${product.title}${product.year ? ` (${product.year})` : ''}${conditionText}${priceText}`;

    return {
      title: product.title,
      description: description.slice(0, 160),
      alternates: { canonical: `https://rariteti.rs/proizvod/${slug}` },
      openGraph: {
        title: product.title,
        description: description.slice(0, 160),
        url: `https://rariteti.rs/proizvod/${slug}`,
        type: 'website',
        images: imageUrl ? [{ url: imageUrl, alt: `${product.title} - fotografija` }] : undefined,
      },
      other: {
        'og:price:amount': product.price ? String(product.price) : '',
        'og:price:currency': 'RSD',
      },
    };
  } catch {
    return { title: 'Predmet | Rariteti.rs' };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  const mainImage = product.images?.find((img) => img.isMain) || product.images?.[0];
  const otherImages = product.images?.filter((img) => !img.isMain) || [];
  const allImages = mainImage ? [mainImage, ...otherImages] : otherImages;

  const breadcrumb = product.categoryBreadcrumb || (product.category ? [product.category] : []);

  // Build JSON-LD Product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDescription || product.description?.replace(/<[^>]+>/g, '').slice(0, 500) || product.title,
    image: allImages.map((img, i) => ({
      '@type': 'ImageObject',
      url: getImageUrl(img.s3Key),
      name: img.altText || `${product.title} - fotografija ${i + 1}`,
    })),
    brand: {
      '@type': 'Brand',
      name: SELLER_INFO.name,
    },
    seller: {
      '@type': 'Person',
      name: SELLER_INFO.name,
    },
    category: product.category?.name,
    ...(product.condition
      ? { itemCondition: CONDITION_SCHEMA_MAP[product.condition] || 'https://schema.org/UsedCondition' }
      : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RSD',
      price: product.priceOnRequest ? undefined : product.price,
      availability: product.isSold
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      seller: {
        '@type': 'Person',
        name: SELLER_INFO.name,
      },
      url: `https://rariteti.rs/proizvod/${slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Početna', item: 'https://rariteti.rs' },
      ...breadcrumb.map((cat, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: cat.name,
        item: `https://rariteti.rs/kategorija/${cat.slug}`,
      })),
      { '@type': 'ListItem', position: breadcrumb.length + 2, name: product.title },
    ],
  };

  // Fields to display (respecting hiddenFields)
  const hiddenFields = product.hiddenFields || [];
  const standardFields: Array<{ key: string; label: string; value?: string | number | null }> = [
    { key: 'year', label: 'Godište', value: product.year },
    { key: 'condition', label: 'Stanje', value: product.condition },
    { key: 'origin', label: 'Poreklo', value: product.origin },
    { key: 'period', label: 'Period', value: product.period },
    { key: 'author', label: 'Autor', value: product.author },
    { key: 'publisher', label: 'Izdavač', value: product.publisher },
    { key: 'material', label: 'Materijal', value: product.material },
    { key: 'dimensions', label: 'Dimenzije', value: product.dimensions },
  ].filter((f) => !hiddenFields.includes(f.key) && f.value != null && f.value !== '');

  const whatsappMessage = encodeURIComponent(`Zdravo, zanima me proizvod: ${product.title}`);
  const whatsappLink = `https://wa.me/381638795504?text=${whatsappMessage}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <div style={{ backgroundColor: '#f8f8f6' }} className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-[#c9a227] transition-colors">Početna</Link>
            {breadcrumb.map((cat) => (
              <React.Fragment key={cat.id}>
                <ChevronRight size={12} />
                <Link
                  href={`/kategorija/${cat.slug}`}
                  className="hover:text-[#c9a227] transition-colors"
                >
                  {cat.name}
                </Link>
              </React.Fragment>
            ))}
            <ChevronRight size={12} />
            <span className="font-medium truncate max-w-[200px]" style={{ color: '#1a1a2e' }}>
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f8f6' }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image gallery */}
            <div>
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white mb-3">
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  {allImages.length > 0 ? (
                    <Image
                      src={getImageUrl(allImages[0].s3Key)}
                      alt={allImages[0].altText || `${product.title} - fotografija`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-sm">Nema fotografija</span>
                    </div>
                  )}
                  {product.isSold && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-600 text-white text-lg font-bold px-6 py-3 rounded-xl -rotate-3">
                        PRODATO
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {allImages.map((img, i) => (
                    <div
                      key={img.id}
                      className="rounded-lg overflow-hidden border border-gray-200 bg-white"
                      style={{ aspectRatio: '1' }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageUrl(img.thumbnailS3Key || img.s3Key)}
                          alt={img.altText || `${product.title} - fotografija ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              {/* Sold badge */}
              {product.isSold && (
                <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                  Ovaj predmet je prodat
                </div>
              )}

              {/* Unique badge */}
              {product.isUnique && !product.isSold && (
                <div
                  className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: '#c9a227' }}
                >
                  Samo 1 komad
                </div>
              )}

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold mb-3 leading-tight" style={{ color: '#1a1a2e' }}>
                {product.title}
              </h1>

              {/* Price */}
              <div className="mb-5">
                {product.priceOnRequest ? (
                  <span className="text-lg font-bold text-gray-600">Cena na upit</span>
                ) : product.price ? (
                  <span className="text-2xl font-extrabold" style={{ color: '#c9a227' }}>
                    {formatPrice(product.price)}
                  </span>
                ) : (
                  <span className="text-lg font-bold text-gray-600">Cena na upit</span>
                )}
              </div>

              {/* Contact buttons */}
              {!product.isSold && (
                <div className="flex flex-col sm:flex-row gap-2 mb-6">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <FaWhatsapp size={18} />
                    Pošalji upit (WhatsApp)
                  </a>
                  <a
                    href={SELLER_INFO.contact.viber}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#7360F2' }}
                  >
                    <FaViber size={18} />
                    Viber
                  </a>
                  <a
                    href={SELLER_INFO.contact.phoneUrl}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#1a1a2e' }}
                  >
                    <Phone size={16} />
                    {SELLER_INFO.contact.displayPhone}
                  </a>
                </div>
              )}

              {/* Fields table */}
              {standardFields.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-5">
                  <table className="w-full text-sm">
                    <tbody>
                      {standardFields.map((field, i) => (
                        <tr key={field.key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-2.5 px-4 font-medium text-gray-600 w-1/3 text-xs">
                            {field.label}
                          </td>
                          <td className="py-2.5 px-4 text-gray-900 text-sm">
                            {String(field.value)}
                          </td>
                        </tr>
                      ))}
                      {/* Custom fields */}
                      {product.customFields && Object.entries(product.customFields).map(([key, value], i) => (
                        <tr key={key} className={(standardFields.length + i) % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-2.5 px-4 font-medium text-gray-600 w-1/3 text-xs">{key}</td>
                          <td className="py-2.5 px-4 text-gray-900 text-sm">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  <Tag size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  {product.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/?tags=${tag.slug}`}
                      className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-amber-100 hover:text-amber-800 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Trust box */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-amber-900 mb-1">Kupujete bezbedno</div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Proveren prodavac sa <strong>1.279+ pozitivnih ocena</strong> i 0 negativnih.
                      Svi predmeti su detaljno fotografisani i opisani.
                      Povraćaj zagarantovan u roku od 14 dana.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full description */}
          {product.description && (
            <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#1a1a2e' }}>Opis predmeta</h2>
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Related products */}
          {product.relatedProducts && product.relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
                Slični predmeti
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {product.relatedProducts.slice(0, 4).map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact section */}
      <ContactSection productTitle={product.title} productSlug={product.slug} />
    </>
  );
}
