export const SELLER_INFO = {
  name: 'Miloš Dimitrijević',
  location: 'Beograd, Savski venac',
  platformMemberSince: '22.11.2012',
  platformName: 'KupujemProdajem',
  platformProfileUrl: 'https://www.kupujemprodajem.com',
  positiveRatings: 1279,
  negativeRatings: 0,
  responseRate: '100%',
  responseTime: 'uglavnom u roku od 15 minuta',
  bio: 'Zovem se Miloš i već više od 10 godina sakupljam i prodajem stare knjige, dokumenta, markice, satove i druge retke predmete. Specijalizovan sam za period Jugoslavije, ali u ponudi se nalaze i strani naslovi i predmeti iz raznih oblasti. Svaki artikal detaljno fotografišem i opisujem, a po potrebi šaljem dodatne fotografije i informacije.',
  timeline: [
    { year: '2012', event: 'Početak kolekcionarske prodaje' },
    { year: '2015', event: 'Prva online prodaja na KupujemProdajem platformi' },
    { year: '2020', event: '1.000+ uspešnih isporuka' },
    { year: 'Danas', event: 'Preko 15.000 predmeta u sopstvenoj online prodavnici' },
  ],
  contact: {
    phone: '+381638795504',
    displayPhone: '063 879 5504',
    whatsapp: 'https://wa.me/381638795504',
    viber: 'viber://chat?number=%2B381638795504',
    phoneUrl: 'tel:+381638795504',
    email: 'kontakt@rariteti.rs',
  },
};

export const BRAND_COLORS = {
  primary: '#1a1a2e',
  accent: '#c9a227',
  background: '#f8f8f6',
  text: '#2d2d2d',
};

export const SITE_NAME = 'Rariteti.rs';
export const SITE_DESCRIPTION =
  'Preko 15.000 retkih i kolekcionarskih predmeta: knjige, markice, satovi, nakit, dokumenti. Proveren prodavac sa 1.279 pozitivnih ocena.';

export const CONDITIONS = ['Odlično', 'Vrlo dobro', 'Dobro', 'Prihvatljivo'] as const;

export const CONDITION_SCHEMA_MAP: Record<string, string> = {
  'Odlično': 'https://schema.org/UsedLikeNewCondition',
  'Vrlo dobro': 'https://schema.org/UsedVeryGoodCondition',
  'Dobro': 'https://schema.org/UsedGoodCondition',
  'Prihvatljivo': 'https://schema.org/UsedAcceptableCondition',
};

export const POPULAR_CATEGORY_ICONS: Record<string, string> = {
  'book-open': 'BookOpen',
  'newspaper': 'Newspaper',
  'landmark': 'Landmark',
  'archive': 'Archive',
  'watch': 'Watch',
  'gem': 'Gem',
  'camera': 'Camera',
  'music': 'Music',
  'disc': 'Disc',
  'wrench': 'Wrench',
  'palette': 'Palette',
  'gamepad-2': 'Gamepad2',
  'glasses': 'Glasses',
  'shirt': 'Shirt',
  'briefcase': 'Briefcase',
  'home': 'Home',
  'target': 'Target',
  'trophy': 'Trophy',
  'car': 'Car',
  'settings': 'Settings',
  'smartphone': 'Smartphone',
  'scissors': 'Scissors',
  'graduation-cap': 'GraduationCap',
};
