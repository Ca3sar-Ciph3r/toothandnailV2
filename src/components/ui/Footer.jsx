'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const studioLinks = ['The Ethos', 'Anatomy Matrix', 'Artist Roster', 'Aftercare Guide'];
const policies    = ['18+ ID Required', 'Non-refundable Deposit', '48hr Cancellation Policy', 'Sterile Single-Use Equipment'];
const socials     = ['IG', 'TT', 'X'];

export default function Footer() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.footer-col',
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: {
          trigger: '.footer-grid',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      },
    );
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} id="footer" className="relative border-t border-zinc-900/80">

      {/* ── Marquee banner ── */}
      <div className="overflow-hidden border-b border-zinc-900/60 py-5 select-none">
        <div className="animate-marquee whitespace-nowrap inline-flex">
          {[0, 1].map((n) => (
            <span key={n}
              className="text-[52px] md:text-[68px] font-black tracking-tighter
                text-zinc-900 uppercase">
              Tooth &amp; Nail&ensp;
              <span className="text-red-900/60">•</span>
              &ensp;Premium Studio&ensp;
              <span className="text-red-900/60">•</span>
              &ensp;Tattoo &amp; Piercing&ensp;
              <span className="text-red-900/60">•</span>
              &ensp;By Appointment Only&ensp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-12
        relative z-10 pointer-events-auto">

        <div className="footer-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="footer-col lg:col-span-1">
            <h3 className="text-[28px] font-black tracking-tighter leading-tight mb-4">
              Tooth<br />&amp; Nail
            </h3>
            <div className="h-px w-10 bg-red-700/50 mb-4" />
            <p className="text-zinc-600 text-[12px] font-light leading-relaxed">
              Permanent. Visceral. Premium.
            </p>
            <p className="text-zinc-700 text-[12px] font-light mt-1">
              By appointment only.
            </p>
          </div>

          {/* Studio */}
          <div className="footer-col">
            <h4 className="text-[9px] font-mono text-zinc-600 tracking-[0.45em] uppercase mb-6">
              Studio
            </h4>
            <ul className="space-y-3.5">
              {studioLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-500 text-[13px] hover:text-red-500
                    transition-colors duration-200 group inline-flex items-center gap-2">
                    <span className="w-0 group-hover:w-3 h-px bg-red-600
                      transition-all duration-300 overflow-hidden" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-col">
            <h4 className="text-[9px] font-mono text-zinc-600 tracking-[0.45em] uppercase mb-6">
              Policies
            </h4>
            <ul className="space-y-3.5">
              {policies.map((item) => (
                <li key={item}>
                  <span className="text-zinc-600 text-[12px] font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="text-[9px] font-mono text-zinc-600 tracking-[0.45em] uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-3 mb-7">
              <li className="text-zinc-500 text-[13px]">123 Inkwell Lane</li>
              <li className="text-zinc-500 text-[13px]">Arts District, CA 90013</li>
              <li className="pt-2">
                <a href="mailto:studio@toothandnail.ink"
                  className="text-zinc-500 text-[13px] hover:text-red-500 transition-colors">
                  studio@toothandnail.ink
                </a>
              </li>
              <li>
                <a href="tel:+12135551234"
                  className="text-zinc-500 text-[13px] hover:text-red-500 transition-colors">
                  +1 (213) 555-1234
                </a>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a key={s} href="#"
                  className="w-9 h-9 rounded-full border border-zinc-800 flex items-center
                    justify-center text-zinc-600 text-[10px] font-mono
                    hover:border-red-700/60 hover:text-red-500 hover:bg-red-600/5
                    transition-all duration-200">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row justify-between items-center
          pt-7 border-t border-zinc-900 gap-3">
          <span className="text-[9px] font-mono text-zinc-700 tracking-[0.3em] uppercase">
            &copy; {new Date().getFullYear()} Tooth &amp; Nail Studio. All Rights Reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-zinc-800" />
            <span className="text-[9px] font-mono text-zinc-800 tracking-[0.2em] uppercase">
              Engineered with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
