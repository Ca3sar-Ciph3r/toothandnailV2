import Link from 'next/link';
import SiteNav    from '@/components/home/SiteNav';
import SiteFooter from '@/components/home/SiteFooter';

export const metadata = {
  title: 'Artists — Tooth & Nail Studio',
  description: 'Meet Ethan Gunn and Kia Fenton — the artists behind Tooth & Nail Studio.',
};

const ARTISTS = [
  {
    slug:      'ethan',
    name:      'Ethan Gunn',
    initial:   'EG',
    roles:     ['Tattoo Artist', 'Piercer', 'Tooth Gems'],
    specialty: 'Black & Grey · Fine Line · Realism',
    teaser:    'Photorealistic black and grey work, delicate fine line botanicals, full sleeve compositions — every piece drawn fresh.',
    accent:    'rgba(160,20,20,0.18)',
  },
  {
    slug:      'kia',
    name:      'Kia Fenton',
    initial:   'KF',
    roles:     ['Tattoo Artist'],
    specialty: 'Neo-Traditional · Illustrative · Colour',
    teaser:    'Bold, colour-rich work drawn from illustration and contemporary tattooing. Expressive characters, vibrant florals, deeply personal custom pieces.',
    accent:    'rgba(30,30,120,0.18)',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="20" height="20" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  );
}

export default function ArtistsPage() {
  return (
    <>
      <SiteNav />
      <main style={{ background: '#0a0a0a', minHeight: '100dvh' }}>

        {/* ── Page label ── */}
        <div className="px-6 md:px-12 lg:px-16 pt-20 pb-10 border-b border-zinc-900">
          <p
            className="text-zinc-600 uppercase mb-3"
            style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '10px', letterSpacing: '0.4em' }}
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

        {/* ── Artist panels ── */}
        <div className="flex flex-col md:flex-row" style={{ minHeight: 'clamp(500px,70vh,800px)' }}>
          {ARTISTS.map((artist, idx) => (
            <Link
              key={artist.slug}
              href={`/artists/${artist.slug}`}
              className="group relative flex-1 flex flex-col justify-end overflow-hidden"
              style={{
                borderRight: idx < ARTISTS.length - 1 ? '1px solid #1a1a1a' : undefined,
                borderBottom: '1px solid #1a1a1a',
              }}
            >
              {/* Background radial accent */}
              <div
                className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse 70% 70% at 50% 60%,${artist.accent},transparent)` }}
              />

              {/* Large watermark initial */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
              >
                <span
                  className="leading-none uppercase text-white/[0.03] group-hover:text-white/[0.05] transition-colors duration-700"
                  style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(100px,16vw,200px)', letterSpacing: '0.04em' }}
                >
                  {artist.initial}
                </span>
              </div>

              {/* Index number top-left */}
              <span
                className="absolute top-8 left-8 text-zinc-700"
                style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '11px', letterSpacing: '0.25em' }}
              >
                0{idx + 1}
              </span>

              {/* Content bottom */}
              <div className="relative z-10 p-8 md:p-12">
                {/* Roles */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {artist.roles.map(r => (
                    <span
                      key={r}
                      className="border border-zinc-800 text-zinc-500 group-hover:border-zinc-600 group-hover:text-zinc-400 transition-colors px-2.5 py-1"
                      style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase' }}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h2
                  className="text-white uppercase leading-none mb-3 group-hover:text-zinc-100 transition-colors"
                  style={{ fontFamily: 'var(--font-oswald),sans-serif', fontWeight: 700, fontSize: 'clamp(32px,4vw,56px)', letterSpacing: '0.06em' }}
                >
                  {artist.name}
                </h2>

                {/* Specialty */}
                <p
                  className="text-zinc-600 mb-5 group-hover:text-zinc-500 transition-colors"
                  style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '12px', letterSpacing: '0.08em' }}
                >
                  {artist.specialty}
                </p>

                {/* Teaser — slides up on hover */}
                <p
                  className="text-zinc-500 max-w-sm mb-7 overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100"
                  style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontSize: '13px', lineHeight: '1.7' }}
                >
                  {artist.teaser}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-3 text-zinc-500 group-hover:text-white transition-colors duration-300">
                  <span
                    style={{ fontFamily: 'var(--font-source-sans),sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}
                  >
                    View Portfolio
                  </span>
                  <span className="translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
                    <ArrowIcon />
                  </span>
                </div>
              </div>

              {/* Bottom line that grows on hover */}
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-500 ease-out w-0 group-hover:w-full"
              />
            </Link>
          ))}
        </div>

      </main>
      <SiteFooter />
    </>
  );
}
