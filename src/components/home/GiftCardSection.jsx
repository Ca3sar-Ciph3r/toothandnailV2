import Image from 'next/image';

export default function GiftCardSection() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2" id="gift">

      {/* ── Left: Text panel ── */}
      <div
        className="flex flex-col justify-center px-10 md:px-16 py-20"
        style={{ background: 'linear-gradient(135deg,#0a0a0a 0%,#141414 100%)' }}
      >
        <p
          className="text-red-500/60 uppercase mb-5"
          style={{
            fontFamily: 'var(--font-source-sans), sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.35em',
          }}
        >
          — Perfect for any occasion
        </p>
        <h2
          className="text-white uppercase leading-none mb-5"
          style={{
            fontFamily: 'var(--font-oswald), sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 3.5vw, 52px)',
            letterSpacing: '0.06em',
          }}
        >
          Give the<br />Perfect Gift
        </h2>
        <div className="w-10 h-px bg-white/20 mb-5" />
        <p
          className="text-zinc-400 leading-relaxed max-w-xs mb-8"
          style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontSize: '14px' }}
        >
          Can&apos;t decide? Let them choose their own unforgettable experience. Our gift vouchers are available for any amount and never expire.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="#gift"
            className="inline-flex items-center gap-2 group self-start"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'white',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              paddingBottom: '2px',
            }}
          >
            Get a Voucher
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#gift"
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
            style={{
              fontFamily: 'var(--font-source-sans), sans-serif',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Gift one to a friend
          </a>
        </div>
      </div>

      {/* ── Right: Background image with gift card overlay ── */}
      <div className="relative flex items-center justify-center py-20 px-10 overflow-hidden min-h-[360px]">
        <Image
          src="/gift-card-bg.jpg"
          alt="Gift card"
          fill
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Gift card mockup */}
        <div
          className="relative z-10 w-full max-w-[320px] aspect-[1.586/1] shadow-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#1a1a1a 0%,#2a2a2a 50%,#111 100%)' }}
        >
          <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%)' }} />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 border border-white/40 flex items-center justify-center">
                <span
                  className="text-white/70"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.05em' }}
                >
                  T&amp;N
                </span>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Tooth &amp; Nail</p>
                <p style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '7px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Gift Voucher</p>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>Value</p>
              <p style={{ fontFamily: 'var(--font-oswald), sans-serif', fontWeight: 700, fontSize: '32px', color: 'white', lineHeight: 1, letterSpacing: '0.04em' }}>$150</p>
              <p style={{ fontFamily: 'var(--font-source-sans), sans-serif', fontWeight: 400, fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: '8px' }}>Valid for any service · Never expires</p>
            </div>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-8 border border-white/[0.06] rounded-sm" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))' }} />
        </div>
      </div>
    </section>
  );
}
