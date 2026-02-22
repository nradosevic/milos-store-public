'use client';

import Link from 'next/link';
import {
  BookOpen, Newspaper, Landmark, Archive, Watch, Gem,
  Camera, Music, Disc, Wrench, Palette, Gamepad2, Glasses,
  Shirt, Briefcase, Home, Target, Trophy, Car, Settings,
  Smartphone, Scissors, GraduationCap,
} from 'lucide-react';
import { Category } from '@/app/lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  'book-open': BookOpen,
  'newspaper': Newspaper,
  'landmark': Landmark,
  'archive': Archive,
  'watch': Watch,
  'gem': Gem,
  'camera': Camera,
  'music': Music,
  'disc': Disc,
  'wrench': Wrench,
  'palette': Palette,
  'gamepad-2': Gamepad2,
  'glasses': Glasses,
  'shirt': Shirt,
  'briefcase': Briefcase,
  'home': Home,
  'target': Target,
  'trophy': Trophy,
  'car': Car,
  'settings': Settings,
  'smartphone': Smartphone,
  'scissors': Scissors,
  'graduation-cap': GraduationCap,
};

// Fallback static categories for when API is unavailable
const STATIC_CATEGORIES = [
  { name: 'Knjige', slug: 'knjige', iconName: 'book-open', description: 'Retke i kolekcionarske knjige — beletristika, enciklopedije i udžbenici.', productCount: 0 },
  { name: 'Časopisi i stripovi', slug: 'casopisi-i-stripovi', iconName: 'newspaper', description: 'Stari časopisi, strip albumi, magazini i novinski isečci.', productCount: 0 },
  { name: 'Antikviteti', slug: 'antikviteti', iconName: 'landmark', description: 'Porcelan, srebro, staklo, nameštaj i drugi antikvitetni predmeti.', productCount: 0 },
  { name: 'Kolekcionarstvo', slug: 'kolekcionarstvo', iconName: 'archive', description: 'Markice, medalje, novčanice, razglednice i ostala memorabilija.', productCount: 0 },
  { name: 'Satovi', slug: 'rucni-i-dzepni-satovi', iconName: 'watch', description: 'Vintage ručni satovi, džepni satovi i zidni satovi.', productCount: 0 },
  { name: 'Nakit', slug: 'nakit-i-dragocenosti', iconName: 'gem', description: 'Prstenje, narukvice, ogrlice, minđuše i broševi.', productCount: 0 },
  { name: 'Foto-aparati', slug: 'foto-aparati-i-kamere', iconName: 'camera', description: 'Analogni foto-aparati, objektivi i foto oprema.', productCount: 0 },
  { name: 'Audio', slug: 'audio', iconName: 'music', description: 'Gramofoni, radio aparati, zvučnici i pojačala.', productCount: 0 },
  { name: 'Vinili i CD', slug: 'audio-vinili-cd-i-kasete', iconName: 'disc', description: 'LP ploče, CD-ovi, audio kasete i DVD.', productCount: 0 },
  { name: 'Umetnička dela', slug: 'umetnicka-dela-i-materijali', iconName: 'palette', description: 'Slike, grafike, skulpture, plakati i posteri.', productCount: 0 },
  { name: 'Igračke i igre', slug: 'igracke-i-igre', iconName: 'gamepad-2', description: 'Stare igračke, društvene igre, modeli i figurice.', productCount: 0 },
  { name: 'Pisaće mašine', slug: 'oprema-za-poslovanje', iconName: 'briefcase', description: 'Pisaće mašine, kalkulatori i kancelarijski predmeti.', productCount: 0 },
];

interface CategoryGridSectionProps {
  categories?: Category[];
}

export default function CategoryGridSection({ categories }: CategoryGridSectionProps) {
  const displayCategories = categories && categories.length > 0
    ? categories.filter(c => c.depth === 0 || c.depth === 1)
    : STATIC_CATEGORIES;

  return (
    <section id="kategorije" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
            Pregled kategorija
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Pregledajte ponudu po kategorijama
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayCategories.map((category) => {
            const iconKey = category.iconName || 'archive';
            const Icon = ICON_MAP[iconKey] || Archive;

            return (
              <Link
                key={category.slug}
                href={`/kategorija/${category.slug}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:border-[#c9a227] hover:shadow-md transition-all text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: '#fffdf5' }}
                >
                  <Icon size={22} style={{ color: '#c9a227' }} />
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight" style={{ color: '#1a1a2e' }}>
                    {category.name}
                  </div>
                  {category.productCount !== undefined && category.productCount > 0 && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      {category.productCount} predmeta
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/#ponuda"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-2 transition-all hover:bg-amber-50"
            style={{ borderColor: '#c9a227', color: '#c9a227' }}
          >
            Vidi svu ponudu →
          </Link>
        </div>
      </div>
    </section>
  );
}
