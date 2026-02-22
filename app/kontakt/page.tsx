import type { Metadata } from 'next';
import ContactSection from '@/app/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktirajte prodavca Miloša putem WhatsApp, Viber ili telefona. Odgovaramo u roku od 15 minuta.',
  alternates: { canonical: 'https://rariteti.rs/kontakt' },
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#f8f8f6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
          Kontakt
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          Slobodno nas kontaktirajte sa bilo kakvim pitanjem o ponudi.
        </p>
      </div>
      <ContactSection />
    </div>
  );
}
