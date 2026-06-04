'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    id: 0,
    image: '/hero-arm-tattoo.jpg',
    title: 'TATTOO\nSTUDIOS',
    subtitle:
      'Transform your ideas into exquisite ink. Each of our tattoo studios houses an impressive roster of professional tattoo artists, each with their own unique style and approach.',
    cta: 'VIEW TATTOO STUDIO LOCATIONS',
    ctaHref: '/tattoos',
  },
  {
    id: 1,
    image: '/hero-piercing.jpg',
    title: 'PIERCING\nSERVICES',
    subtitle:
      'Express yourself with professional body piercings. Our trusted professional piercers follow the highest standards of care for a flawless finish.',
    cta: 'LEARN MORE ABOUT OUR PIERCING SERVICES',
    ctaHref: '/piercings',
  },
  {
    id: 2,
    image: '/hero-neck-tattoo.jpg',
    title: 'SHOP\nONLINE',
    subtitle:
      'Browse our curated collection of body jewelry and aftercare products. Shop online for all your tattoo and body piercing needs.',
    cta: 'SHOP BODY JEWELRY AND AFTERCARE',
    ctaHref: '#shop',
  },
];

const LOCATIONS = ['Arts District', 'East Side', 'City Studio', 'By Appointment Only'];
const INTERVAL = 5500;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, INTERVAL);
  }, []);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    resetTimer();
    setTimeout(() => setAnimating(false), 700);
  }, [animating, resetTimer]);

  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);
  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '92vh', minHeight: 500 }}>

      {/* ── Slide backgrounds ── */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: 'none' }}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/58" />
        </div>
      ))}

      {/* ── Vertical locations strip — left (Source Sans 3 Regular, 13px per inspector) ── */}
      <div className="absolute left-0 top-0 bottom-0 z-20 hidden lg:flex flex-col justify-center pl-[18px] pr-2">
        <p
          className="text-white/45 select-none whitespace-nowrap"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--font-source-sans), sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '19px',
            letterSpacing: '0px',
          }}
        >
          {LOCATIONS.join('  •  ')}
        </p>
      </div>

      {/* ── Prev arrow — left side ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-10 top-1/2 -translate-y-1/2 z-30 hidden lg:flex w-12 h-12 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-200"
        style={{ background: 'rgba(80,80,80,0.65)', backdropFilter: 'blur(6px)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* ── Next arrow — right side ── */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-10 top-1/2 -translate-y-1/2 z-30 hidden lg:flex w-12 h-12 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-200"
        style={{ background: 'rgba(80,80,80,0.65)', backdropFilter: 'blur(6px)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* ── Social icons + lines — right edge ── */}
      <div className="absolute right-0 top-0 bottom-0 z-20 hidden lg:flex flex-col items-center justify-center px-4">
        <div className="w-px bg-white/30" style={{ height: 70 }} />
        <div className="flex flex-col items-center gap-[18px] py-5">
          <a href="#" aria-label="Instagram" className="text-white/55 hover:text-white transition-colors">
            <InstagramIcon />
          </a>
          <a href="#" aria-label="Facebook" className="text-white/55 hover:text-white transition-colors">
            <FacebookIcon />
          </a>
          <a href="#" aria-label="TikTok" className="text-white/55 hover:text-white transition-colors">
            <TikTokIcon />
          </a>
        </div>
        <div className="w-px bg-white/30" style={{ height: 70 }} />
      </div>

      {/* ── Centre content ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8">
        <div
          key={current}
          className="flex flex-col items-center"
          style={{ animation: 'heroFadeIn 0.55s ease' }}
        >
          {/* Title — Oswald Medium, 54px, 20px letter-spacing (per inspector) */}
          <h1
            className="text-white uppercase mb-5"
            style={{
              fontFamily: 'var(--font-oswald), sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(32px, 5.5vw, 54px)',
              lineHeight: 1.01,
              letterSpacing: '20px',
              /* Compensate for letter-spacing trailing gap on last char */
              marginRight: '-20px',
            }}
          >
            {slide.title}
          </h1>

          {/* Subtitle — Source Sans 3 Regular, 16px, line-height 24.1px (per inspector) */}
          <p
            className="text-white max-w-[680px] mb-8"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24.1px',
              letterSpacing: '0px',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255,255,255,0.4)',
              textUnderlineOffset: '3px',
            }}
          >
            {slide.subtitle}
          </p>

          {/* CTA — Source Sans 3 Semi-bold, 17px, #000 on white (per inspector) */}
          <a
            href={slide.ctaHref}
            className="inline-flex items-center bg-white border border-white hover:bg-transparent hover:text-white transition-all duration-300"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 600,
              fontSize: '17px',
              lineHeight: '24.8px',
              letterSpacing: '0px',
              color: '#000000',
              padding: '12px 28px',
            }}
          >
            {slide.cta}
          </a>
        </div>
      </div>

      {/* ── Dot indicators — bottom centre ── */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex items-center gap-[10px]">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.28)',
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div
          key={current}
          className="h-full bg-white/50"
          style={{ animation: `heroProgress ${INTERVAL}ms linear` }}
        />
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
