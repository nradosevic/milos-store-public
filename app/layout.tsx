import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import FloatingContactBar from '@/app/components/layout/FloatingContactBar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rariteti.rs'),
  title: {
    default: 'Rariteti.rs — Retke knjige, markice i kolekcionarski predmeti | Beograd',
    template: '%s | Rariteti.rs',
  },
  description:
    'Preko 15.000 retkih i kolekcionarskih predmeta: knjige, markice, satovi, nakit, dokumenti. Proveren prodavac sa 1.279 pozitivnih ocena. Besplatna dostava za veće narudžbine.',
  keywords: [
    'retke knjige', 'kolekcionarski predmeti', 'markice SFRJ', 'stari satovi',
    'antikviteti Beograd', 'kolekcionarstvo', 'stare knjige prodaja', 'Rariteti',
  ],
  authors: [{ name: 'Miloš Dimitrijević' }],
  creator: 'Rariteti.rs',
  publisher: 'Rariteti.rs',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://rariteti.rs',
    languages: { 'sr-Latn': 'https://rariteti.rs' },
  },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: 'https://rariteti.rs',
    siteName: 'Rariteti.rs',
    title: 'Rariteti.rs — Retke knjige, markice i kolekcionarski predmeti',
    description: 'Preko 15.000 retkih i kolekcionarskih predmeta direktno od proverenog prodavca sa 1.279 pozitivnih ocena.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rariteti.rs — Kolekcionarski predmeti',
    description: 'Retke knjige, markice, satovi i kolekcionarski predmeti iz Beograda.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a1a2e" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased font-sans" style={{ backgroundColor: '#f8f8f6', color: '#2d2d2d' }}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContactBar />
      </body>
    </html>
  );
}
