import Link from 'next/link';
import { Phone } from 'lucide-react';
import { FaWhatsapp, FaViber } from 'react-icons/fa';
import { SELLER_INFO } from '@/app/lib/constants';
import { getCategories } from '@/app/lib/api';

const quickLinks = [
  { href: '/', label: 'Početna' },
  { href: '/#kategorije', label: 'Kategorije' },
  { href: '/#ponuda', label: 'Ponuda' },
  { href: '/#o-prodavcu', label: 'O prodavcu' },
  { href: '/#kontakt', label: 'Kontakt' },
];

export default async function Footer() {
  let rootCategories: { slug: string; name: string }[] = [];
  try {
    const categories = await getCategories();
    rootCategories = categories
      .filter((c) => !c.parentId && c.depth === 0)
      .map((c) => ({ slug: c.slug, name: c.name }));
  } catch {
    // Fallback if API is unavailable
  }

  return (
    <footer style={{ backgroundColor: '#1a1a2e' }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-3">
              <span className="text-xl font-black tracking-tight text-white">RARITETI</span>
              <span className="text-xl font-black tracking-tight" style={{ color: '#c9a227' }}>.rs</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Specijalizovana prodavnica retkih knjiga, markica, satova i kolekcionarskih predmeta iz Beograda.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold text-white">5.0</span>
              <span>— {SELLER_INFO.positiveRatings}+ ocena</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Stranice</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Kategorije</h3>
            <ul className="space-y-2">
              {rootCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/prodavnica?kategorija=${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Kontakt</h3>
            <div className="space-y-3">
              <a
                href={SELLER_INFO.contact.whatsapp}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={16} className="text-green-400 shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a
                href={SELLER_INFO.contact.viber}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <FaViber size={16} className="text-purple-400 shrink-0" />
                <span>Viber</span>
              </a>
              <a
                href={SELLER_INFO.contact.phoneUrl}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-gray-400 shrink-0" />
                <span>{SELLER_INFO.contact.displayPhone}</span>
              </a>
              <a
                href={SELLER_INFO.platformProfileUrl}
                className="text-sm text-gray-400 hover:text-white transition-colors block"
                target="_blank"
                rel="noopener noreferrer"
              >
                KupujemProdajem profil →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Rariteti.rs — {SELLER_INFO.name}, {SELLER_INFO.location}
          </p>
          <p className="text-xs text-gray-500">
            Sva prava zadržana
          </p>
        </div>
      </div>
    </footer>
  );
}
