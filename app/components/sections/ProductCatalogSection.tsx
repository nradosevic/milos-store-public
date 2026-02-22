'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, Category, Tag, ProductFilters } from '@/app/lib/types';
import { getProducts, getCategories, getTags } from '@/app/lib/api';
import ProductCard from '@/app/components/ui/ProductCard';

const CONDITIONS = ['Odlično', 'Vrlo dobro', 'Dobro', 'Prihvatljivo'];
const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Najnovije' },
  { value: 'price_asc', label: 'Cena: od niže' },
  { value: 'price_desc', label: 'Cena: od više' },
  { value: 'year_desc', label: 'Godina: novije' },
  { value: 'year_asc', label: 'Godina: starije' },
];

interface ProductCatalogSectionProps {
  initialCategorySlug?: string;
  initialSearch?: string;
}

function CategoryTree({ categories, selected, onSelect }: {
  categories: Category[];
  selected?: string;
  onSelect: (slug: string | undefined) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const roots = categories.filter(c => !c.parentId || c.depth === 0);

  const renderCategory = (cat: Category, depth = 0) => {
    const children = categories.filter(c => c.parentId === cat.id);
    const isExpanded = expanded.has(cat.id);
    const isSelected = selected === cat.slug;

    return (
      <div key={cat.id}>
        <div
          className={`flex items-center justify-between py-1.5 px-2 rounded-lg cursor-pointer text-sm transition-colors ${
            isSelected ? 'bg-amber-50 text-amber-800 font-medium' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => onSelect(isSelected ? undefined : cat.slug)}
        >
          <span className="flex-1 truncate">{cat.name}</span>
          {cat.productCount !== undefined && (
            <span className="text-xs text-gray-400 mr-1">({cat.productCount})</span>
          )}
          {children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(prev => {
                  const next = new Set(prev);
                  next.has(cat.id) ? next.delete(cat.id) : next.add(cat.id);
                  return next;
                });
              }}
              className="p-0.5 hover:bg-gray-200 rounded"
            >
              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>
        {isExpanded && children.map(child => renderCategory(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="space-y-0.5">
      <div
        className={`py-1.5 px-2 rounded-lg cursor-pointer text-sm transition-colors ${
          !selected ? 'bg-amber-50 text-amber-800 font-medium' : 'text-gray-700 hover:bg-gray-50'
        }`}
        onClick={() => onSelect(undefined)}
      >
        Sve kategorije
      </div>
      {roots.map(cat => renderCategory(cat))}
    </div>
  );
}

export default function ProductCatalogSection({ initialCategorySlug, initialSearch }: ProductCatalogSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter state
  const [categorySlug, setCategorySlug] = useState(initialCategorySlug || searchParams.get('category') || undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [condition, setCondition] = useState(searchParams.get('condition') || '');
  const [priceMin, setPriceMin] = useState(searchParams.get('priceMin') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');
  const [yearMin, setYearMin] = useState(searchParams.get('yearMin') || '');
  const [yearMax, setYearMax] = useState(searchParams.get('yearMax') || '');
  const [isUnique, setIsUnique] = useState(false);
  const [includeSold, setIncludeSold] = useState(false);
  const [search, setSearch] = useState(initialSearch || searchParams.get('search') || '');
  const [sortOption, setSortOption] = useState('createdAt_desc');
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const [sortBy, sortDir] = sortOption.split('_') as [ProductFilters['sortBy'], ProductFilters['sortDir']];
      const filters: ProductFilters = {
        page,
        limit: 12,
        sortBy,
        sortDir,
        ...(categorySlug ? { categorySlug } : {}),
        ...(selectedTags.length > 0 ? { tags: selectedTags.join(',') } : {}),
        ...(condition ? { condition } : {}),
        ...(priceMin ? { priceMin: Number(priceMin) } : {}),
        ...(priceMax ? { priceMax: Number(priceMax) } : {}),
        ...(yearMin ? { yearMin: Number(yearMin) } : {}),
        ...(yearMax ? { yearMax: Number(yearMax) } : {}),
        ...(isUnique ? { isUnique: true } : {}),
        ...(search ? { search } : {}),
        isSold: includeSold ? undefined : false,
      };

      const result = await getProducts(filters);
      setProducts(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [page, categorySlug, selectedTags, condition, priceMin, priceMax, yearMin, yearMax, isUnique, includeSold, search, sortOption]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    getTags().then(setTags).catch(() => {});
  }, []);

  const toggleTag = (slug: string) => {
    setSelectedTags(prev =>
      prev.includes(slug) ? prev.filter(t => t !== slug) : [...prev, slug]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setCategorySlug(initialCategorySlug || undefined);
    setSelectedTags([]);
    setCondition('');
    setPriceMin('');
    setPriceMax('');
    setYearMin('');
    setYearMax('');
    setIsUnique(false);
    setIncludeSold(false);
    setSearch('');
    setPage(1);
  };

  const hasFilters = !!(categorySlug || selectedTags.length > 0 || condition || priceMin || priceMax || yearMin || yearMax || isUnique || includeSold || search);

  const FiltersPanel = () => (
    <div className="space-y-5">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Pretraga</label>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Naziv predmeta..."
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30 focus:border-[#c9a227]"
        />
      </div>

      {/* Category tree */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Kategorija</label>
        <CategoryTree
          categories={categories}
          selected={categorySlug}
          onSelect={(slug) => { setCategorySlug(slug); setPage(1); }}
        />
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Tagovi</label>
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 20).map((tag) => (
              <button
                key={tag.slug}
                onClick={() => toggleTag(tag.slug)}
                className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                  selectedTags.includes(tag.slug)
                    ? 'bg-amber-100 border-amber-400 text-amber-800'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {tag.name}
                {tag.productCount !== undefined && (
                  <span className="ml-1 opacity-60">({tag.productCount})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Year range */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Godište</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={yearMin}
            onChange={(e) => { setYearMin(e.target.value); setPage(1); }}
            placeholder="Od"
            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
          />
          <input
            type="number"
            value={yearMax}
            onChange={(e) => { setYearMax(e.target.value); setPage(1); }}
            placeholder="Do"
            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
          />
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Stanje</label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="condition"
              value=""
              checked={condition === ''}
              onChange={() => { setCondition(''); setPage(1); }}
              className="accent-[#c9a227]"
            />
            <span className="text-sm text-gray-700">Sve</span>
          </label>
          {CONDITIONS.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="condition"
                value={c}
                checked={condition === c}
                onChange={() => { setCondition(c); setPage(1); }}
                className="accent-[#c9a227]"
              />
              <span className="text-sm text-gray-700">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Cena (RSD)</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceMin}
            onChange={(e) => { setPriceMin(e.target.value); setPage(1); }}
            placeholder="Min"
            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
          />
          <input
            type="number"
            value={priceMax}
            onChange={(e) => { setPriceMax(e.target.value); setPage(1); }}
            placeholder="Max"
            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isUnique}
            onChange={(e) => { setIsUnique(e.target.checked); setPage(1); }}
            className="w-4 h-4 rounded accent-[#c9a227]"
          />
          <span className="text-sm text-gray-700">Samo jedinstveni predmeti</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeSold}
            onChange={(e) => { setIncludeSold(e.target.checked); setPage(1); }}
            className="w-4 h-4 rounded accent-[#c9a227]"
          />
          <span className="text-sm text-gray-700">Uključi prodate predmete</span>
        </label>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 px-4 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5"
        >
          <X size={14} />
          Ukloni filtere
        </button>
      )}
    </div>
  );

  return (
    <section id="ponuda" className="py-16 sm:py-20" style={{ backgroundColor: '#f8f8f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
              Ponuda predmeta
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {total > 0 ? `${total} predmeta` : 'Pregledajte sve predmete'}
            </p>
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter size={16} />
            Filteri
            {hasFilters && (
              <span className="w-5 h-5 rounded-full bg-[#c9a227] text-white text-xs flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-20">
              <FiltersPanel />
            </div>
          </aside>

          {/* Mobile filters drawer */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
              <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-4 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold" style={{ color: '#1a1a2e' }}>Filteri</h3>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                <FiltersPanel />
              </div>
            </div>
          )}

          {/* Products area */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 hidden sm:block">
                {total} {total === 1 ? 'predmet' : 'predmeta'}
              </span>
              <select
                value={sortOption}
                onChange={(e) => { setSortOption(e.target.value); setPage(1); }}
                className="ml-auto px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Product grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                    <div className="bg-gray-200" style={{ aspectRatio: '4/3' }} />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p className="text-lg font-medium">Nema predmeta koji odgovaraju filterima</p>
                <p className="text-sm mt-1">Pokušajte sa drugačijim filterima</p>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    Ukloni filtere
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                >
                  ← Prethodna
                </button>
                <span className="text-sm text-gray-600">
                  Strana {page} od {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                >
                  Sledeća →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
