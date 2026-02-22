'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const QUICK_CATEGORIES = [
  { label: 'Knjige', slug: 'knjige' },
  { label: 'Markice', slug: 'markice' },
  { label: 'Satovi', slug: 'rucni-i-dzepni-satovi' },
  { label: 'Kolekcionarstvo', slug: 'kolekcionarstvo' },
  { label: 'Antikviteti', slug: 'antikviteti' },
  { label: 'Vinili', slug: 'vinili-lp-ploce' },
  { label: 'Nakit', slug: 'nakit-i-dragocenosti' },
  { label: 'Razglednice', slug: 'razglednice' },
];

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/#ponuda?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleCategoryClick = (slug: string) => {
    router.push(`/kategorija/${slug}`);
  };

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#f8f8f6' }}>
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#c9a227 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 text-xs font-semibold rounded-full border border-green-200">
            ✔ 100% pozitivne ocene
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
            ⭐ PREKO 1.200 uspešnih prodaja
          </span>
        </div>

        {/* H1 */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4"
          style={{ color: '#1a1a2e' }}
        >
          Retke knjige, markice i{' '}
          <span style={{ color: '#c9a227' }}>kolekcionarski predmeti</span>{' '}
          iz jedne proverene kolekcije
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Preko 15.000 jedinstvenih predmeta – direktno od provereno pouzdanog prodavca.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
          <div className="flex items-center bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden focus-within:border-[#c9a227] focus-within:ring-2 focus-within:ring-[#c9a227]/20 transition-all">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pretražite (npr. džepni sat, markice SFRJ...)"
              className="flex-1 px-4 py-3.5 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-5 py-3.5 text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#c9a227' }}
              aria-label="Pretraži"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Quick filter chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className="px-3.5 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-700 hover:border-[#c9a227] hover:text-[#c9a227] hover:bg-amber-50 transition-all"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
