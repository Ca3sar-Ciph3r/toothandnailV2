'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '12K+', label: 'Pieces Completed', num: 12000 },
  { value: '99%',  label: 'Client Satisfaction', num: 99 },
  { value: '8+',   label: 'Years of Craft', num: 8 },
  { value: '6',    label: 'Resident Artists', num: 6 },
];

export default function Ethos() {
  const containerRef = useRef(null);

  useGSAP(() => {
    /* Left column stagger */
    gsap.fromTo('.ethos-left > *',
      { opacity: 0, y: 52 },
      {
        opacity: 1, y: 0,
        duration: 1, ease: 'power4.out', stagger: 0.11,
        scrollTrigger: {
          trigger: '.ethos-left',
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      },
    );

    /* Stat cards stagger */
    gsap.fromTo('.stat-card',
      { opacity: 0, y: 44, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, ease: 'power3.out', stagger: 0.10,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    );

    /* Number counters */
    stats.forEach((stat, i) => {
      const el = containerRef.current?.querySelector(`[data-stat="${i}"]`);
      if (!el) return;
      const isLarge = stat.num >= 1000;
      const end = isLarge ? stat.num / 1000 : stat.num;
      const proxy = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(proxy, {
            val: end,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() {
              const v = Math.round(proxy.val);
              if (isLarge)  el.textContent = v + 'K+';
              else if (stat.value.endsWith('%')) el.textContent = v + '%';
              else if (stat.value.endsWith('+')) el.textContent = v + '+';
              else el.textContent = v;
            },
          });
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="ethos"
      className="relative min-h-screen flex items-center py-32 px-6 md:px-12 lg:px-20 scan-lines noise-overlay">

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 line-h" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2
        gap-20 lg:gap-28 items-center">

        {/* ── Left: text ── */}
        <div className="ethos-left pointer-events-auto relative z-10 flex flex-col gap-0">

          {/* Section ID */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[9px] font-mono text-zinc-700 tracking-[0.3em]">— 01 /</span>
            <span className="text-[9px] font-mono text-red-600/60 tracking-[0.4em] uppercase">The Ethos</span>
          </div>

          <h2 className="text-[clamp(42px,5.5vw,70px)] font-black tracking-tighter leading-[0.88] mb-8">
            Where Skin<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Meets Craft
            </span>
          </h2>

          <p className="text-zinc-400 text-[16px] leading-[1.72] font-light max-w-lg mb-5">
            Tooth &amp; Nail operates at the intersection of fine art and body modification.
            Every session is a private, sterile, appointment-only consultation — no walk-ins,
            no compromises. Our artists don&apos;t just tattoo; they architect permanent visual
            identities on living canvases.
          </p>

          <p className="text-zinc-600 text-[14px] leading-[1.7] font-light max-w-lg mb-12">
            We work exclusively with medical-grade equipment, custom-mixed pigments,
            and single-use needle cartridges. Your body is the medium. We treat it with
            the reverence it demands.
          </p>

          {/* CTA */}
          <a
            href="#matrix"
            className="self-start inline-flex items-center gap-3 bg-red-600 hover:bg-red-500
              text-white font-bold uppercase text-[10px] tracking-[0.25em] px-7 py-4
              rounded-full transition-all duration-300
              shadow-[0_0_24px_rgba(220,38,38,0.22)]
              hover:shadow-[0_0_42px_rgba(220,38,38,0.45)]
              active:scale-[0.97]"
          >
            <span>Explore the Matrix</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* ── Right: stats ── */}
        <div className="stats-grid grid grid-cols-2 gap-3 pointer-events-auto relative z-10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card glass-card-bright rounded-2xl p-7 flex flex-col
                items-start group hover:bg-white/[0.07] transition-all duration-500
                relative overflow-hidden"
            >
              {/* Hover red tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-transparent
                group-hover:from-red-600/[0.04] transition-all duration-500 rounded-2xl" />

              <span
                data-stat={i}
                className="text-[42px] md:text-[50px] font-black text-white
                  group-hover:text-red-400 transition-colors duration-500
                  leading-none mb-3 relative z-10 tabular-nums"
              >
                {stat.value}
              </span>
              <span className="text-[9px] font-mono text-zinc-600 tracking-[0.25em]
                uppercase relative z-10">
                {stat.label}
              </span>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-red-600/0 to-transparent
                group-hover:via-red-600/40 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
