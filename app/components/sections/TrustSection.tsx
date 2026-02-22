import Image from 'next/image';
import { SELLER_INFO } from '@/app/lib/constants';

const reviewImages = [
  { src: '/images/rating-overview.png', alt: 'KupujemProdajem seller rating overview — 1279 pozitivnih ocena', isTrustHero: true },
  { src: '/images/review-1.png', alt: 'Ocena kupca 1 na KupujemProdajem' },
  { src: '/images/review-2.png', alt: 'Ocena kupca 2 na KupujemProdajem' },
  { src: '/images/review-3.png', alt: 'Ocena kupca 3 na KupujemProdajem' },
  { src: '/images/review-4.png', alt: 'Ocena kupca 4 na KupujemProdajem' },
  { src: '/images/review-5.png', alt: 'Ocena kupca 5 na KupujemProdajem' },
  { src: '/images/review-6.png', alt: 'Ocena kupca 6 na KupujemProdajem' },
  { src: '/images/review-7.png', alt: 'Ocena kupca 7 na KupujemProdajem' },
  { src: '/images/review-8.png', alt: 'Ocena kupca 8 na KupujemProdajem' },
  { src: '/images/review-9.png', alt: 'Ocena kupca 9 na KupujemProdajem' },
];

export default function TrustSection() {
  return (
    <section id="poverenje" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
            Zašto kupci veruju Milošu
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Više od 10 godina pouzdane prodaje na KupujemProdajem platformi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Seller card */}
          <div
            className="rounded-2xl p-6 sm:p-8 border-2 flex flex-col gap-5"
            style={{ borderColor: '#c9a227', backgroundColor: '#fffdf5' }}
          >
            {/* Verified badge */}
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: '#c9a227' }}
              >
                ✔ Proveren prodavac
              </span>
              <span className="text-xs text-gray-500">od 2012. godine</span>
            </div>

            {/* Name & since */}
            <div>
              <h3 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>
                {SELLER_INFO.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {SELLER_INFO.location} · KupujemProdajem od {SELLER_INFO.platformMemberSince}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                <div className="text-2xl font-extrabold" style={{ color: '#c9a227' }}>
                  {SELLER_INFO.positiveRatings}+
                </div>
                <div className="text-xs text-gray-500 mt-1">Uspešnih transakcija</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                <div className="text-2xl font-extrabold" style={{ color: '#1a1a2e' }}>
                  5.0/5
                </div>
                <div className="text-xs text-gray-500 mt-1">Prosečna ocena</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                <div className="text-2xl font-extrabold" style={{ color: '#1a1a2e' }}>
                  {SELLER_INFO.responseRate}
                </div>
                <div className="text-xs text-gray-500 mt-1">Stopa odgovora</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                <div className="text-sm font-bold" style={{ color: '#1a1a2e' }}>
                  15 min
                </div>
                <div className="text-xs text-gray-500 mt-1">Prosečno vreme odgovora</div>
              </div>
            </div>

            {/* Trust text */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs text-green-800 leading-relaxed">
                <strong className="block mb-1">✔ 0 negativnih ocena</strong>
                Svaki predmet je detaljno fotografisan i opisan. U slučaju neslaganja sa opisom, povraćaj je garantovan. Sa 10+ godina iskustva, svaki predmet je autentičan i kao na slikama.
              </p>
            </div>

            <a
              href={SELLER_INFO.platformProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-center py-2.5 px-4 rounded-lg border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#c9a227', color: '#c9a227' }}
            >
              Pogledaj profil na KupujemProdajem →
            </a>
          </div>

          {/* Review screenshots grid */}
          <div className="flex flex-col gap-4">
            {/* Trust hero image */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="relative w-full" style={{ aspectRatio: '16/7' }}>
                <Image
                  src={reviewImages[0].src}
                  alt={reviewImages[0].alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <p className="text-xs text-gray-400 text-center py-2 bg-gray-50 border-t border-gray-100">
                Screenshot ocena sa KupujemProdajem platforme
              </p>
            </div>

            {/* Review grid */}
            <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-64">
              {reviewImages.slice(1).map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <div className="relative w-full" style={{ aspectRatio: '1' }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 15vw"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center">
              Screenshot ocena sa KupujemProdajem platforme
            </p>
          </div>
        </div>

        {/* Credibility paragraph */}
        <div className="mt-10 max-w-3xl mx-auto text-center">
          <p className="text-sm text-gray-600 leading-relaxed">
            Miloš je aktivan prodavac na KupujemProdajem platformi od 2012. godine sa{' '}
            <strong>{SELLER_INFO.positiveRatings} pozitivnih</strong> i{' '}
            <strong>0 negativnih ocena</strong>. Svaki predmet je lično pregledan, detaljno fotografisan
            i opisan. Poverenje kupaca je izgrađeno godinama doslednog i transparentnog poslovanja.
          </p>
        </div>
      </div>
    </section>
  );
}
