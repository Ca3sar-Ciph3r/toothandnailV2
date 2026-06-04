'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const artists = [
  {
    name: 'Elena Vasquez',
    title: 'Hyper-Realism & Large Scale Specialist',
    specialties: ['Hyper-Realism', 'Portraits', 'Full Sleeves'],
    experience: '12 years',
    style: 'Known for photorealistic skin textures and cinematic compositions that blur the line between tattoo and fine art.',
    available: true,
    avatarClass: 'avatar-1',
  },
  {
    name: 'Marcus Chen',
    title: 'Traditional & Fine Line Expert',
    specialties: ['American Traditional', 'Fine Line', 'Blackwork'],
    experience: '9 years',
    style: 'Precision linework with a modern brutalist edge. Merges classic Americana iconography with contemporary minimalism.',
    available: true,
    avatarClass: 'avatar-2',
  },
  {
    name: 'Kai Okonkwo',
    title: 'Neo-Japanese & Colour Specialist',
    specialties: ['Neo-Japanese', 'Colour Realism', 'Watercolour'],
    experience: '7 years',
    style: 'Vibrant, flowing compositions that honour traditional Japanese motifs while pushing into experimental colour theory.',
    available: false,
    avatarClass: 'avatar-3',
  },
  {
    name: 'Sable Moreau',
    title: 'Geometric & Ornamental Architect',
    specialties: ['Sacred Geometry', 'Dotwork', 'Ornamental'],
    experience: '10 years',
    style: 'Mathematically precise sacred geometry and meditative dotwork. Every piece is computed, never freehand.',
    available: true,
    avatarClass: 'avatar-4',
  },
];

function ArtistAvatar({ avatarClass }) {
  return (
    <div className={`relative h-52 md:h-60 ${avatarClass} overflow-hidden flex-shrink-0`}>
      {/* Subtle body silhouette */}
      <svg viewBox="0 0 100 130" className="absolute bottom-0 left-1/2 -translate-x-1/2
        w-28 opacity-[0.13] text-white" fill="currentColor" aria-hidden="true">
        {/* Head */}
        <circle cx="50" cy="22" r="16" />
        {/* Torso */}
        <path d="M28 130 C28 82, 72 82, 72 130 Z" />
        {/* Arms */}
        <path d="M28 68 Q16 90 18 108" strokeWidth="10" stroke="currentColor" fill="none" strokeLinecap="round" />
        <path d="M72 68 Q84 90 82 108" strokeWidth="10" stroke="currentColor" fill="none" strokeLinecap="round" />
      </svg>
      {/* Gradient fade to card bg */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/30 to-transparent" />
      {/* Top corner brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/10" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/10" />
    </div>
  );
}

export default function Roster() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.roster-header',
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0,
        duration: 1, ease: 'power4.out',
        scrollTrigger: {
          trigger: '.roster-header',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      },
    );

    gsap.fromTo('.artist-card',
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out', stagger: 0.13,
        scrollTrigger: {
          trigger: '.artist-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="roster"
      className="relative min-h-screen py-32 px-6 md:px-12 lg:px-20">

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 line-h" />

      <div className="max-w-7xl mx-auto relative z-10 pointer-events-auto">

        {/* ── Header ── */}
        <div className="roster-header mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[9px] font-mono text-zinc-700 tracking-[0.3em]">— 03 /</span>
            <span className="text-[9px] font-mono text-red-600/60 tracking-[0.4em] uppercase">The Collective</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-0 justify-between">
            <h2 className="text-[clamp(50px,6.5vw,84px)] font-black tracking-tighter leading-[0.85]">
              Artist<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                Roster
              </span>
            </h2>
            <p className="text-zinc-500 text-[14px] font-light max-w-xs leading-[1.7] lg:text-right pb-2">
              Our algorithmic matching engine pairs your vision with the artist whose
              specialisation and aesthetic best align with your project.
            </p>
          </div>
        </div>

        {/* ── Artist grid ── */}
        <div className="artist-grid grid grid-cols-1 md:grid-cols-2 gap-4">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="artist-card group relative overflow-hidden rounded-2xl
                border border-white/[0.08] bg-white/[0.02]
                hover:border-white/[0.16] hover:bg-white/[0.04]
                transition-all duration-500"
            >
              {/* Photo placeholder */}
              <ArtistAvatar avatarClass={artist.avatarClass} />

              {/* Availability badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2
                glass-card rounded-full px-3 py-1.5 z-10">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  artist.available
                    ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]'
                    : 'bg-zinc-600'
                }`} />
                <span className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase">
                  {artist.available ? 'Accepting' : 'Waitlist'}
                </span>
              </div>

              {/* Card body */}
              <div className="p-6 md:p-8">
                <h3 className="text-[22px] md:text-[25px] font-black tracking-tight mb-1
                  group-hover:text-red-400 transition-colors duration-300">
                  {artist.name}
                </h3>
                <p className="text-[9px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-4">
                  {artist.title}
                </p>

                <div className="h-px w-full bg-gradient-to-r from-white/[0.08] to-transparent mb-4" />

                <p className="text-zinc-400 text-[13px] leading-[1.7] mb-5">{artist.style}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {artist.specialties.map((s) => (
                    <span key={s}
                      className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase
                        px-3 py-1.5 border border-zinc-800 rounded-full
                        hover:border-red-500/40 hover:text-red-400
                        transition-colors cursor-default">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-4
                  border-t border-white/[0.06]">
                  <div>
                    <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase block mb-0.5">
                      Experience
                    </span>
                    <span className="text-[13px] font-bold text-zinc-300">{artist.experience}</span>
                  </div>
                  <button className="text-[9px] font-mono text-red-600/60 tracking-[0.2em]
                    uppercase hover:text-red-400 transition-colors group-hover:text-red-400">
                    View Portfolio →
                  </button>
                </div>
              </div>

              {/* Bottom glow line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-red-600/0 to-transparent
                group-hover:via-red-600/35 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
