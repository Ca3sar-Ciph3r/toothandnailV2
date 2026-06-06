'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { label: 'Tattoos',   href: '/tattoos'   },
  { label: 'Piercings', href: '/piercings' },
  { label: 'Artists',   href: '/artists'   },
  { label: 'FAQ',       href: '/faq'       },
  { label: 'Blog',      href: '/blog'      },
  { label: 'About',     href: '/#about'    },
  { label: 'Contact',   href: '/#contact'  },
];

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setOpen: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-black/98 shadow-xl shadow-black/50' : 'bg-black'
      } border-b border-white/[0.06]`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center h-[72px] relative">

        {/* ── Logo ── */}
        <Link href="/" className="flex-shrink-0 flex items-center group z-10">
          <div className="flex items-center justify-center w-12 h-12 border-2 border-white/80 group-hover:border-red-500 transition-colors">
            <span
              className="text-[22px] font-black text-white leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              TN
            </span>
          </div>
        </Link>

        {/* ── Desktop nav — absolutely centred ── */}
        <ul className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-[11px] font-semibold text-white/80 tracking-[0.12em] uppercase hover:text-white transition-colors duration-200 relative group"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right actions ── */}
        <div className="ml-auto flex items-center gap-5 z-10">
          {/* Shop Online */}
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-[11px] font-bold text-white tracking-[0.18em] uppercase hover:text-red-400 transition-colors"
          >
            <CartIcon />
            <span>Shop Online</span>
          </Link>

          {/* Cart button */}
          <button
            onClick={() => openCart(true)}
            className="hidden md:flex items-center justify-center relative text-white/60 hover:text-white transition-colors"
            aria-label="Open cart"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* Search */}
          <button
            className="hidden md:flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          {/* Book CTA (mobile + desktop) */}
          <a
            href="#book"
            className="hidden sm:inline-flex items-center text-[10px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 border border-white/50 text-white hover:bg-white hover:text-black transition-all duration-200"
          >
            Book Now
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="lg:hidden bg-black border-t border-zinc-800 px-6 py-6">
          <ul className="space-y-4 mb-6">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[13px] font-medium text-zinc-300 tracking-[0.12em] uppercase hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-[11px] font-bold text-white/60 tracking-[0.15em] uppercase hover:text-white transition-colors"
          >
            <CartIcon /> Shop Online
          </Link>
        </div>
      )}
    </nav>
  );
}
