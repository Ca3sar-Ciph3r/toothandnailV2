import fs   from 'fs';
import path from 'path';
import Link  from 'next/link';
import SiteNav    from '@/components/home/SiteNav';
import SiteFooter from '@/components/home/SiteFooter';
import AnimatedGallery from '@/components/gallery/AnimatedGallery';

export const metadata = {
  title: 'Ethan Gunn — Tooth & Nail Studio',
  description: 'Portfolio of Ethan Gunn — tattoo artist, piercer, and tooth gem specialist at Tooth & Nail Studio.',
};

function getImages(category) {
  const dir = path.join(process.cwd(), 'public', 'gallery', 'Ethan', category);
  try {
    return fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|webp|png)$/i.test(f))
      .map(f => `/gallery/Ethan/${encodeURIComponent(category)}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}

function CategorySection({ n, label, images }) {
  if (!images.length) return null;
  return (
    <div className="border-t border-zinc-900">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 pt-16 pb-10 flex items-end justify-between">
        <div>
          <p
            className="text-zinc-700 mb-3"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' }}
          >
            {String(n).padStart(2, '0')} &nbsp;—&nbsp; Ethan Gunn
          </p>
          <h2
            className="text-white uppercase leading-none"
            style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '0.06em' }}
          >
            {label}
          </h2>
        </div>
        <span
          className="text-zinc-700 pb-1"
          style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '11px', letterSpacing: '0.15em' }}
        >
          {images.length}&thinsp;works
        </span>
      </div>

      {/* Animated masonry */}
      <AnimatedGallery images={images} label={label} height="90vh" />

      {/* Bottom spacer */}
      <div style={{ height: 80 }} />
    </div>
  );
}

export default function EthanPage() {
  const tattoos   = getImages('Tattoos');
  const piercings = getImages('Piercings');
  const toothGems = getImages('Tooth Gems');

  return (
    <>
      <SiteNav />
      <main style={{ background: '#0a0a0a' }}>

        {/* ── Back breadcrumb ── */}
        <div className="px-6 md:px-12 lg:px-16 pt-8">
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="16" height="16">
              <path d="M19 12H5M11 6l-6 6 6 6"/>
            </svg>
            All Artists
          </Link>
        </div>

        {/* ── Artist hero ── */}
        <section
          className="relative w-full flex items-end overflow-hidden"
          style={{ minHeight: 'clamp(280px,38vw,460px)' }}
        >
          <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden" aria-hidden="true">
            <span
              className="text-white/[0.025] leading-none uppercase"
              style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(80px,16vw,200px)', letterSpacing: '0.08em' }}
            >
              EG
            </span>
          </div>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 60% 50%,rgba(180,20,20,0.12) 0%,transparent 70%)' }} />
          <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-14 pt-10">
            <p
              className="text-red-500/60 uppercase mb-3"
              style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '10px', letterSpacing: '0.4em' }}
            >
              — Tattoo Artist · Piercer · Tooth Gems
            </p>
            <h1
              className="text-white uppercase leading-none mb-5"
              style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(48px,8vw,100px)', letterSpacing: '0.06em' }}
            >
              Ethan<br /><span className="text-red-600">Gunn</span>
            </h1>
            <p
              className="text-zinc-500 max-w-lg"
              style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '14px', lineHeight: '1.75' }}
            >
              Ethan brings a meticulous eye for detail to every piece. Specialising in photorealistic black and grey work, his portfolio spans delicate fine line botanicals to full sleeve compositions. Every piece is drawn fresh — he doesn&apos;t re-use designs.
            </p>
          </div>
        </section>

        {/* ── Portfolio label ── */}
        <div className="px-6 md:px-12 lg:px-16 pt-16 pb-10 border-t border-zinc-900">
          <p
            className="text-zinc-700 uppercase mb-3"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '10px', letterSpacing: '0.4em' }}
          >
            — Portfolio
          </p>
          <h2
            className="text-white uppercase leading-none"
            style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '0.06em' }}
          >
            Selected Works
          </h2>
        </div>

        <CategorySection n={1} label="Tattoos"    images={tattoos}   />
        <CategorySection n={2} label="Piercings"  images={piercings} />
        <CategorySection n={3} label="Tooth Gems" images={toothGems} />

        {/* ── Book CTA ── */}
        <section className="w-full py-24 border-t border-zinc-900 text-center">
          <p
            className="text-red-500/60 uppercase mb-5"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '11px', letterSpacing: '0.4em' }}
          >
            — Book with Ethan
          </p>
          <h2
            className="text-white uppercase leading-none mb-4"
            style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '0.06em' }}
          >
            Start Your Project
          </h2>
          <p
            className="text-zinc-500 max-w-sm mx-auto mb-10"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '14px', lineHeight: '1.7' }}
          >
            Free consultations for all custom work. Get in touch and let&apos;s bring your vision to life.
          </p>
          <a
            href="/#book"
            className="inline-flex items-center bg-red-600 text-white hover:bg-red-500 transition-colors px-8 py-3.5"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            Book Now
          </a>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
