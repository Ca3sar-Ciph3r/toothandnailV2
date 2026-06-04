'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Spotlight } from '@/components/ui/spotlight';
import MatrixScene from '@/components/canvas/MatrixScene';

gsap.registerPlugin(ScrollTrigger);

export default function MatrixIntro() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.matrix-item',
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0,
        duration: 1, ease: 'power4.out', stagger: 0.10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      },
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="matrix"
      /* Dark card background — bg-black/[0.96] matches the Spline demo aesthetic */
      className="relative w-full min-h-screen bg-black/[0.96] overflow-hidden"
    >
      {/* ── Aceternity Spotlight — red to match brand ── */}
      <Spotlight
        className="-top-40 left-0 md:left-40 md:-top-20"
        fill="#dc2626"
      />

      {/* Subtle dot-grid texture layer */}
      <div className="absolute inset-0 hero-grid opacity-60 pointer-events-none z-0" />

      {/* Top + bottom border rules */}
      <div className="absolute top-0 left-0 right-0 line-h z-10" />
      <div className="absolute bottom-0 left-0 right-0 line-h z-10" />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">

        {/* ── LEFT: text + controls ── */}
        <div className="flex-1 md:max-w-[50%] flex flex-col justify-center
          px-8 md:px-12 lg:px-20 py-24 md:py-20">

          {/* Section ID */}
          <div className="matrix-item flex items-center gap-3 mb-8">
            <span className="text-[9px] font-mono text-zinc-700 tracking-[0.3em]">— 02 /</span>
            <span className="text-[9px] font-mono text-red-600/60 tracking-[0.4em] uppercase">
              Interactive Console
            </span>
          </div>

          {/* Title */}
          <div className="matrix-item">
            <h2 className="text-[clamp(40px,4.5vw,68px)] font-black tracking-tighter
              leading-[0.85] mb-8">
              The Anatomy<br />
              <span className="text-transparent bg-clip-text
                bg-gradient-to-r from-red-500 to-red-700">
                Matrix
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="matrix-item text-zinc-400 text-[15px] md:text-[16px]
            leading-[1.72] font-light max-w-md mb-10">
            Interact directly with the 3D model. Select a body zone to initialise
            the algorithmic quotation engine. Our AI-powered system will analyse
            placement difficulty, style complexity, and match you with the perfect artist.
          </p>

          {/* Instruction pills */}
          <div className="matrix-item flex flex-col gap-3 mb-10">
            <div className="glass-card-bright inline-flex items-center gap-3
              rounded-xl px-5 py-3.5 self-start">
              <div className="relative flex-shrink-0 w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-red-500" />
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping-pulse" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                <span className="text-red-400">Hover</span> — Pain index overlay
              </span>
            </div>

            <div className="glass-card-bright inline-flex items-center gap-3
              rounded-xl px-5 py-3.5 self-start">
              <span className="w-2.5 h-2.5 rounded-full bg-white/50 flex-shrink-0" />
              <span className="text-[11px] font-mono text-zinc-400">
                <span className="text-zinc-200">Click</span> — Initialise quotation
              </span>
            </div>
          </div>

          {/* System status pill */}
          <div className="matrix-item">
            <div className="glass-card-bright inline-flex items-center gap-3
              rounded-full px-5 py-2.5">
              <div className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full
                  rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </div>
              <span className="text-[9px] font-mono text-zinc-600 tracking-[0.35em] uppercase">
                System Online — Raycasting Active
              </span>
            </div>
          </div>

          {/* HUD corner decorations */}
          <div className="absolute top-8 left-8 w-5 h-5 border-t border-l border-zinc-800/70" />
          <div className="absolute bottom-8 left-8 w-5 h-5 border-b border-l border-zinc-800/70" />
        </div>

        {/* ── RIGHT: Three.js anatomy model ── */}
        <div className="flex-1 relative min-h-[420px] md:min-h-0">
          {/* Gradient fade from left panel into the canvas */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10
            bg-gradient-to-r from-black/[0.96] to-transparent pointer-events-none" />

          {/* Canvas fills the entire right panel */}
          <div className="absolute inset-0">
            <MatrixScene />
          </div>

          {/* Right-side HUD brackets */}
          <div className="absolute top-8 right-8 w-5 h-5 border-t border-r border-zinc-800/70 z-20" />
          <div className="absolute bottom-8 right-8 w-5 h-5 border-b border-r border-zinc-800/70 z-20" />
        </div>
      </div>
    </section>
  );
}
