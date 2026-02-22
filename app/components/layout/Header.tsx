'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Početna' },
  { href: '/#kategorije', label: 'Kategorije' },
  { href: '/#o-prodavcu', label: 'O prodavcu' },
  { href: '/#kontakt', label: 'Kontakt' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span
              className="text-xl font-black tracking-tight"
              style={{ color: '#1a1a2e' }}
            >
              RARITETI
            </span>
            <span
              className="text-xl font-black tracking-tight"
              style={{ color: '#c9a227' }}
            >
              .rs
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#1a1a2e] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/#kontakt"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#c9a227' }}
            >
              Kontaktiraj prodavca
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-[#1a1a2e] hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#kontakt"
              onClick={() => setMobileOpen(false)}
              className="mt-2 py-3 px-3 text-sm font-semibold text-white text-center rounded-lg"
              style={{ backgroundColor: '#c9a227' }}
            >
              Kontaktiraj prodavca
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
