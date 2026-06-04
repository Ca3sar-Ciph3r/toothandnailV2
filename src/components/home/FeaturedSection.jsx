import Image from 'next/image';

export default function FeaturedSection() {
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2" id="featured">

      {/* ── Left: Featured Artist ── */}
      <div
        className="relative flex flex-col justify-end px-10 md:px-14 py-16 md:py-20 overflow-hidden min-h-[420px]"
        style={{ background: 'linear-gradient(160deg,#0a0a0a 0%,#111 100%)' }}
      >
        {/* Background artist image with overlay */}
        <Image
          src="/featured-artist-bg.jpg"
          alt="Featured Artist"
          fill
          sizes="50vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10">
          <p
            className="text-white/50 uppercase mb-3"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.22em',
            }}
          >
            Black &amp; Grey&nbsp;·&nbsp;Fine Line&nbsp;·&nbsp;Realism
          </p>
          <p
            className="text-red-500 uppercase mb-2"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '0.3em',
            }}
          >
            Featured Artist
          </p>
          <h2
            className="text-white uppercase leading-none mb-4"
            style={{
              fontFamily: 'var(--font-oswald), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 4vw, 56px)',
              letterSpacing: '0.06em',
            }}
          >
            Coming<br />Soon
          </h2>
          <div className="w-10 h-px bg-white/20 mb-5" />
          <p
            className="text-zinc-400 leading-relaxed max-w-xs mb-7"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px' }}
          >
            We&apos;re curating our roster of elite artists. Each bringing a unique mastery of their craft.
          </p>
          <a
            href="/artists"
            className="inline-flex items-center gap-2 group"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'white',
              borderBottom: '1px solid rgba(255,255,255,0.25)',
              paddingBottom: '2px',
            }}
          >
            View All Artists
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>

      {/* ── Right: Shop CTA ── */}
      <div
        className="relative flex flex-col justify-end px-10 md:px-14 py-16 md:py-20 overflow-hidden min-h-[420px]"
        style={{ background: '#f2ece0' }}
      >
        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg,#1a1a1a,#1a1a1a 1px,transparent 1px,transparent 18px)',
          }}
        />

        <div className="relative z-10">
          <p
            className="text-[#8a7a6a] uppercase mb-3"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.35em',
            }}
          >
            — Studio Shop
          </p>
          <h2
            className="text-[#1a1a1a] uppercase leading-none mb-4"
            style={{
              fontFamily: 'var(--font-oswald), sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 4vw, 56px)',
              letterSpacing: '0.06em',
            }}
          >
            Shop Aftercare,<br />Apparel &amp;<br />More Online
          </h2>
          <div className="w-10 h-px bg-[#1a1a1a]/20 mb-5" />
          <p
            className="text-[#5a4e42] leading-relaxed max-w-xs mb-7"
            style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px' }}
          >
            Everything you need to care for your new ink and wear your love of the craft.
          </p>
          <a
            href="#shop"
            className="inline-flex items-center gap-2 group"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              borderBottom: '1px solid rgba(26,26,26,0.3)',
              paddingBottom: '2px',
            }}
          >
            Visit Our Online Store
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
