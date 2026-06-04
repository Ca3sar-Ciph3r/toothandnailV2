'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set(['.hero-tag', '.hero-t1', '.hero-t2', '.hero-divider',
               '.hero-sub', '.hero-tagline', '.hero-scroll', '.hero-corner'], {
      opacity: 0,
    });
    gsap.set(['.hero-t1', '.hero-t2'], { y: 90 });
    gsap.set(['.hero-tag', '.hero-sub', '.hero-tagline', '.hero-scroll'], { y: 22 });
    gsap.set('.hero-divider', { scaleX: 0 });
    gsap.set('.hero-corner', { scale: 0.7 });

    gsap.timeline({ delay: 0.35 })
      .to('.hero-tag', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
      .to('.hero-t1',  { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }, '-=0.3')
      .to('.hero-t2',  { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }, '-=0.75')
      .to('.hero-divider', { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power3.out', transformOrigin: 'center' }, '-=0.5')
      .to('.hero-sub',     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35')
      .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.25')
      .to('.hero-scroll',  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to('.hero-corner',  { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 }, 0.3);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="hero"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden">

      {/* Dot grid texture */}
      <div className="absolute inset-0 hero-grid z-0 pointer-events-none" />

      {/* Radial glow centred behind the title */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_62%,rgba(220,38,38,0.07),transparent_70%)] z-0 pointer-events-none" />

      {/* ── Four corner brackets ── */}
      <div className="hero-corner absolute top-28 left-8 md:left-14 w-5 h-5 border-t border-l border-zinc-700/50 z-10" />
      <div className="hero-corner absolute top-28 right-8 md:right-14 w-5 h-5 border-t border-r border-zinc-700/50 z-10" />
      <div className="hero-corner absolute bottom-16 left-8 md:left-14 w-5 h-5 border-b border-l border-zinc-700/50 z-10" />
      <div className="hero-corner absolute bottom-16 right-8 md:right-14 w-5 h-5 border-b border-r border-zinc-700/50 z-10" />

      {/* ── Left side label ── */}
      <div className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-0 z-10 select-none">
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-zinc-800" />
        <span className="text-[8px] font-mono text-zinc-700 tracking-[0.45em] uppercase rotate-90 whitespace-nowrap my-3">
          Arts District, CA
        </span>
        <div className="w-px h-14 bg-gradient-to-t from-transparent to-zinc-800" />
      </div>

      {/* ── Right side label ── */}
      <div className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-0 z-10 select-none">
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-zinc-800" />
        <span className="text-[8px] font-mono text-zinc-700 tracking-[0.45em] uppercase -rotate-90 whitespace-nowrap my-3">
          By Appointment Only
        </span>
        <div className="w-px h-14 bg-gradient-to-t from-transparent to-zinc-800" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-4">

        {/* EST. tag */}
        <div className="hero-tag flex items-center justify-center gap-3 mb-9">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-700/80" />
          <span className="text-[9px] font-mono text-red-600 tracking-[0.6em] uppercase">Est. 2024</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-700/80" />
        </div>

        {/* TOOTH */}
        <div className="overflow-hidden">
          <h1 className="hero-t1 block text-[20vw] md:text-[16vw] lg:text-[13vw] leading-[0.80]
            font-black uppercase tracking-tighter text-transparent bg-clip-text
            bg-gradient-to-b from-white via-zinc-200 to-zinc-500
            pointer-events-auto select-none">
            Tooth
          </h1>
        </div>

        {/* & NAIL */}
        <div className="overflow-hidden">
          <h1 className="hero-t2 block text-[20vw] md:text-[16vw] lg:text-[13vw] leading-[0.80]
            font-black uppercase tracking-tighter text-transparent bg-clip-text
            bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-700
            pointer-events-auto select-none">
            &amp; Nail
          </h1>
        </div>

        {/* Divider */}
        <div className="hero-divider flex items-center justify-center gap-3 my-7">
          <div className="h-px flex-1 max-w-[56px] bg-gradient-to-r from-transparent to-zinc-700" />
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-red-600" />
            <span className="w-5 h-px bg-red-700/40" />
            <span className="w-1 h-1 rounded-full bg-red-600" />
          </div>
          <div className="h-px flex-1 max-w-[56px] bg-gradient-to-l from-transparent to-zinc-700" />
        </div>

        {/* Subtitle */}
        <p className="hero-sub text-[10px] md:text-[11px] font-mono text-zinc-500
          tracking-[0.55em] uppercase pointer-events-auto">
          Tattoo &amp; Piercing Studio
        </p>

        {/* Tagline */}
        <p className="hero-tagline mt-3 text-[9px] font-mono text-zinc-700 tracking-[0.3em] uppercase">
          Permanent &bull; Visceral &bull; Premium
        </p>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll absolute bottom-10 flex flex-col items-center gap-2.5 z-10 pointer-events-auto">
        <span className="text-[8px] font-mono text-zinc-700 tracking-[0.5em] uppercase">Scroll</span>
        <div className="relative w-px h-11 overflow-hidden bg-zinc-900/80">
          <div className="absolute inset-x-0 top-0 h-full
            bg-gradient-to-b from-transparent via-zinc-500 to-transparent
            animate-scroll-drop" />
        </div>
      </div>
    </section>
  );
}
