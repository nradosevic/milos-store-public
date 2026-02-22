import { Testimonial } from '@/app/lib/types';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { id: '1', text: 'Sve je stiglo brzo i savršeno zapakovano. Odličan prodavac!', authorName: 'Marko', source: 'KupujemProdajem', isActive: true, sortOrder: 1 },
  { id: '2', text: 'Knjiga je tačno kao na slikama, odličan prodavac. Preporučujem svima.', authorName: 'Jelena', source: 'KupujemProdajem', isActive: true, sortOrder: 2 },
  { id: '3', text: 'Retka markica u odličnom stanju, hvala! Sve pohvale.', authorName: 'Nikola', source: 'KupujemProdajem', isActive: true, sortOrder: 3 },
  { id: '4', text: 'Profesionalan pristup, brza komunikacija i pažljivo pakovanje.', authorName: 'Ana', source: 'KupujemProdajem', isActive: true, sortOrder: 4 },
  { id: '5', text: 'Sat je u boljem stanju nego što sam očekivao. Definitivno ću kupovati ponovo.', authorName: 'Stefan', source: 'KupujemProdajem', isActive: true, sortOrder: 5 },
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <section id="iskustva" className="py-16 sm:py-20" style={{ backgroundColor: '#f8f8f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
            Iskustva kupaca
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Šta kažu kupci koji su već kupili od Miloša
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col gap-3"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-700 leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: '#c9a227' }}
                >
                  {testimonial.authorName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: '#1a1a2e' }}>
                    {testimonial.authorName}
                  </div>
                  {testimonial.source && (
                    <div className="text-xs text-gray-400">{testimonial.source}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary badge */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm">
            <span className="text-2xl font-extrabold" style={{ color: '#c9a227' }}>1.279</span>
            <div className="text-left">
              <div className="text-sm font-semibold" style={{ color: '#1a1a2e' }}>pozitivnih ocena</div>
              <div className="text-xs text-gray-500">0 negativnih na KupujemProdajem</div>
            </div>
            <div className="flex gap-0.5 pl-2 border-l border-gray-200">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-amber-400">★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
