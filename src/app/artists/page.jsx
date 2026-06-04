import fs   from 'fs';
import path from 'path';
import Image from 'next/image';
import SiteNav    from '@/components/home/SiteNav';
import SiteFooter from '@/components/home/SiteFooter';

export const metadata = {
  title: 'Artists — Tooth & Nail Studio',
  description: 'Ethan Gunn — tattoo artist, piercer, and tooth gem specialist at Tooth & Nail Studio.',
};

/* ─── gallery helpers ───────────────────────────────────────────────────── */

function getImages(artistName, category) {
  const dir = path.join(process.cwd(), 'public', 'gallery', artistName, category);
  try {
    return fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|webp|png)$/i.test(f))
      .map(f =>
        `/gallery/${encodeURIComponent(artistName)}/${encodeURIComponent(category)}/${encodeURIComponent(f)}`
      );
  } catch {
    return [];
  }
}

/* ─── category masonry section ──────────────────────────────────────────── */

function CategorySection({ n, label, images }) {
  if (!images.length) return null;
  const cols = images.length <= 4
    ? 'columns-2 sm:columns-3'
    : images.length <= 12
      ? 'columns-2 sm:columns-3 lg:columns-3'
      : 'columns-2 sm:columns-3 lg:columns-4';

  return (
    <div className="border-t border-zinc-900">
      {/* Category header */}
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

      {/* Masonry grid */}
      <div
        className={`${cols} px-6 md:px-12 lg:px-16 pb-20`}
        style={{ columnGap: '6px' }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="break-inside-avoid overflow-hidden group"
            style={{ marginBottom: '6px' }}
          >
            <Image
              src={src}
              alt={`${label} work by Ethan Gunn`}
              width={900}
              height={1125}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={n === 1 && i < 8}
              className="transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── artist intro cards ────────────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}

/* ─── page ──────────────────────────────────────────────────────────────── */

export default function ArtistsPage() {
  const tattoos   = getImages('Ethan', 'Tattoos');
  const piercings = getImages('Ethan', 'Piercings');
  const toothGems = getImages('Ethan', 'Tooth Gems');

  return (
    <>
      <SiteNav />
      <main style={{ background: '#0a0a0a' }}>

        {/* ── Hero ── */}
        <section
          className="relative w-full flex items-end overflow-hidden"
          style={{ minHeight: 'clamp(300px,40vw,480px)', background: '#0a0a0a' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <span
              className="text-white/[0.025] leading-none uppercase"
              style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(80px,18vw,220px)', letterSpacing: '0.08em' }}
            >
              ARTISTS
            </span>
          </div>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 60% 50%,rgba(180,20,20,0.1) 0%,transparent 70%)' }} />
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-14 pt-20">
            <p
              className="text-red-500/60 uppercase mb-4"
              style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
            >
              — Our Roster
            </p>
            <h1
              className="text-white uppercase leading-none"
              style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(44px,7vw,88px)', letterSpacing: '0.06em' }}
            >
              Meet the<br /><span className="text-red-600">Artists</span>
            </h1>
          </div>
        </section>

        {/* ── Artist intro cards ── */}
        <section className="w-full border-t border-zinc-900 py-16">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-900 overflow-hidden">

              {/* Ethan */}
              <div className="bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5">
                <div>
                  <p
                    className="text-red-500/70 uppercase mb-2"
                    style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '0.3em' }}
                  >
                    Tattoo Artist · Piercer · Tooth Gems
                  </p>
                  <h2
                    className="text-white uppercase leading-none"
                    style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(28px,3vw,42px)', letterSpacing: '0.06em' }}
                  >
                    Ethan Gunn
                  </h2>
                </div>
                <p
                  className="text-zinc-500 leading-relaxed"
                  style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '13px', lineHeight: '1.75' }}
                >
                  Ethan brings a meticulous eye for detail to every piece. Specialising in photorealistic black and grey work, his portfolio spans delicate fine line botanicals to full sleeve compositions. Every piece is drawn fresh — he doesn&apos;t re-use designs.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900 mt-auto">
                  <div className="flex gap-2">
                    {[
                      { href: 'https://instagram.com/', icon: <InstagramIcon />, label: 'Instagram' },
                      { href: 'https://tiktok.com/',    icon: <TikTokIcon />,    label: 'TikTok' },
                    ].map(({ href, icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-600 hover:border-zinc-500 hover:text-white transition-all"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                  <a
                    href="#book"
                    className="text-white hover:text-red-400 transition-colors"
                    style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2px' }}
                  >
                    Book Now →
                  </a>
                </div>
              </div>

              {/* Kia */}
              <div className="bg-[#0a0a0a] p-8 md:p-10 flex flex-col gap-5">
                <div>
                  <p
                    className="text-red-500/70 uppercase mb-2"
                    style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontWeight: 600, fontSize: '10px', letterSpacing: '0.3em' }}
                  >
                    Tattoo Artist
                  </p>
                  <h2
                    className="text-white uppercase leading-none"
                    style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(28px,3vw,42px)', letterSpacing: '0.06em' }}
                  >
                    Kia Fenton
                  </h2>
                </div>
                <p
                  className="text-zinc-500 leading-relaxed"
                  style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '13px', lineHeight: '1.75' }}
                >
                  Kia&apos;s bold, colour-rich style draws from illustration and contemporary tattooing. Known for expressive character work, vibrant neo-traditional florals, and deeply personal custom pieces. Her work is as colourful as the clients who wear it.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900 mt-auto">
                  <div className="flex gap-2">
                    {[
                      { href: 'https://instagram.com/', icon: <InstagramIcon />, label: 'Instagram' },
                      { href: 'https://tiktok.com/',    icon: <TikTokIcon />,    label: 'TikTok' },
                    ].map(({ href, icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-600 hover:border-zinc-500 hover:text-white transition-all"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                  <span
                    className="text-zinc-700"
                    style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  >
                    Portfolio coming soon
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Ethan portfolio ── */}
        <section className="w-full">

          {/* Portfolio intro label */}
          <div className="px-6 md:px-12 lg:px-16 pt-20 pb-12">
            <p
              className="text-zinc-700 uppercase mb-4"
              style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '10px', letterSpacing: '0.4em' }}
            >
              — Ethan Gunn
            </p>
            <h2
              className="text-white uppercase leading-none"
              style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(42px,6vw,80px)', letterSpacing: '0.06em' }}
            >
              Portfolio
            </h2>
          </div>

          <CategorySection n={1} label="Tattoos"    images={tattoos}   />
          <CategorySection n={2} label="Piercings"  images={piercings} />
          <CategorySection n={3} label="Tooth Gems" images={toothGems} />

        </section>

        {/* ── Book CTA ── */}
        <section className="w-full py-24 border-t border-zinc-900 text-center">
          <p
            className="text-red-500/60 uppercase mb-5"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontWeight: 400, fontSize: '11px', letterSpacing: '0.4em' }}
          >
            — Ready to Begin?
          </p>
          <h2
            className="text-white uppercase leading-none mb-4"
            style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '0.06em' }}
          >
            Book a Consultation
          </h2>
          <p
            className="text-zinc-500 max-w-sm mx-auto mb-10"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '14px', lineHeight: '1.7' }}
          >
            Free consultations for all custom work. Get in touch and let&apos;s bring your vision to life.
          </p>
          <a
            href="#book"
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
