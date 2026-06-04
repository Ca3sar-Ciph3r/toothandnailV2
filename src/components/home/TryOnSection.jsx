import Link from 'next/link';

export default function TryOnSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{ background: 'linear-gradient(135deg,#050505 0%,#0f0f0f 50%,#080808 100%)' }}
    >
      {/* Decorative large text background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(120px,22vw,280px)] font-black tracking-tighter text-white/[0.025] leading-none"
          style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
        >
          PLACED
        </span>
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Content ── */}
          <div>
            {/* Cursor icon */}
            <div className="mb-8">
              <svg className="w-8 h-8 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 4l7.07 17 2.51-7.39L21 11.07z"/>
              </svg>
            </div>

            <p className="text-[9px] font-mono text-red-500/70 tracking-[0.35em] uppercase mb-4">
              — Interactive Experience
            </p>
            <h2
              className="text-[clamp(36px,5vw,64px)] font-black text-white leading-[0.92] tracking-[-0.03em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              Try Before<br />You Ink
            </h2>
            <p className="text-[14px] text-zinc-400 leading-relaxed max-w-sm mb-10">
              Visualise your design on our interactive 3D body model. Explore 18 placement zones, see pain ratings, and book your spot — all before you sit in the chair.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tattoo-editor"
                className="inline-flex items-center justify-center gap-3 bg-white text-black text-[11px] font-bold tracking-[0.22em] uppercase px-8 py-4 hover:bg-zinc-200 transition-colors duration-200"
              >
                Open Placement Editor →
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 text-[11px] font-medium text-zinc-500 tracking-[0.15em] uppercase border border-zinc-800 px-6 py-4 hover:border-zinc-600 hover:text-zinc-300 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* ── Right: Visual ── */}
          <div className="flex items-center justify-center">
            <div
              className="relative w-full max-w-[400px] aspect-square border border-white/[0.06] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#0d0d0d 0%,#181818 100%)' }}
            >
              {/* Decorative circles */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-white/[0.04]"
                  style={{
                    width: `${i * 33}%`,
                    height: `${i * 33}%`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                />
              ))}

              {/* Center body icon */}
              <div className="relative z-10 text-center">
                <svg className="w-16 h-16 text-white/10 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <circle cx="12" cy="4" r="2"/>
                  <path d="M10 8h4l1 6h-2l-1 6h-2l-1-6H7z"/>
                  <path d="M7 14l-3 4M17 14l3 4"/>
                </svg>
                <p className="text-[9px] font-mono text-zinc-700 tracking-[0.3em] uppercase">
                  3D Placement Editor
                </p>
              </div>

              {/* Hotspot dots */}
              {[
                { top: '20%', left: '40%' },
                { top: '38%', left: '28%' },
                { top: '38%', left: '64%' },
                { top: '55%', left: '36%' },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full bg-red-600/70 border border-red-400/40"
                  style={pos}
                >
                  <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
