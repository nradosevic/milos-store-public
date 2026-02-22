import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { Product } from '@/app/lib/types';

interface ProductCardProps {
  product: Product;
}

function getMainImageUrl(product: Product): string {
  if (!product.images || product.images.length === 0) return '/images/placeholder.svg';
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  return mainImage.thumbnailUrl || mainImage.url || '/images/placeholder.svg';
}

function getMainImageAlt(product: Product): string {
  if (!product.images || product.images.length === 0) return `${product.title} - fotografija`;
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  return mainImage.altText || `${product.title} - fotografija`;
}

function formatPrice(product: Product): string {
  if (product.priceOnRequest) return 'Cena na upit';
  if (product.price) {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'RSD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(product.price);
  }
  return 'Cena na upit';
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getMainImageUrl(product);
  const imageAlt = getMainImageAlt(product);
  const priceDisplay = formatPrice(product);

  const whatsappMessage = encodeURIComponent(`Zdravo, zanima me proizvod: ${product.title}`);
  const whatsappLink = `https://wa.me/381638795504?text=${whatsappMessage}`;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#c9a227]/30 transition-all flex flex-col overflow-hidden relative">
      {/* PRODATO overlay */}
      {product.isSold && (
        <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center rounded-xl">
          <span className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg transform -rotate-3">
            PRODATO
          </span>
        </div>
      )}

      {/* Unique badge */}
      {product.isUnique && !product.isSold && (
        <div
          className="absolute top-2 left-2 z-10 text-white text-xs font-bold px-2 py-1 rounded-md"
          style={{ backgroundColor: '#c9a227' }}
        >
          Samo 1 komad
        </div>
      )}

      {/* Image */}
      <Link href={`/proizvod/${product.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </Link>

      {/* Content */}
      <div className="p-3.5 flex flex-col gap-2 flex-1">
        {/* Category breadcrumb */}
        {product.category && (
          <div className="text-xs text-gray-400 truncate">
            {product.categoryBreadcrumb
              ? product.categoryBreadcrumb.map((c) => c.name).join(' › ')
              : product.category.name}
          </div>
        )}

        {/* Title */}
        <Link href={`/proizvod/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-[#c9a227] transition-colors" style={{ color: '#1a1a2e' }}>
            {product.title}
          </h3>
        </Link>

        {/* Short description */}
        {product.shortDescription && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Price + condition */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div>
            <div
              className="text-sm font-bold"
              style={{ color: product.priceOnRequest ? '#6b7280' : '#1a1a2e' }}
            >
              {priceDisplay}
            </div>
            {product.condition && (
              <div className="text-xs text-gray-400">{product.condition}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/proizvod/${product.slug}`}
            className="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold border transition-all hover:bg-gray-50"
            style={{ borderColor: '#1a1a2e', color: '#1a1a2e' }}
          >
            <span className="flex items-center justify-center gap-1">
              <ExternalLink size={12} />
              Detalji
            </span>
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 px-3 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-1"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageSquare size={12} />
            Upit
          </a>
        </div>
      </div>
    </div>
  );
}
