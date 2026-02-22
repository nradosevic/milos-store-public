'use client';

import { useState } from 'react';
import { Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { FaWhatsapp, FaViber } from 'react-icons/fa';
import { SELLER_INFO } from '@/app/lib/constants';
import { submitContact } from '@/app/lib/api';

interface ContactSectionProps {
  productTitle?: string;
  productSlug?: string;
}

export default function ContactSection({ productTitle, productSlug }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: productTitle ? `Zdravo, zanima me predmet: ${productTitle}` : '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappLink = productTitle
    ? `https://wa.me/381638795504?text=${encodeURIComponent(`Zdravo, zanima me proizvod: ${productTitle}`)}`
    : SELLER_INFO.contact.whatsapp;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await submitContact({
        ...formData,
        ...(productSlug ? { productSlug, productTitle } : {}),
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Greška pri slanju poruke. Pokušajte ponovo.');
    }
  };

  return (
    <section id="kontakt" className="py-16 sm:py-20" style={{ backgroundColor: '#f8f8f6' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1a1a2e' }}>
            Kontaktiraj prodavca
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Odgovaramo na 100% poruka, uglavnom u roku od 15 minuta
          </p>
        </div>

        {/* Product context badge */}
        {productTitle && (
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-sm">
              <MessageSquare size={14} style={{ color: '#c9a227' }} />
              <span className="text-amber-800">Upit za: <strong>{productTitle}</strong></span>
            </div>
          </div>
        )}

        {/* Contact buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 px-5 py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-95 min-h-[64px]"
            style={{ backgroundColor: '#25D366' }}
          >
            <FaWhatsapp size={24} />
            <div className="text-center sm:text-left">
              <div className="text-sm font-bold">WhatsApp</div>
              <div className="text-xs opacity-90">Pišite nam na WhatsApp</div>
            </div>
          </a>

          {/* Viber */}
          <a
            href={SELLER_INFO.contact.viber}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 px-5 py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-95 min-h-[64px]"
            style={{ backgroundColor: '#7360F2' }}
          >
            <FaViber size={24} />
            <div className="text-center sm:text-left">
              <div className="text-sm font-bold">Viber</div>
              <div className="text-xs opacity-90">Navedite naziv predmeta u poruci</div>
            </div>
          </a>

          {/* Phone */}
          <a
            href={SELLER_INFO.contact.phoneUrl}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 px-5 py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:scale-95 min-h-[64px]"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <Phone size={22} />
            <div className="text-center sm:text-left">
              <div className="text-sm font-bold">Pozovite nas</div>
              <div className="text-xs opacity-90">{SELLER_INFO.contact.displayPhone}</div>
            </div>
          </a>
        </div>

        <p className="text-center text-xs text-gray-500 mb-10">
          Odgovaramo na 100% poruka, uglavnom u roku od 15 minuta
        </p>

        {/* Contact form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h3 className="text-lg font-bold mb-1" style={{ color: '#1a1a2e' }}>
            Pošaljite poruku
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Imate pitanje o nekom predmetu? Pošaljite nam poruku i odgovorićemo vam u najkraćem roku.
          </p>

          {status === 'success' ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle size={20} className="text-green-600 shrink-0" />
              <p className="text-sm text-green-800">
                Hvala! Vaša poruka je poslata. Odgovorićemo vam u najkraćem roku.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Vaše ime <span className="text-gray-400">(opciono)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Opciono"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30 focus:border-[#c9a227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email adresa <span className="text-gray-400">(opciono)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Opciono — za odgovor putem email-a"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30 focus:border-[#c9a227]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Broj telefona <span className="text-gray-400">(opciono)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Opciono — za brži odgovor putem Viber/WhatsApp"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30 focus:border-[#c9a227]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Vaša poruka <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Napišite nam poruku..."
                  rows={4}
                  required
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30 focus:border-[#c9a227] resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={16} className="text-red-600 shrink-0" />
                  <p className="text-xs text-red-700">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !formData.message.trim()}
                className="w-full py-3 px-6 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#c9a227' }}
              >
                {status === 'loading' ? 'Slanje...' : 'Pošaljite poruku'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
