'use client';

import { Phone } from 'lucide-react';
import { FaWhatsapp, FaViber } from 'react-icons/fa';
import { SELLER_INFO } from '@/app/lib/constants';

export default function FloatingContactBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
      <div className="flex items-stretch">
        <a
          href={SELLER_INFO.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] active:bg-green-50 transition-colors"
          aria-label="Kontaktirajte putem WhatsApp"
        >
          <FaWhatsapp size={22} style={{ color: '#25D366' }} />
          <span className="text-[10px] font-medium text-gray-600">WhatsApp</span>
        </a>

        <a
          href={SELLER_INFO.contact.viber}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] border-l border-r border-gray-100 active:bg-purple-50 transition-colors"
          aria-label="Kontaktirajte putem Viber"
        >
          <FaViber size={22} style={{ color: '#7360F2' }} />
          <span className="text-[10px] font-medium text-gray-600">Viber</span>
        </a>

        <a
          href={SELLER_INFO.contact.phoneUrl}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] active:bg-gray-50 transition-colors"
          aria-label="Pozovite prodavca"
        >
          <Phone size={20} style={{ color: '#1a1a2e' }} />
          <span className="text-[10px] font-medium text-gray-600">Pozovite</span>
        </a>
      </div>
    </div>
  );
}
