'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaqItem } from '@/app/lib/types';

const FALLBACK_FAQ: FaqItem[] = [
  {
    id: '1',
    question: 'Kako šaljete predmete?',
    answer: 'Šaljem PostExpress-om ili preporučenim pismom, u zavisnosti od veličine i vrednosti predmeta. Za vrednije artikle koristim dodatno osiguranje pošiljke. Moguće je i lično preuzimanje u Beogradu (Savski venac) uz prethodni dogovor.',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: '2',
    question: 'Da li mogu da dobijem dodatne fotografije?',
    answer: 'Naravno! Za svaki artikal mogu poslati dodatne fotografije iz bilo kog ugla. Javite se putem WhatsApp-a ili e-maila sa nazivom predmeta koji vas zanima.',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: '3',
    question: 'Da li primate povraćaj robe?',
    answer: 'Svaki predmet je detaljno opisan i fotografisan, tako da kupujete tačno ono što vidite. U slučaju da artikal ne odgovara opisu, naravno da je moguć povraćaj u roku od 14 dana.',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: '4',
    question: 'Kako znam da je predmet originalan?',
    answer: 'Sa više od 10 godina iskustva u kolekcionarstvu, garantujem autentičnost svakog predmeta. Detaljno opisujem sve karakteristike, eventualna oštećenja i poreklo. Moja ocena od 5.0 sa preko 1.200 prodaja govori sama za sebe.',
    sortOrder: 4,
    isActive: true,
  },
  {
    id: '5',
    question: 'Da li je moguć dogovor oko cene?',
    answer: 'Za pojedinačne predmete cena je uglavnom fiksna, ali za veće narudžbine (više artikala odjednom) uvek se možemo dogovoriti oko popusta. Slobodno pošaljite upit.',
    sortOrder: 5,
    isActive: true,
  },
];

interface FaqSectionProps {
  items?: FaqItem[];
}

export default function FaqSection({ items }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const faqItems = items && items.length > 0 ? items : FALLBACK_FAQ;

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
            Česta pitanja
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Odgovori na najčešća pitanja kupaca
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-sm pr-4" style={{ color: '#1a1a2e' }}>
                  {item.question}
                </span>
                {openId === item.id ? (
                  <ChevronUp size={16} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400 shrink-0" />
                )}
              </button>

              {openId === item.id && (
                <div className="px-5 pb-4 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed pt-3">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
