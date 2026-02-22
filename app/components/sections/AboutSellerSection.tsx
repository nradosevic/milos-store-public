import { SELLER_INFO } from '@/app/lib/constants';

export default function AboutSellerSection() {
  return (
    <section id="o-prodavcu" className="py-16 sm:py-20" style={{ backgroundColor: '#f8f8f6' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
            O prodavcu
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Bio */}
          <div>
            {/* Avatar placeholder */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0"
                style={{ backgroundColor: '#c9a227' }}
              >
                MD
              </div>
              <div>
                <div className="font-bold text-lg" style={{ color: '#1a1a2e' }}>
                  {SELLER_INFO.name}
                </div>
                <div className="text-sm text-gray-500">{SELLER_INFO.location}</div>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {SELLER_INFO.bio}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                Stare knjige
              </span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                Poštanske markice
              </span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                Satovi
              </span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                Dokumenti
              </span>
              <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                Jugoslavija
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-base font-semibold mb-6" style={{ color: '#1a1a2e' }}>
              Moja kolekcionarska priča
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-4 top-2 bottom-2 w-0.5"
                style={{ backgroundColor: '#c9a227', opacity: 0.3 }}
              />

              <div className="space-y-6">
                {SELLER_INFO.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start relative">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 text-white text-xs font-bold"
                      style={{ backgroundColor: '#c9a227' }}
                    >
                      {idx + 1}
                    </div>
                    <div className="pt-1">
                      <div className="text-sm font-bold" style={{ color: '#1a1a2e' }}>
                        {item.year}
                      </div>
                      <div className="text-sm text-gray-600 mt-0.5">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
