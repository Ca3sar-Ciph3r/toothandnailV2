'use client';
import { useState } from 'react';

export default function TopBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="relative bg-[#7b1212] text-white text-center py-2.5 px-4">
      <p className="text-[11px] font-medium tracking-[0.15em] uppercase">
        Book Online &amp; Save — Mention this offer when booking your consultation
        &nbsp;·&nbsp;
        <a href="#book" className="underline underline-offset-2 hover:text-red-200 transition-colors">
          Book Now →
        </a>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-lg leading-none"
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </div>
  );
}
