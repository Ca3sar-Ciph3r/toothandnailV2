export default function StatsSection() {
  return (
    <section
      className="w-full py-20 md:py-24"
      style={{ background: '#f0ebe0' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* ── Left: Quote ── */}
          <div className="max-w-lg">
            <div className="flex items-start gap-4 mb-2">
              {/* Decorative feather / quill SVG */}
              <svg className="w-8 h-8 text-[#8a7a6a] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L3 14.67V21h6.33l10.06-10.06a5.5 5.5 0 0 0 0-7.78z"/>
                <path d="m16 5 3 3M3 15l9-9"/>
              </svg>
              <p
                className="text-[clamp(18px,2.2vw,26px)] font-black text-[#1a1a1a] leading-[1.25] tracking-[-0.01em]"
                style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
              >
                We&apos;re committed to constantly improving our craft and delivering exceptional work every single time.
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="hidden md:block w-px self-stretch bg-[#1a1a1a]/10" />

          {/* ── Right: Stats ── */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-16 text-center md:text-left">
            {[
              { value: '2,500+', label: 'Hours of Tattoos', sub: 'and counting' },
              { value: '12+',    label: 'Years Experience', sub: 'combined' },
              { value: '98%',    label: 'Client Satisfaction', sub: 'rated by clients' },
            ].map(({ value, label, sub }) => (
              <div key={label}>
                <p
                  className="text-[40px] md:text-[52px] font-black text-[#1a1a1a] leading-none tracking-tight"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
                >
                  {value}
                </p>
                <p className="text-[11px] font-bold text-[#1a1a1a]/70 tracking-[0.2em] uppercase mt-2">
                  {label}
                </p>
                <p className="text-[10px] text-[#8a7a6a] tracking-[0.1em] uppercase mt-0.5">
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
